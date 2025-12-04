import type { HttpsUrl } from '../types.ts';

/**
 * Configuration object for external resources with a homepage
 *
 * @property homepage - The main homepage URL for the resource
 */
type WithHomepage = {
	homepage: HttpsUrl;
};

/**
 * Configuration object for external resources with both a homepage URL and a license URL.
 *
 * @property license - The URL pointing to the license information
 */
type WithHomepageAndLicense = WithHomepage & {
	license: HttpsUrl;
};

/**
 * Type definition for the URL configuration object structure.
 */
type UrlConfig = {
	mergist: WithHomepage;
	tallyTs: WithHomepage;
	tallyExtension: WithHomepage & {
		chromeWebStore: HttpsUrl;
	};
	okSolar: WithHomepageAndLicense;
	gruvbox: WithHomepageAndLicense;
	catppuccin: WithHomepageAndLicense;
	dracula: WithHomepageAndLicense;
	nord: WithHomepageAndLicense;
	iMockupPro: WithHomepageAndLicense;
	lucide: WithHomepageAndLicense;
	animatedCssLoader: WithHomepageAndLicense & {
		author: HttpsUrl;
	}
	astroBadges: WithHomepage;
	astro: WithHomepage;
};

/**
 * Centralized configuration for all external URLs used in the application.
 * Includes links to color themes, icon libraries, UI components, and third-party services.
 */
export const URL = {
	mergist: {
		homepage: 'https://mergist.johng.io',
	},
	tallyTs: {
		homepage: 'https://github.com/twocaretcat/tally-ts',
	},
	tallyExtension: {
		homepage: 'https://github.com/twocaretcat/Tally-Extension',
		chromeWebStore: 'https://chromewebstore.google.com/detail/tally-word-counter/eggkmbghbmjmbdjloifaklghfiecjbnk',
	},
	okSolar: {
		homepage: 'https://meat.io/oksolar',
		license: 'https://creativecommons.org/publicdomain/zero/1.0/',
	},
	gruvbox: {
		homepage: 'https://github.com/morhetz/gruvbox',
		license: 'https://opensource.org/license/mit',
	},
	catppuccin: {
		homepage: 'https://catppuccin.com',
		license: 'https://catppuccin.com/licensing/',
	},
	dracula: {
		homepage: 'https://draculatheme.com',
		license: 'https://github.com/dracula/dracula-theme/blob/main/LICENSE',
	},
	nord: {
		homepage: 'https://www.nordtheme.com',
		license: 'https://github.com/nordtheme/nord/blob/develop/license',
	},
	iMockupPro: {
		homepage: 'https://imockup.pro/',
		license: 'https://imockup.pro/license',
	},
	lucide: {
		homepage: 'https://lucide.dev/',
		license: 'https://lucide.dev/license',
	},
	animatedCssLoader: {
		homepage: 'https://uiverse.io/Nawsome/kind-mole-87',
		author: 'https://uiverse.io/Nawsome',
		license: 'https://opensource.org/license/mit',
	},
	astroBadges: {
		homepage: 'https://astro.badg.es/',
	},
	astro: {
		homepage: 'https://astro.build/',
	},
} as const satisfies UrlConfig;
