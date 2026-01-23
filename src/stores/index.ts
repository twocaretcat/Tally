import { INPUT } from '@config/input.ts';
import { OPTION } from '@config/option.ts';
import { type OutputId } from '@config/output.ts';
import { THEME, type ThemeId } from '@config/theme.ts';
import { persistentAtom } from '@nanostores/persistent';
import { atom, map } from 'nanostores';
import { mapEntries } from 'radashi';
import type { LintChunkMap, RangeIndices } from '../types.ts';
import { persistentBooleanAtom } from './utils.ts';

/**
 * Map of option IDs to persistent boolean atoms.
 */
export const $option = mapEntries(OPTION.map, (id, { defaultValue }) => [
	id,
	persistentBooleanAtom(id, defaultValue),
]);

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
 * The input text saved to localStorage.
 *
 * Only used when `rememberInputText` is true.
 */
export const $persistedInputText = persistentAtom<string>(
	INPUT.id,
	INPUT.defaultValue,
);

/**
 * The current text input and its visible range.
 *
 * Initialized from `persistedInputText` if `rememberInputText` is enabled,
 * otherwise uses the default empty value.
 */
export const $input = atom<{
	text: string;
	visibleRangeIndices: RangeIndices;
}>(
	(() => {
		const text = $option.rememberInputText.get()
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
