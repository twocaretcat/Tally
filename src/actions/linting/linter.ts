import { getLocale } from '@i18n/index.ts';
import {
	$input,
	$lintChunkMap,
	$option,
	$persistedLintingRegion,
	type $lintingRegion,
} from '@stores/index.ts';
import { logElapsedTime } from '@utils/index.ts';
import { createJobRunner } from '@utils/job-runner.ts';
import { Dialect, WorkerLinter, binary } from 'harper.js';
import type { LintChunkMap, RangeIndices } from '../../types.ts';
import {
	LINTING,
	type LintingLanguageId,
	type LintingRegionId,
} from '@config/linting.ts';
import {
	computeChunkStartIndices,
	doesLocaleSupportLinting,
	getBestMatchingLintingRegion,
} from './utils.ts';
import { doContinueAnalyzing } from '@actions/analyzer.ts';

/**
 * Keys identifying the different lint chunk groups.
 */
type LintChunkKey = keyof LintChunkMap;

/**
 * Determines whether linting should be performed.
 *
 * Linting is enabled only when the current locale supports it and
 * grammar checking is turned on.
 *
 * @returns `true` if linting should run; otherwise `false`.
 */
const doLint = () => localeSupportsLinting && $option.enableLinting.get();

/**
 * Resolves and applies the linting dialect for a locale and region.
 *
 * Automatically selects the best matching region when `auto` is specified.
 *
 * @param localeId - Linting language ID.
 * @param regionId - Selected linting region or `auto`.
 */
async function setDialect<T extends LintingLanguageId>(
	localeId: T,
	regionId: LintingRegionId<T>,
) {
	const resolvedRegionId =
		regionId === 'auto' ? getBestMatchingLintingRegion(localeId) : regionId;

	const lintingLocaleConfig = LINTING.locale.map[localeId];
	const dialect =
		lintingLocaleConfig.map[
			resolvedRegionId as keyof typeof lintingLocaleConfig.map
		];

	return linter.setDialect(dialect);
}

/**
 * Updates the active linting region.
 *
 * Applies the corresponding dialect, re-lints the current input,
 * and persists the selected region for the current locale.
 *
 * @param regionId - Newly selected linting region.
 */
export async function updateLintingRegion(
	regionId: (typeof $lintingRegion)['value'],
) {
	if (!regionId || !localeSupportsLinting) return;

	await setDialect(currentLocaleId, regionId);

	const { text, visibleRangeIndices } = $input.get();

	lintText(text, visibleRangeIndices);

	$persistedLintingRegion[currentLocaleId].set(regionId);
}

/**
 * Clears all lint chunks from the current lint state.
 */
function clearLintChunks() {
	$lintChunkMap.setKey('visible', undefined);
	$lintChunkMap.setKey('trailing', undefined);
	$lintChunkMap.setKey('leading', undefined);
}

/**
 * Clears existing lint chunks when disabled, and triggers linting
 * for the current input when enabled.
 *
 * @param enableLinting - Whether grammar checking is enabled.
 */
export function toggleLinting(enableLinting: boolean) {
	if (!enableLinting) {
		clearLintChunks();

		return;
	}

	const { text, visibleRangeIndices } = $input.get();

	lintText(text, visibleRangeIndices);
}

/**
 * Enqueues linting jobs for text chunks.
 *
 * Splits the text into leading, visible, and trailing chunks,
 * prioritizes the visible chunk, and schedules linting work.
 *
 * @param text - Full input text to lint.
 * @param visibleRangeIndices - Indices of the visible text range.
 * @param skipLargeInputWarning - Whether to skip the large input warning.
 */
export function lintText(
	text: string,
	visibleRangeIndices: RangeIndices,
	skipLargeInputWarning: boolean = false,
) {
	if (!skipLargeInputWarning && !doContinueAnalyzing(text.length)) {
		return;
	}

	if (!doLint()) {
		clearLintChunks();

		return;
	}

	const chunkStartIndices = computeChunkStartIndices(
		[...visibleRangeIndices, text.length],
		MIN_CHARS_PER_CHUNK,
	);
	const jobsArgs = chunkStartIndices.map(
		(start, i) =>
			({
				key: CHUNK_KEYS[i]!,
				start,
				subStr: text.slice(start, chunkStartIndices[i + 1]),
			}) as const,
	);

	// Shift items one position to the left so that the chunks are in the following order: visible, trailing, then leading
	jobsArgs.push(jobsArgs.shift()!);
	jobsArgs.forEach(({ key, subStr, start }) => {
		if (start === undefined) return;

		lintJobRunner.addJob(key, [key, start, subStr]);
	});
}

/**
 * Minimum number of characters required for a chunk
 * before it is kept separate from the visible chunk.
 */
const MIN_CHARS_PER_CHUNK = 1000 as const;
const CHUNK_KEYS: readonly [LintChunkKey, LintChunkKey, LintChunkKey] = [
	'leading',
	'visible',
	'trailing',
];

const currentLocaleId = getLocale();
const localeSupportsLinting = doesLocaleSupportLinting(currentLocaleId);
const linter = new WorkerLinter({ binary, dialect: Dialect.American });
const lintJobRunner = createJobRunner(
	async (key: keyof LintChunkMap, start: number, text: string) => {
		const startTs = performance.now();

		// If grammar checking was disabled while this job was queued, discard the results
		if (!doLint()) return;

		$lintChunkMap.setKey(key, {
			start,
			lints: await linter.lint(text),
		});

		logElapsedTime(`Linted ${key} text chunk`, startTs);
	},
);
