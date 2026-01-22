import { atom, map } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import { THEME, type ThemeId } from '@config/theme.ts';
import { OPTION } from '@config/option.ts';
import { INPUT } from '@config/input.ts';
import { persistentBooleanAtom } from './utils.ts';
import { type OutputId } from '@config/output.ts';
import type { LintChunkMap, RangeIndices } from '../types.ts';

/**
 * The currently selected theme ID.
 *
 * Persisted to localStorage.
 */
export const $persistedTheme = persistentAtom<ThemeId>(
	THEME.id,
	THEME.defaultValue.id,
);

/**
 * The currently selected theme ID.
 */
export const $theme = atom<ThemeId>(
	$persistedTheme.get() ?? THEME.defaultValue.id,
);

/**
 * Whether to remember input text between browser sessions.
 *
 * Persisted to localStorage.
 */
export const $rememberInputText = persistentBooleanAtom(
	'rememberInputText',
	OPTION.map.rememberInputText.defaultValue,
);

/**
 * Whether to warn the user when input text exceeds the maximum character limit.
 *
 * Persisted to localStorage.
 */
export const $warnOnLargeInputText = persistentBooleanAtom(
	'warnOnLargeInputText',
	OPTION.map.warnOnLargeInputText.defaultValue,
);

/**
 * Whether to enable debug logging for store state changes.
 *
 * Persisted to localStorage.
 */
export const $enableDebugLogging = persistentBooleanAtom(
	'enableDebugLogging',
	OPTION.map.enableDebugLogging.defaultValue,
);

/**
 * The input text saved to localStorage.
 *
 * Only used when `$rememberInputText` is true.
 */
export const $persistedInputText = persistentAtom<string>(
	INPUT.id,
	INPUT.defaultValue,
);

/**
 * The current text input and its visible range.
 *
 * Initialized from `$persistedInputText` if `$rememberInputText` is enabled,
 * otherwise uses the default empty value.
 */
export const $input = atom<{
	text: string;
	visibleRangeIndices: RangeIndices;
}>(
	(() => {
		const text = $rememberInputText.get()
			? $persistedInputText.get()
			: INPUT.defaultValue;

		return {
			text,
			visibleRangeIndices: [0, text.length],
		};
	})(),
);

/**
 * The computed word and character counts for the current input.
 *
 * Null when no counts have been computed or when computation is cancelled.
 */
export const $outputCounts = atom<{ [key in OutputId]: number } | null>(null);

/**
 * Computed lint chunks for the current input.
 */
export const $lintChunkMap = map<LintChunkMap>({
	visible: {
		start: 0,
		lints: [],
	},
	trailing: undefined,
	leading: undefined,
});
