import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
import Markdoc from '@markdoc/markdoc';
import { SITE } from '@config/site.ts';
import { URL } from '@config/url.ts';
import { assert, get } from 'radashi';

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
			transform(node, config) {
				let href = node.attributes.href;

				// Match variables in the format `$url.some.path`
				if (href.startsWith('$')) {
					const resolvedHref = get(config.variables, href.slice(1));

					assert(typeof resolvedHref === 'string', `Invalid URL reference: ${href}`);

					href = resolvedHref;
				}

				return new Markdoc.Tag(
					this.render,
					{
						...node.attributes,
						href
					},
					node.transformChildren(config)
				);
			},
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
