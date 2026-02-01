import { getLocale } from '@i18n/index.ts';
import { $input, $lintChunkMap } from '@stores/state.ts';
import {
	$lintingRegion,
	$option,
	$persistedLintingRegion,
} from '@stores/options.ts';
import { createJobRunner } from '@utils/job-runner.ts';
import { Dialect, WorkerLinter, binary } from 'harper.js';
import type { LintChunkMap, RangeIndices } from '@type/linting.ts';
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
import { doContinueAnalyzingAfterPrompt, logElapsedTime } from '../utils.ts';

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
 * Resolve and return the corresponding linting dialect for a given locale and region.
 *
 * @param localeId - Linting language ID.
 * @param regionId - Selected linting region or `auto`.
 */
function resolveDialect<T extends LintingLanguageId>(
	localeId: T,
	regionId: LintingRegionId<T>,
): Dialect {
	const resolvedRegionId =
		regionId === 'auto' ? getBestMatchingLintingRegion(localeId) : regionId;
	const lintingLocaleConfig = LINTING.locale.map[localeId];

	return lintingLocaleConfig.map[
		resolvedRegionId as keyof typeof lintingLocaleConfig.map
	];
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

	await linter.setDialect(resolveDialect(currentLocaleId, regionId));

	const { text, visibleRangeIndices } = $input.get();

	lintText(text, visibleRangeIndices);

	$persistedLintingRegion[currentLocaleId].set(regionId);
}

/**
 * Clears all lint chunks from the current lint state.
 */
export function clearLintChunks() {
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
	if (
		!doLint() ||
		(!skipLargeInputWarning && !doContinueAnalyzingAfterPrompt(text.length))
	) {
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
const currentLintingRegionId = $lintingRegion.get();
const localeSupportsLinting = doesLocaleSupportLinting(currentLocaleId);
const dialect =
	localeSupportsLinting && currentLintingRegionId
		? resolveDialect(currentLocaleId, currentLintingRegionId)
		: Dialect.American;
const linter = new WorkerLinter({
	binary,
	dialect,
});
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
