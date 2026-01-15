import { INPUT } from '@config/input.ts';
import {
	$inputText,
	$warnOnLargeInputText,
	$outputCounts,
} from '@stores/index.ts';
import { getLocale, getLocaleMessages } from '@i18n/index.ts';
import { Tally } from '@twocaretcat/tally-ts';

const currentLocaleId = getLocale();
const msg = getLocaleMessages(currentLocaleId).input.largeInputWarning.message;
const tally = new Tally(currentLocaleId);

/**
 * Updates the output counts based on the current input text.
 *
 * Warns the user and requests confirmation if the input exceeds the maximum
 * character limit (when warnings are enabled). Clears the output if the user
 * cancels the confirmation.
 *
 * @returns A promise that resolves when the counts have been updated
 */
export async function updateCounts() {
	const text = $inputText.get();

	// Warn the user if the input text is large
	if ($warnOnLargeInputText.get() && text.length > INPUT.maxCharacters) {
		if (!confirm(msg)) {
			$outputCounts.set(null);

			return;
		}
	}

	const startTime = performance.now();
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

	console.debug(
		`Processed text in ${(performance.now() - startTime).toFixed(0)}ms`,
	);

	$outputCounts.set(counts);
}
