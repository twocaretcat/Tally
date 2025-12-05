import type { HttpsUrl } from '../types.ts';

/**
 * The complete site configuration structure.
 *
 * @property title - The application name
 * @property sitemapPrefix - Prefix for sitemap files
 * @property url - URLs for the site, repository, and related resources
 * @property author - Author information including name and social links
 */
type SiteConfig = {
	title: Capitalize<string>;
	basePath: string;
	srcDir: string;
	sitemapPrefix: string;
	url: {
		base: HttpsUrl;
		github: HttpsUrl;
		issues: HttpsUrl;
		funding: HttpsUrl;
		license: HttpsUrl;
		privacyPolicy: HttpsUrl;
	};
	author: {
		name: {
			first: Capitalize<string>;
			last: Capitalize<string>;
			full: Capitalize<string>;
		};
		url: {
			homepage: HttpsUrl;
			github: HttpsUrl;
			linkedin: HttpsUrl;
		};
		username: {
			x: `@${string}`;
		};
	};
};

const AUTHOR_FIRST_NAME = 'John' as const;
const AUTHOR_LAST_NAME = 'Goodliff' as const;
const AUTHOR_HOMEPAGE_URL: HttpsUrl = 'https://johng.io' as const;
const AUTHOR_GITHUB_URL: HttpsUrl = 'https://github.com/twocaretcat' as const;
const REPO_URL: HttpsUrl = `${AUTHOR_GITHUB_URL}/Tally`;

/**
 * Global site configuration.
 *
 * Contains the site title, URLs for external resources, and author information.
 */
export const SITE = {
	title: 'Tally',
	basePath: '/',
	srcDir: 'src',
	sitemapPrefix: 'sitemap',
	url: {
		base: 'https://tally.johng.io',
		github: REPO_URL,
		issues: `${REPO_URL}/issues`,
		funding: `${AUTHOR_HOMEPAGE_URL}/funding`,
		license: `${REPO_URL}/blob/main/LICENSE`,
		privacyPolicy: `${AUTHOR_HOMEPAGE_URL}/privacy-policy`,
	},
	author: {
		name: {
			first: AUTHOR_FIRST_NAME,
			last: AUTHOR_LAST_NAME,
			full: `${AUTHOR_FIRST_NAME} ${AUTHOR_LAST_NAME}`,
		},
		url: {
			homepage: AUTHOR_HOMEPAGE_URL,
			github: AUTHOR_GITHUB_URL,
			linkedin: 'https://www.linkedin.com/in/johngoodliff/',
		},
		username: {
			x: '@twocaretcat',
		},
	},
} as const satisfies SiteConfig;
