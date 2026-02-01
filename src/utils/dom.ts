import { assert } from 'radashi';

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
 * Builds a hyphen-separated DOM-safe ID from multiple parts.
 *
 * @param args - ID segments to concatenate.
 * @returns A hyphen-joined ID string.
 */
export function buildId(...args: string[]) {
	return args.join('-') as `${string}-${string}`;
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
 * Joins class name strings into a single space-delimited string.
 *
 * Ignores falsy values such as `undefined` and `null`.
 *
 * @param classes - Class name values to combine
 * @returns A space-separated class name string
 */
export function clsx(...classes: (string | undefined | null)[]) {
	return classes.filter(Boolean).join(' ');
}

/**
 * Invokes a callback once at the start of each scroll interaction.
 *
 * Attaches a one-time `scroll` listener that is re-armed after `scrollend`,
 * allowing the callback to fire only on the initial scroll event per gesture.
 *
 * @param element - Element to observe for scroll interactions.
 * @param callback - Function called at the start of scrolling.
 */
export function addScrollStartListener<T extends HTMLElement = HTMLElement>(
	element: T,
	callback: () => void,
) {
	function addScrollListener() {
		element.addEventListener('scroll', callback, {
			once: true,
		});
	}

	element.addEventListener('scrollend', () => {
		element.removeEventListener('scroll', callback);

		addScrollListener();
	});

	addScrollListener();
}
