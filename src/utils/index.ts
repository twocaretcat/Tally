// This file is imported by astro.config.ts which doesn't support aliases, so we can't use them here either
import { assert, tryit, type Result } from 'radashi';
import { INPUT } from '../config/input.ts';
import { SITE } from '../config/site.ts';
import { THEME, type ThemeId } from '../config/theme.ts';
import type { HttpsUrl } from '../types.ts';

/**
 * Returns the keys of an object with proper type inference.
 *
 * @param obj - The object to extract keys from
 * @returns An array of the object's keys, typed as `keyof T`
 */
export function keysOf<T extends object>(obj: T): (keyof T)[] {
	return Object.keys(obj) as (keyof T)[];
}

/**
 * Returns the entries of an object with proper type inference.
 *
 * @param obj - The object to extract entries from
 * @returns An array of key-value pairs, properly typed
 */
export function entriesOf<T extends object>(obj: T): [keyof T, T[keyof T]][] {
	return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Gets a DOM element by ID and asserts it exists.
 *
 * @typeParam T - The expected HTML element type (default: HTMLElement)
 * @param id - The element ID to search for
 * @returns The DOM element
 * @throws {Error} If no element with the given ID exists
 */
export function getDefinedElementById<T extends HTMLElement = HTMLElement>(
	id: string,
): T {
	const element = document.getElementById(id) as T | null;

	assert(element, `element with id '${id}' does not exist`);

	return element;
}

/**
 * Generates a view transition name from the provided keys for cross-document view transitions.
 *
 * @param keys - One or more strings to join as the transition name (null/undefined values are filtered out)
 * @returns An object containing the style property with viewTransitionName
 */
export function wKey(...keys: (string | undefined | null)[]) {
	const key = keys.filter(Boolean).join('-');

	return {
		style: {
			viewTransitionName: key,
		},
	};
}

/**
 * Checks if a URL string is an external HTTPS URL.
 *
 * @param urlString - The URL string to check
 * @returns True if the URL starts with "https://"
 */
export function isExternalUrl(urlString: string): urlString is HttpsUrl {
	return urlString.startsWith('https://');
}

/**
 * Converts a relative path to an absolute URL using the site's base URL.
 *
 * @param path - The relative path to convert
 * @returns The absolute URL as a string
 */
export function pathToAbsoluteUrl(path: string) {
	return new URL(path, SITE.url.base).href;
}

/**
 * Parses a string into a boolean value.
 *
 * Accepts the following formats:
 * - Number strings: '1' (true) or '0' (false)
 * - Boolean strings: 'true' (true) or 'false' (false) - case insensitive
 *
 * @param value - The string value to parse into a boolean
 * @returns A tuple of [error, result] where error is null on success,
 *          or an Error object if the value cannot be parsed
 *
 * @example
 * ```ts
 * const [err1, result1] = parseBoolean('true');  // [null, true]
 * const [err2, result2] = parseBoolean('1');     // [null, true]
 * const [err3, result3] = parseBoolean('false'); // [null, false]
 * const [err4, result4] = parseBoolean('0');     // [null, false]
 * const [err5, result5] = parseBoolean('yes');   // [Error, undefined]
 * ```
 */
export function parseBoolean(value: string): Result<boolean, Error> {
	const truthyValues = ['true', '1'];
	const falsyValues = ['false', '0'];

	return tryit(() => {
		const normalizedValue = value.trim().toLowerCase();

		if (truthyValues.includes(normalizedValue)) return true;
		if (falsyValues.includes(normalizedValue)) return false;

		throw new Error(
			`Cannot parse '${value}' into a boolean. Expected one of: ${[...truthyValues, ...falsyValues].join(', ')}.`,
		);
	})();
}

/**
 * Decodes a URL query parameter, handling both URI encoding and plus-encoded spaces.
 *
 * @param param - The encoded query parameter string
 * @returns The decoded string with spaces properly restored
 */
export function decodeQueryParam(param: string) {
	return decodeURIComponent(param.replaceAll('+', ' '));
}

/**
 * Generates a absolute page path with theme and input text query parameters.
 *
 * @param basePath - The base path for the page
 * @param theme - The theme ID to apply in the preview
 * @param input - The input text to display in the preview
 * @returns A fully constructed path with query parameters
 */
export function buildPagePath(basePath: string, theme: ThemeId, input: string) {
	return `${basePath}?${THEME.id}=${theme}&${INPUT.id}=${encodeURIComponent(input)}` as const;
}
