import {
	defineMarkdocConfig,
	nodes,
	component,
	type Render,
} from '@astrojs/markdoc/config';
import Markdoc, {
	type Config,
	type Node,
	type Tag,
	type ValidationError,
} from '@markdoc/markdoc';
import { SITE } from '@config/site.ts';
import { URL } from '@config/url.ts';
import { assert, get, isString } from 'radashi';

/**
 * Resolves a variable reference or returns the input string as-is.
 *
 * Variable references start with `$` followed by a dot-notation path (e.g., `$some.variable`).
 * If the input starts with `$`, the function looks up the corresponding value in the provided
 * object using the path after the `$`. Otherwise, it returns the input unchanged.
 *
 * Used in Markdoc files to resolve dynamic variable references.
 *
 * @param obj - The object containing variables to resolve against
 * @param variableOrString - Either a variable reference (e.g., `$some.variable`) or a plain string
 * @returns The resolved string value from the object, or the original string if not a variable reference
 *
 * @throws {AssertionError} If `obj` is undefined
 * @throws {AssertionError} If a variable reference doesn't exist in the object
 * @throws {AssertionError} If a variable reference resolves to a non-string value
 *
 * @example
 * const data = { some: { variable: 'hello' } };
 * resolveVariable(data, '$some.variable'); // Returns: 'hello'
 * resolveVariable(data, 'plain text');     // Returns: 'plain text'
 */
function resolveVariable(
	obj: Record<string, unknown> | undefined,
	variableOrString: string,
) {
	assert(obj, 'Object is required by resolveVariable');

	if (variableOrString.startsWith('$')) {
		const value = get(obj, variableOrString.slice(1));

		assert(value, `Variable '${variableOrString}' does not exist`);
		assert(isString(value), `Variable '${variableOrString}' is not a string`);

		return value;
	}

	return variableOrString;
}

/**
 * Validates text nodes to detect potential undefined reference-style links.
 *
 * In Markdown, reference-style links use the format `[text][ref]` where `[ref]`
 * must be defined elsewhere. If a reference appears without a definition, it will
 * be rendered as plain text like `[ref]`. This validator catches these cases.
 *
 * @param node - The text node to validate
 * @returns Array of validation errors if an undefined reference is detected, empty array otherwise
 *
 * @example
 * // This would trigger an error:
 * // "Check out [my link][undefined-ref]"
 * // Result: "[undefined-ref]" has no definition
 */
function validateTextNode(node: Node): ValidationError[] {
	const content = node.attributes.content;

	if (isString(content) && content.startsWith('[') && content.endsWith(']')) {
		return [
			{
				id: 'text-content',
				level: 'error',
				message: `Possible reference-style link '${content}' has no definition.`,
			},
		];
	}

	return [];
}

/**
 * Transforms link nodes to resolve variable references in href attributes.
 *
 * Enables using variable references like `$url.github` in link hrefs, which will
 * be resolved to actual URLs from the config variables at build time.
 *
 * @param node - The link node to transform
 * @param config - The Markdoc config containing variables to resolve against
 * @returns A new Markdoc Tag with the resolved href
 *
 * @example
 * // In Markdoc: [GitHub]($url.github)
 * // With config.variables = { url: { github: 'https://github.com/...' } }
 * // Transforms to: <a href="https://github.com/...">GitHub</a>
 */
function transformLinkNode(
	node: Node,
	config: Config,
	render: Render | undefined,
): Tag {
	const href = resolveVariable(config.variables, node.attributes.href);

	return new Markdoc.Tag(
		render,
		{
			...node.attributes,
			href,
		},
		node.transformChildren(config),
	);
}

export default defineMarkdocConfig({
	variables: {
		site: SITE,
		url: URL,
	},
	nodes: {
		document: {
			...nodes.document,
			render: undefined,
		},
		text: {
			...nodes.text,
			validate: validateTextNode,
		},
		link: {
			...nodes.link,
			render: component('@components/ui/Link.astro'),
			transform(node, config) {
				return transformLinkNode(node, config, this.render);
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
