import { getLocale } from '@i18n/index.ts';
import { $outputCounts } from '@stores/state.ts';
import { Tally } from '@twocaretcat/tally-ts';
import { doContinueAnalyzingAfterPrompt, logElapsedTime } from './utils.ts';

const tally = new Tally({ locales: getLocale() });

/**
 * Clears the output counts store.
 */
export function clearCounts() {
	$outputCounts.set(null);
}

/**
 * Computes counts (character, word, etc.) for the given text and updates the output store.
 *
 * @param text - The text to analyze
 * @param skipLargeInputWarning - Whether to skip the large input warning
 */
export function countText(
	text: string,
	skipLargeInputWarning: boolean = false,
) {
	if (!skipLargeInputWarning && !doContinueAnalyzingAfterPrompt(text.length)) {
		clearCounts();

		return;
	}

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

	$outputCounts.set(counts);
}
