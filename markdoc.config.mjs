// @ts-check
import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
import { SITE } from '@config/site.ts';
import { URL } from '@config/url.ts';

/** @type {import('@markdoc/markdoc').Config} */
export default defineMarkdocConfig({
	variables: {
		site: SITE,
		url: URL,
	},
	nodes: {
		document: {
			...nodes.document,
			render: null,
		},
		link: {
			...nodes.link,
			render: component('@components/ui/Link.astro'),
		},
		strong: {
			...nodes.strong,
			render: component('@components/ui/Strong.astro'),
		},
		blockquote: {
			...nodes.blockquote,
			render: component('@components/ui/Alert.astro'),
		},
		image: {
			...nodes.image,
			render: component('@components/ui/Image.astro'),
		},
	},
	tags: {
		bdo: {
			render: component('@components/ui/Bdo.astro'),
			attributes: {
				dir: {
					type: String,
					matches: ['ltr', 'rtl'],
				},
			},
		},
		licenseButtonLink: {
			render: component('@components/app/LicenseButtonLink.astro'),
			attributes: {
				to: {
					type: String,
				},
				label: {
					type: String,
				},
			},
		},
	},
});
