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
 * Adds a value to a Set stored in a Map, creating the Set if it doesn't exist.
 *
 * @param map - The Map containing Sets as values
 * @param key - The key to add the value under
 * @param value - The value to add to the Set
 * @param SetConstructor - Constructor for creating new Set instances
 *
 * @template K - The type of the Map's keys
 * @template V - The type of values stored in the Set
 * @template S - The type of Set used (must have an `add` method)
 */
export function addValueToMapSet<K, V, S extends { add(value: V): S }>(
	map: Map<K, S>,
	key: K,
	value: V,
	SetConstructor: new () => S,
) {
	const set = map.get(key) ?? new SetConstructor();

	set.add(value);
	map.set(key, set);
}
