import type { Config } from '@twocaretcat/astro-snapshot';
import { mapEntries, objectify } from 'radashi';
import { LOCALE } from './config/locale.ts';
import { SCREENSHOT } from './config/screenshot.ts';
import { SITE } from './config/site.ts';
import { SOCIAL_PREVIEW } from './config/social-preview.ts';
import { buildPagePath, keysOf } from './utils/index.ts';

/**
 * Configuration for the Astro Snapshot integration.
 *
 * Defines which pages to screenshot and their output settings for social media previews.
 */
export const ASTRO_SNAPSHOT_CONFIG: Config = {
	pages: {
		...mapEntries(LOCALE.map, (localeId) => [
			`/${localeId}/${SOCIAL_PREVIEW.id}` as const,
			keysOf(SOCIAL_PREVIEW.map).map((socialPreviewId) => {
				const { width, height } = SOCIAL_PREVIEW.map[socialPreviewId];

				return {
					outputPath:
						`${SITE.srcDir}/images/${SOCIAL_PREVIEW.id}/${localeId}/${socialPreviewId}.png` as const,
					width,
					height,
				};
			}),
		]),
		...objectify(
			SCREENSHOT.list,
			({ theme, input }) => buildPagePath(SITE.basePath, theme, input),
			({ theme }) => [
				{
					outputPath: `${SCREENSHOT.outDir}${theme}.png` as const,
					width: SCREENSHOT.width,
					height: SCREENSHOT.height,
				},
			],
		),
	},
} as const;

const localIds = keysOf(LOCALE.map);
const sharedI18nConfig = {
	defaultLocale: LOCALE.default,
	locales: Object.fromEntries(localIds.map((id) => [id, id])),
} as const;

/**
 * Internationalization configuration for Astro and sitemap generation.
 *
 * Configures routing to prefix all locales (including default) and disables
 * automatic redirects to the default locale.
 */
export const I18N_CONFIG = {
	astro: {
		...sharedI18nConfig,
		locales: localIds,
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	sitemap: sharedI18nConfig,
} as const;
