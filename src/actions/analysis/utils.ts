import { INPUT } from '@config/input.ts';
import { getLocale, getLocaleMessages } from '@i18n/index.ts';
import { $option } from '@stores/options.ts';

const msg = getLocaleMessages(getLocale()).input.largeInputWarning.message;

/**
 * Logs the elapsed time since a given start timestamp using `console.debug`.
 *
 * @param label - Descriptive label included in the log output.
 * @param startTs - Start timestamp in milliseconds, typically from `performance.now()`.
 */
export function logElapsedTime(label: string, startTs: number) {
	console.debug(`${label} in ${(performance.now() - startTs).toFixed(0)}ms`);
}

/**
 * Prompts the user when the warning option is enabled and input text length is above a certain threshold to determine whether text analysis should proceed.
 *
 * @param textLength - The length of the input text
 * @returns `true` if analysis should continue; otherwise `false`.
 */
export function doContinueAnalyzingAfterPrompt(textLength: number) {
	return (
		!$option.warnOnLargeInputText.get() ||
		textLength < INPUT.maxCharacters ||
		confirm(msg)
	);
}
