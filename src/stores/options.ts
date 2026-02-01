import { OPTION } from '@config/option.ts';
import { THEME, type ThemeId } from '@config/theme.ts';
import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';
import { mapEntries } from 'radashi';
import { getDefaultLintingRegion, persistentBooleanAtom } from './utils.ts';
import {
	LINTING,
	type LintingLanguageId,
	type LintingRegionId,
} from '@config/linting.ts';
import { buildId } from '@utils/dom.ts';

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
