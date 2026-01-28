import { Dialect } from 'harper.js';
import type { LocaleId, RegionId } from './locale.ts';

/**
 * A record mapping linting regions to their configuration objects.
 */
type RegionMap = {
	[region in RegionId | 'auto']?: Dialect;
};

/**
 * A record mapping linting locales to their configuration objects.
 */
type LocaleMap = {
	[locale in LocaleId]?: {
		defaultValue: keyof RegionMap;
		map: RegionMap;
	};
};

/**
 * Linting configuration definition.
 *
 * @typeParam M - Locale-to-region mapping.
 */
type LintingConfig<M extends LocaleMap> = {
	id: string;
	locale: {
		id: string;
		map: M;
	};
};

const localeMap = {
	en: {
		defaultValue: 'auto',
		map: {
			auto: Dialect.American,
			US: Dialect.American,
			GB: Dialect.British,
			AU: Dialect.Australian,
			CA: Dialect.Canadian,
			IN: Dialect.Indian,
		},
	},
} as const satisfies LocaleMap;

/**
 * Global linting configuration.
 *
 * Defines the persistence key and supported locales and regions.
 */
export const LINTING = {
	id: 'linting',
	locale: {
		id: 'locale',
		map: localeMap,
	},
} as const satisfies LintingConfig<typeof localeMap>;

/**
 * Supported linting language IDs.
 */
export type LintingLanguageId = keyof typeof localeMap;

/**
 * Supported linting region IDs for a given language.
 */
export type LintingRegionId<T extends LintingLanguageId> =
	keyof (typeof localeMap)[T]['map'];
