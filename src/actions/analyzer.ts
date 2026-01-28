import { INPUT } from '@config/input.ts';
import { getLocale, getLocaleMessages } from '@i18n/index.ts';
import { $option, $outputCounts } from '@stores/index.ts';
import type { RangeIndices } from '../types.ts';
import { lintText } from './linting/linter.ts';
import { countText } from './counter.ts';

const currentLocaleId = getLocale();
const msg = getLocaleMessages(currentLocaleId).input.largeInputWarning.message;

/**
 * Prompts the user when the warning option is enabled and input text length is above a certain threshold to determine whether text analysis should proceed.
 *
 * @param textLength - The length of the input text
 * @returns `true` if analysis should continue; otherwise `false`.
 */
export function doContinueAnalyzing(textLength: number) {
	if (
		!$option.warnOnLargeInputText.get() ||
		textLength < INPUT.maxCharacters ||
		confirm(msg)
	)
		return true;

	$outputCounts.set(null);

	return false;
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
	if (!doContinueAnalyzing(text.length)) return;

	countText(text, true);
	lintText(text, visibleRangeIndices, true);
}
