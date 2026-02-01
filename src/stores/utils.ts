import { doesLocaleSupportLinting } from '@actions/analysis/linting/utils.ts';
import type { OptionId } from '@config/option.ts';
import { getLocale } from '@i18n/index.ts';
import { persistentAtom } from '@nanostores/persistent';
import { LINTING } from '@config/linting.ts';
import { $persistedLintingRegion } from './options.ts';

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
export function getDefaultLintingRegion() {
	if (!localeSupportsLinting) return;

	return (
		$persistedLintingRegion[currentLocaleId].get() ??
		LINTING.locale.map[currentLocaleId].defaultValue
	);
}

/**
 * Creates a persistent boolean atom that syncs with localStorage.
 *
 * @param key - The localStorage key to use for persistence
 * @param defaultValue - The default boolean value if none exists in storage
 * @returns A persistent atom store containing a boolean value
 */
export function persistentBooleanAtom(key: OptionId, defaultValue: boolean) {
	return persistentAtom<boolean>(key, defaultValue, {
		encode: JSON.stringify,
		decode: JSON.parse,
	});
}
