import type { RangeIndices } from '@type/linting.ts';
import { clearLintChunks, lintText } from './linting/linter.ts';
import { clearCounts, countText } from './counter.ts';
import { doContinueAnalyzingAfterPrompt } from './utils.ts';

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
	if (!doContinueAnalyzingAfterPrompt(text.length)) {
		clearCounts();
		clearLintChunks();

		return;
	}

	countText(text, true);
	lintText(text, visibleRangeIndices, true);
}
