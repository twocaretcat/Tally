/**
 * Union type of all valid locale IDs.
 */
export type LocaleId =
	| 'ar'
	| 'de'
	| 'en'
	| 'es'
	| 'fr'
	| 'id'
	| 'it'
	| 'ru'
	| 'zh';

/**
 * A two-letter uppercase region code (e.g., 'US', 'ES', 'MX').
 */
export type RegionId = `${Uppercase<string>}${Uppercase<string>}`;

/**
 * Configuration for a single locale.
 *
 * @property regionId - An optional region ID for the locale
 * @property wip - Whether the locale is still a work in progress
 * @property rtl - Whether the locale is right-to-left
 * @property lintable - Whether Harper supports linting for this locale
 */
export type Locale = {
	regionId?: RegionId;
	wip: boolean;
	rtl: boolean;
	lintable: boolean;
};

/**
 * A record mapping locale IDs to their display names.
 */
type LocaleMap = {
	[key in LocaleId]: Locale;
};

/**
 * The complete locale configuration structure.
 *
 * @property id - The configuration identifier
 * @property defaultValue - The default locale ID
 * @property map - Map of all available locales
 */
type LocaleConfig = {
	id: 'locale';
	defaultValue: LocaleId;
	map: LocaleMap;
};

const localeMap: LocaleMap = {
	ar: {
		wip: true,
		rtl: true,
		lintable: false,
	},
	de: {
		wip: true,
		rtl: false,
		lintable: false,
	},
	en: {
		wip: false,
		rtl: false,
		lintable: true,
	},
	es: {
		wip: true,
		rtl: false,
		lintable: false,
	},
	fr: {
		wip: true,
		rtl: false,
		lintable: false,
	},
	id: {
		wip: true,
		rtl: false,
		lintable: false,
	},
	it: {
		wip: true,
		rtl: false,
		lintable: false,
	},
	ru: {
		wip: false,
		rtl: false,
		lintable: false,
	},
	zh: {
		regionId: 'CN',
		wip: true,
		rtl: false,
		lintable: false,
	},
};

/**
 * Global locale configuration for the application.
 */
export const LOCALE = {
	id: 'locale',
	defaultValue: 'en',
	map: localeMap,
} as const satisfies LocaleConfig;
