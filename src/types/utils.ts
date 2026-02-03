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
