import { INPUT } from '@config/input.ts';
import { type OutputId } from '@config/output.ts';
import { persistentAtom } from '@nanostores/persistent';
import { atom, map } from 'nanostores';
import type { LintChunkMap, RangeIndices } from '@type/linting.ts';
import type { Lint } from 'harper.js';
import { $option } from './options.ts';

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

/**
 * State for the active lint popover.
 *
 * Holds the relative position of the position on the screen and associated lint item, or `null`
 * when no popover is visible.
 */
export const $lintPopover = atom<{ x: number; y: number; lint: Lint | null }>({
	x: 50,
	y: 50,
	lint: null,
});
