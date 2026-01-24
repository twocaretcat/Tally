import { INPUT } from '@config/input.ts';
import {
	$input,
	$option,
	$persistedInputText,
	$persistedTheme,
	$theme,
} from '@stores/index.ts';
import { analyzeText } from '@actions/analyzer.ts';
import { toggleDebugLogging } from '@actions/logger.ts';
import { THEME } from '@config/theme.ts';
import { clearLintChunks } from '@actions/analyzer.ts';

/**
 * Persists theme changes to localStorage, skipping sponsor-only themes.
 */
$theme.subscribe((themeId) => {
	const { sponsor } = THEME.map[themeId];

	if (sponsor) {
		console.debug(
			`Switched to sponsor-only theme: '${themeId}'. Skipped save to local storage`,
		);

		return;
	}

	$persistedTheme.set(themeId);
});

/**
 * Analyze input text and optionally persists the value whenever it changes.
 *
 * If `rememberInputText` is enabled, saves the current input to `$persistedInputText`.
 */
$input.subscribe(async ({ text, visibleRangeIndices }) => {
	analyzeText(text, visibleRangeIndices);

	if (!$option.rememberInputText.get()) return;

	$persistedInputText.set(text);
});

/**
 * Clears persisted input text when the remember option is disabled.
 *
 * Sets `persistedInputText` to either the current input (if remembering) or the default empty value.
 */
$option.rememberInputText.subscribe((rememberInputText) => {
	const text = rememberInputText ? $input.get().text : INPUT.defaultValue;

	$persistedInputText.set(text);
});

/**
 * Reacts to changes in the grammar-checking option.
 *
 * Clears existing lint chunks when disabled, and triggers text analysis
 * for the current input when enabled.
 *
 * @param enableGrammarChecking - Whether grammar checking is enabled.
 */
$option.enableGrammarChecking.subscribe((enableGrammarChecking) => {
	if (!enableGrammarChecking) {
		clearLintChunks();

		return;
	}

	const { text, visibleRangeIndices } = $input.get();

	analyzeText(text, visibleRangeIndices);
});

/**
 * Toggles debug logging on or off whenever the option changes.
 */
$option.enableDebugLogging.subscribe(toggleDebugLogging);
