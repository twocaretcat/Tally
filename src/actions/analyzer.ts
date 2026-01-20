import { INPUT } from '@config/input.ts';
import { getLocale, getLocaleMessages } from '@i18n/index.ts';
import {
	$lintChunkMap,
	$outputCounts,
	$warnOnLargeInputText,
} from '@stores/index.ts';
import { Tally } from '@twocaretcat/tally-ts';
import { logElapsedTime } from '@utils/index.ts';
import { createJobRunner } from '@utils/job-runner.ts';
import { Dialect, WorkerLinter, binary } from 'harper.js';
import type {
	LintChunkMap,
	RangeIndices,
	WithOptionalItems,
} from '../types.ts';

/**
 * Keys identifying the different lint chunk groups.
 */
type LintChunkKey = keyof LintChunkMap;

/**
 * Start indices for up to three contiguous chunks: leading, center, and trailing.
 */
type ChunkIndices = [number, number, number];

const MIN_CHARS_PER_CHUNK = 1000 as const;
const CHUNK_KEYS: readonly [LintChunkKey, LintChunkKey, LintChunkKey] = [
	'leading',
	'visible',
	'trailing',
];

const currentLocaleId = getLocale();
const msg = getLocaleMessages(currentLocaleId).input.largeInputWarning.message;
const tally = new Tally({ locales: currentLocaleId });
const linter = new WorkerLinter({ binary, dialect: Dialect.American });
const lintJobRunner = createJobRunner(
	async (key: keyof LintChunkMap, start: number, text: string) => {
		const startTs = performance.now();

		$lintChunkMap.setKey(key, {
			start,
			lints: await linter.lint(text),
		});

		logElapsedTime(`Analyzed ${key} text chunk`, startTs);
	},
);

/**
 * Computes start indices for chunk boundaries, optionally merging
 * leading or trailing chunks into the center one when they are too small.
 *
 * @param endIndices - End indices of the leading, center, and trailing chunks.
 * @param minSize - Minimum allowed chunk size before merging (default: 1).
 * @returns Tuple of start indices, with `undefined` for empty (or merged) chunks.
 */
export function computeChunkStartIndices(
	endIndices: ChunkIndices,
	minSize: number = 1,
) {
	const startIndices: WithOptionalItems<ChunkIndices> = [
		0,
		endIndices[0],
		endIndices[1],
	];

	// First chunk is too small so we merge it with the center chunk
	if (endIndices[0] < minSize) {
		startIndices[0] = undefined;
		startIndices[1] = 0;
	}

	// Last chunk is too small so we merge it with the center chunk
	if (endIndices[2] - endIndices[1] < minSize) {
		startIndices[2] = undefined;
	}

	return startIndices;
}

/**
 * Computes counts (character, word, etc.) for the given text and returns the results
 *
 * @param text - The text to analyze
 * @returns An object containing various counts for the text
 */
function countText(text: string) {
	const startTs = performance.now();
	const { total, by, related } = tally.countGraphemes(text);
	const counts = {
		characters: total,
		words: tally.countWords(text).total,
		sentences: tally.countSentences(text).total,
		paragraphs: related.paragraphs.total,
		lines: related.lines.total,
		spaces: by.spaces.total,
		letters: by.letters.total,
		digits: by.digits.total,
		punctuation: by.punctuation.total,
		symbols: by.symbols.total,
	};

	logElapsedTime('Counted text', startTs);

	return counts;
}

/**
 * Analyzes the given text (compute counts, lint, etc.) and updates the state.
 *
 * If enabled, prompts the user before processing large inputs and aborts
 * the analysis if the user declines.
 *
 * @param text - The text to analyze
 * @param visibleRangeIndices - The indices of the visible range of text
 * @returns A promise that resolves when the counts have been updated
 */
export async function analyzeText(
	text: string,
	visibleRangeIndices: RangeIndices,
) {
	// Warn the user if the input text is large
	if ($warnOnLargeInputText.get() && text.length > INPUT.maxCharacters) {
		if (!confirm(msg)) {
			$outputCounts.set(null);

			return;
		}
	}

	$outputCounts.set(countText(text));

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
