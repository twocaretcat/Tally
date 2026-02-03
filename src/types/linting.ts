import type { Lint } from 'harper.js';

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
