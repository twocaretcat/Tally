import { INPUT } from '@config/input.ts';
import { $input, $persistedInputText } from '@stores/state.ts';
import {
	$lintingRegion,
	$option,
	$persistedTheme,
	$theme,
} from '@stores/options.ts';
import { analyzeText } from '@actions/analysis/analyzer';
import { toggleDebugLogging } from '@actions/logger';
import { THEME } from '@config/theme.ts';
import {
	toggleLinting,
	updateLintingRegion,
} from '@actions/analysis/linting/linter.ts';

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
 * Subscribes to grammar-checking option changes.
 *
 * Enables or disables linting behavior when the option is toggled.
 */
$option.enableLinting.subscribe(toggleLinting);

/**
 * Subscribes to debug-logging option changes.
 *
 * Toggles debug output whenever the option value changes.
 */
$option.enableDebugLogging.subscribe(toggleDebugLogging);

/**
 * Reacts to changes in the active linting region.
 *
 * Updates linting configuration to reflect the selected region.
 */
$lintingRegion.subscribe(updateLintingRegion);
