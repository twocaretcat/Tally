import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';
import betterImageService from 'astro-better-image-service';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, fontProviders } from 'astro/config';
import {
	ASTRO_SNAPSHOT_CONFIG,
	I18N_CONFIG,
} from './src/config-transformer.ts';
import snapshot from '@twocaretcat/astro-snapshot';
import { FONTS } from './src/config/fonts.ts';
import { SITE } from './src/config/site.ts';
import { SOCIAL_PREVIEW } from './src/config/social-preview.ts';

// https://astro.build/config
export default defineConfig({
	site: SITE.url.base,
	base: SITE.basePath,
	srcDir: SITE.srcDir,
	output: 'static',
	trailingSlash: 'never',
	server: {
		host: true,
	},
	build: {
		assets: 'assets',
		format: 'file',
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'hover',
	},
	image: {
		remotePatterns: [{ protocol: 'https' }],
		responsiveStyles: true,
		layout: 'constrained',
	},
	i18n: I18N_CONFIG.astro,
	experimental: {
		svgo: true,
		fonts: FONTS.map((props) => ({
			...props,
			provider: fontProviders.fontsource(),
		})),
	},
	integrations: [
		betterImageService({
			sharp: {
				webp: {
					effort: 6,
					// Webp has some pretty awful banding on gradients in social preview images regardless of the quality setting, so we use near-lossless mode to prevent this
					nearLossless: true,
				},
				avif: {
					quality: 60,
					effort: 9,
				},
				png: {
					compressionLevel: 9,
				},
			},
		}),
		// TODO: Create a custom Sup component so we don't need to allow HTML
		markdoc({ allowHTML: true }),
		robotsTxt({
			sitemapBaseFileName: `${SITE.sitemapPrefix}-index`,
		}),
		sitemap({
			filenameBase: SITE.sitemapPrefix,
			changefreq: 'monthly',
			lastmod: new Date(),
			i18n: I18N_CONFIG.sitemap,
			serialize(item) {
				const path = new URL(item.url).pathname;

				// Don't include social preview pages in the sitemap
				if (path.includes(`/${SOCIAL_PREVIEW.id}`)) {
					return undefined;
				}

				// The homepage automatically redirects to the default locale, add the x-default hreflang tag
				if (item.links) {
					for (const link of item?.links) {
						if (link.url === `${SITE.url.base}${SITE.basePath}`) {
							link.lang = 'x-default';
						}
					}
				}

				return item;
			},
		}),
		snapshot(ASTRO_SNAPSHOT_CONFIG),
		// Workaround for https://github.com/withastro/prettier-plugin-astro/issues/308
		playformCompress({
			HTML: {
				'html-minifier-terser': {
					minifyCSS: false,
				},
			},
			CSS: {
				csso: false,
				lightningcss: {
					minify: true,
				},
			},
			Image: false,
			SVG: false,
		}),
	],
	vite: {
		optimizeDeps: {
			// The WASM module isn't included in the pre-bundled output for some reason
			// This breaks text linting in dev builds, so we disable optimization for the whole library
			exclude: ['harper.js'],
		},
	},
});
