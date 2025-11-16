/**
 * A two-letter uppercase region code (e.g., 'US', 'ES', 'MX').
 */
export type RegionId = `${Uppercase<string>}${Uppercase<string>}`;

/**
 * Configuration for a single locale.
 *
 * @property regionId - An optional region ID for the locale
 * @property wip - Whether the locale is still a work in progress
 */
export type Locale = {
	regionId?: RegionId;
	wip: boolean;
};

/**
 * A record mapping locale IDs to their display names.
 */
type LocaleMap = Record<string, Locale>;

/**
 * The complete locale configuration structure.
 *
 * @property id - The configuration identifier
 * @property default - The default locale ID
 * @property map - Map of all available locales
 */
type LocaleConfig = {
	id: 'locale';
	default: LocaleId;
	map: LocaleMap;
};

const localeMap = {
	en: {
		wip: false,
	},
	es: {
		wip: true,
	},
	fr: {
		wip: true,
	},
	it: {
		wip: true,
	},
	de: {
		wip: true,
	},
	id: {
		wip: true,
	},
	ru: {
		wip: false,
	},
	zh: {
		regionId: 'CN',
		wip: true,
	},
	ar: {
		wip: true,
	},
} as const satisfies LocaleMap;

/**
 * Global locale configuration for the application.
 */
export const LOCALE = {
	id: 'locale',
	default: 'en',
	map: localeMap,
} as const satisfies LocaleConfig;

/**
 * Union type of all valid locale IDs.
 */
export type LocaleId = keyof typeof localeMap;
