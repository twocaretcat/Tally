import type { AstroGlobal } from 'astro';
import { LOCALE, type LocaleId, type RegionId } from '@config/locale.ts';
import { keysOf } from '@utils/index.ts';
import type { LocaleMessages } from './types.ts';
import { assert, identity, objectify } from 'radashi';

const localeIds = keysOf(LOCALE.map);

const modules = import.meta.glob<LocaleMessages>('./locales/*.ts', {
	eager: true,
	import: 'default',
});

const localeMessageMap = objectify(
	localeIds,
	identity<LocaleId>,
	loadModuleById,
);

/**
 * Loads a locale translation module by its ID.
 *
 * @param localeId - The locale ID to load
 * @returns The loaded locale translation module
 * @throws {Error} If the locale file doesn't exist
 */
function loadModuleById(localeId: LocaleId) {
	const fileName = `./locales/${localeId}.ts`;
	const module = modules[fileName];

	if (!module) {
		throw new Error(`Missing locale file: ${fileName}`);
	}

	return module;
}

/**
 * Validates and narrows a locale identifier.
 *
 * @param localeId - Locale ID to validate.
 * @returns The validated locale ID.
 * @throws {Error} If the locale is missing or not supported.
 */
function validateLocale(localeId: string | undefined): LocaleId {
	if (!localeId || !(localeId in LOCALE.map)) {
		throw new Error(
			`Expected locale to be one of ${localeIds}, but got '${localeId}'`,
		);
	}

	return localeId as LocaleId;
}

/**
 * Gets the current locale ID from the Astro context or the document.
 *
 * @param astro - Optional Astro global context (server-side).
 * @returns The current locale ID.
 * @throws {Error} If the locale cannot be determined or is unsupported.
 */
export function getLocale(astro?: AstroGlobal) {
	if (astro) return validateLocale(astro.currentLocale);

	if (typeof document === 'undefined') {
		throw new Error(
			'Unable to determine locale. Either pass an Astro object or call this function on the client to get it from the document',
		);
	}

	return validateLocale(document.documentElement.lang);
}

/**
 * Retrieves translation messages for a locale.
 *
 * Falls back to the default locale if no messages are defined.
 *
 * @param localeId - Locale ID to retrieve messages for.
 * @returns The locale messages object.
 */
export function getLocaleMessages(localeId: LocaleId): LocaleMessages {
	return localeMessageMap[localeId] ?? localeMessageMap[LOCALE.defaultValue];
}

/**
 * Infers the region code for a locale.
 *
 * @param locale - The Intl.Locale object to infer from
 * @returns The inferred two-letter region code
 * @throws {Error} If the region cannot be inferred
 */
function inferRegion(locale: Intl.Locale) {
	const region = locale.maximize().region;

	assert(region, `region for '${locale.language}' does not exist`);

	return region as RegionId;
}

/**
 * Gets the localized display name for a language code.
 *
 * @param localeId - The locale to use for the language name
 * @returns The localized language name
 */
function getLanguageName(localeId: LocaleId) {
	const languageDisplay = new Intl.DisplayNames([localeId], {
		type: 'language',
	});
	const languageName = languageDisplay.of(localeId);

	assert(languageName, `language name for '${localeId}' does not exist`);

	return languageName;
}

/**
 * Gets the localized display name for a region code.
 *
 * @param localeId - The locale to use for the region name
 * @param regionId - The region code to get the name for
 * @returns The localized region name, or undefined if regionId is undefined
 */
function getRegionName(localeId: LocaleId, regionId: RegionId | undefined) {
	if (!regionId) {
		return undefined;
	}

	const regionDisplay = new Intl.DisplayNames([localeId], {
		type: 'region',
	});

	return regionDisplay.of(regionId);
}

/**
 * Converts a region code to its corresponding flag emoji.
 *
 * @param region - The two-letter region code (e.g., 'US', 'ES')
 * @returns The flag emoji for the region, or undefined if no region provided
 */
function getFlagForRegion(region: RegionId | undefined) {
	if (!region) {
		return undefined;
	}

	return [...region]
		.map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
		.join('');
}

/**
 * Extracts display information for a locale including flag, language, and region names.
 *
 * If a region is explicitly provided, includes the region name in the output.
 * If no region is provided, infers the region for flag purposes only.
 *
 * @param localeId - The 2-letter language code (e.g., 'en', 'fr')
 * @param regionId - Optional 2-letter region code (e.g., 'US', 'CA')
 * @returns An object containing the flag emoji, language name, and optional region name
 */
export function getLocaleInfo(localeId: LocaleId, regionId?: RegionId) {
	const locale = new Intl.Locale(localeId);
	const languageName = getLanguageName(localeId);
	const regionName = getRegionName(localeId, regionId);

	// Compute flag using determined region
	const flag = getFlagForRegion(regionId ?? inferRegion(locale));

	return {
		flag,
		languageName,
		regionName,
	};
}

/**
 * Determines the best matching locale based on the user's browser language preferences.
 *
 * Iterates through the user's language preferences and returns the first supported
 * locale. Falls back to the default locale if no match is found.
 *
 * @returns The best matching locale ID, or the default locale
 */
export function getBestMatchingLocale() {
	const userLocaleIds = navigator.languages || [navigator.language];

	// Check each user language preference
	for (const localeId of userLocaleIds) {
		const preferredLangCode = new Intl.Locale(localeId).minimize().language;
		// See if we have a match for just the language code
		if (LOCALE.map[preferredLangCode as LocaleId]) {
			return preferredLangCode as LocaleId;
		}
	}

	return LOCALE.defaultValue;
}
