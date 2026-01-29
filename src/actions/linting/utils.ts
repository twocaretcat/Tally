import { getPreferredLocales } from '@i18n/index.ts';
import type { WithOptionalItems } from '../../types.ts';
import {
	LINTING,
	type LintingLanguageId,
	type LintingRegionId,
} from '@config/linting.ts';
import type { LocaleId } from '@config/locale.ts';

/**
 * Start indices for up to three contiguous chunks: leading, center, and trailing.
 */
type ChunkIndices = [number, number, number];

/**
 * Determines the best matching linting region for a locale.
 *
 * Uses the user's preferred browser regions and falls back
 * to the locale's default region when no match is found.
 *
 * @param localeId - Linting language ID.
 * @returns The best matching linting region ID.
 */
export function getBestMatchingLintingRegion<T extends LintingLanguageId>(
	localeId: T,
): LintingRegionId<T> {
	const { defaultValue, map } = LINTING.locale.map[localeId];

	for (const { regionId } of getPreferredLocales()) {
		if (regionId && regionId in map) {
			return regionId as keyof typeof map;
		}
	}

	return defaultValue;
}

/**
 * Type guard indicating whether a locale supports linting.
 *
 * @param localeId - Locale ID to check.
 * @returns `true` if the locale has linting support.
 */
export function doesLocaleSupportLinting(
	localeId: LocaleId,
): localeId is keyof typeof LINTING.locale.map {
	return localeId in LINTING.locale.map;
}

/**
 * Computes start indices for chunk boundaries, optionally merging
 * leading or trailing chunks into the center one when they are too small.
 *
 * @param endIndices - End indices of the leading, center, and trailing chunks.
 * @param minSize - Minimum allowed chunk size before merging (default: 1).
 * @returns Tuple of start indices, with `undefined` for empty (or merged) chunks.
 */
export function computeChunkStartIndices(
	endIndices: ChunkIndices,
	minSize: number = 1,
) {
	const startIndices: WithOptionalItems<ChunkIndices> = [
		0,
		endIndices[0],
		endIndices[1],
	];

	// First chunk is too small so we merge it with the center chunk
	if (endIndices[0] < minSize) {
		startIndices[0] = undefined;
		startIndices[1] = 0;
	}

	// Last chunk is too small so we merge it with the center chunk
	if (endIndices[2] - endIndices[1] < minSize) {
		startIndices[2] = undefined;
	}

	return startIndices;
}
