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
 */
export type Locale = {
	regionId?: RegionId;
	wip: boolean;
	rtl: boolean;
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
	},
	de: {
		wip: true,
		rtl: false,
	},
	en: {
		wip: false,
		rtl: false,
	},
	es: {
		wip: true,
		rtl: false,
	},
	fr: {
		wip: true,
		rtl: false,
	},
	id: {
		wip: true,
		rtl: false,
	},
	it: {
		wip: true,
		rtl: false,
	},
	ru: {
		wip: false,
		rtl: false,
	},
	zh: {
		regionId: 'CN',
		wip: true,
		rtl: false,
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
