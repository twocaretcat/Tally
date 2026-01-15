import { INPUT } from '@config/input.ts';
import {
	$warnOnLargeInputText,
	$outputCounts,
	$outputLints,
} from '@stores/index.ts';
import { getLocale, getLocaleMessages } from '@i18n/index.ts';
import { Tally } from '@twocaretcat/tally-ts';
import { WorkerLinter, binaryInlined } from 'harper.js';
import { logElapsedTime } from '@utils/index.ts';

const currentLocaleId = getLocale();
const msg = getLocaleMessages(currentLocaleId).input.largeInputWarning.message;
const tally = new Tally({ locales: currentLocaleId });
const linter = new WorkerLinter({ binary: binaryInlined });

/**
 * Computes counts (character, word, etc.) for the given text and updates the counts output state.
 *
 * @param text - The text to analyze
 */
function updateCounts(text: string) {
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

	$outputCounts.set(counts);

	logElapsedTime('Counted text', startTs);
}

/**
 * Runs the linter on the provided text and updates the lint output state.
 *
 * @param text - The text to lint
 * @returns A promise that resolves once linting and state updates are complete
 */
async function updateLints(text: string) {
	const startTs = performance.now();
	const lints = await linter.lint(text);

	$outputLints.set(lints);

	logElapsedTime('Linted text', startTs);
}

/**
 * Analyzes the given text (compute counts, lint, etc.) and updates outputs.
 *
 * If enabled, prompts the user before processing large inputs and aborts
 * the analysis if the user declines.
 *
 * @param text - The text to analyze
 * @returns A promise that resolves when the counts have been updated
 */
export async function analyzeText(text: string) {
	// Warn the user if the input text is large
	if ($warnOnLargeInputText.get() && text.length > INPUT.maxCharacters) {
		if (!confirm(msg)) {
			$outputCounts.set(null);

			return;
		}
	}

	const startTs = performance.now();

	updateCounts(text);

	await updateLints(text);

	logElapsedTime('Analyzed text', startTs);
}
