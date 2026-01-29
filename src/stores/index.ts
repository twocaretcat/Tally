import { INPUT } from '@config/input.ts';
import { OPTION } from '@config/option.ts';
import { type OutputId } from '@config/output.ts';
import { THEME, type ThemeId } from '@config/theme.ts';
import { persistentAtom } from '@nanostores/persistent';
import { atom, map } from 'nanostores';
import { mapEntries } from 'radashi';
import type { LintChunkMap, RangeIndices } from '../types.ts';
import { persistentBooleanAtom } from './utils.ts';
import {
	LINTING,
	type LintingLanguageId,
	type LintingRegionId,
} from '@config/linting.ts';
import { buildId } from '@utils/index.ts';
import { getLocale } from '@i18n/index.ts';
import { doesLocaleSupportLinting } from '@actions/linting/utils.ts';

const currentLocaleId = getLocale();
const localeSupportsLinting = doesLocaleSupportLinting(currentLocaleId);

/**
 * Resolves the default linting region for the current locale.
 *
 * Prefers a persisted user selection and falls back to the
 * locale’s configured default. Returns `undefined` when
 * linting is not supported.
 *
 * @returns The default linting region, or `undefined`.
 */
function getDefaultLintingRegion() {
	if (!localeSupportsLinting) return;

	return (
		$persistedLintingRegion[currentLocaleId].get() ??
		LINTING.locale.map[currentLocaleId].defaultValue
	);
}

/**
 * Map of option IDs to persistent boolean atoms.
 */
export const $option = mapEntries(OPTION.map, (id, { defaultValue }) => [
	id,
	persistentBooleanAtom(id, defaultValue),
]);

/**
 * Map of locale IDs to persisted linting region selections.
 *
 * Each locale stores its selected region in localStorage with
 * a locale-specific key.
 */
export const $persistedLintingRegion = mapEntries(
	LINTING.locale.map,
	(langId, regionMap) => [
		langId,
		persistentAtom<LintingRegionId<typeof langId>>(
			buildId(LINTING.id, LINTING.locale.id, langId),
			regionMap.defaultValue,
		),
	],
);

/**
 * Currently active linting region (dialect).
 *
 * Derived from the selected locale and persisted region,
 * or `undefined` when not yet resolved.
 */
export const $lintingRegion = atom<
	LintingRegionId<LintingLanguageId> | undefined
>(getDefaultLintingRegion());

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
