import type { OptionId } from '@config/option.ts';
import { persistentAtom } from '@nanostores/persistent';

/**
 * Creates a persistent boolean atom that syncs with localStorage.
 *
 * @param key - The localStorage key to use for persistence
 * @param defaultValue - The default boolean value if none exists in storage
 * @returns A persistent atom store containing a boolean value
 */
export function persistentBooleanAtom(key: OptionId, defaultValue: boolean) {
	return persistentAtom<boolean>(key, defaultValue, {
		encode: JSON.stringify,
		decode: JSON.parse,
	});
}
