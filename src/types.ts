import type { Lint } from 'harper.js';

/**
 * Transforms a tuple type so that each element may be `undefined`.
 */
export type WithOptionalItems<T extends readonly unknown[]> = {
	[K in keyof T]: T[K] | undefined;
};

/**
 * Utility type for controlling child content in Astro components.
 * @typeParam Required - Whether children are required (true) or prohibited (false). Default: false
 * @typeParam T - The base type to extend (default: empty object)
 */
export type WithChildren<
	Required extends boolean = true,
	T extends Record<string, unknown> = {},
> = T &
	(Required extends true
		? { children: astroHTML.JSX.Element }
		: { children?: never });

/**
 * A string representing an external HTTPS URL.
 */
export type HttpsUrl = `https://${string}`;

/**
 * A tuple representing a substring range in a string.
 * `start` is inclusive and `end` is exclusive.
 */
export type RangeIndices = readonly [start: number, end: number];

/**
 * A group of lint issues that apply to a contiguous section of text.
 */
type LintChunk = {
	/** Start index of the chunk in the source text. */
	start: number;

	/** Lint issues associated with this chunk. */
	lints: Lint[];
};

/**
 * Lint chunks partitioned by their position relative to the visible text.
 *
 * - `visible`: lints within the visible range
 * - `leading`: lints before the visible range
 * - `trailing`: lints after the visible range
 */
export type LintChunkMap = {
	[Key in 'visible' | 'trailing' | 'leading']: LintChunk | undefined;
};
