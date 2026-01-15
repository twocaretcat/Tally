/**
 * MIT License
 *
 * Copyright (c) 2026 John Goodliff (@twocaretcat)
 * Copyright (c) 2024 Alec Larson
 * Copyright (c) 2022 radash
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * ---
 *
 * This function is a modified version of the Radashi v12.1.0 debounce function, which is licensed under the MIT license. This version executes the function immediately if there is no delay pending in order to reduce input latency. It also removes unused options to reduce the bundle size.
 */

declare const setTimeout: (fn: () => void, ms: number) => unknown;
declare const clearTimeout: (timer: unknown) => void;

type DebounceFunction<TArgs extends any[]> = {
	(...args: TArgs): void;
};

interface ImmediateDebounceOptions {
	delay: number;
}

/**
 * Returns a new function that will only call your callback after
 * `delay` milliseconds have passed without any invocations.
 *
 * If a delay is not pending, the function will be called immediately instead.
 *
 * @see https://radashi.js.org/reference/curry/debounce
 * @example
 * ```ts
 * const myDebouncedFunc = debounce({ delay: 1000 }, (x) => {
 *   console.log(x)
 * })
 *
 * myDebouncedFunc(0) // Nothing happens
 * myDebouncedFunc(1) // Nothing happens
 * // Logs "1" about 1 second after the last invocation
 * ```
 * @version 12.1.0
 */
export function immediateDebounce<TArgs extends any[]>(
	{ delay }: ImmediateDebounceOptions,
	func: (...args: TArgs) => any,
): DebounceFunction<TArgs> {
	let timer: unknown = undefined;
	let active = true;

	const debounced: DebounceFunction<TArgs> = (...args: TArgs) => {
		if (active) {
			if (timer === undefined) {
				// No pending debounce, so execute immediately
				func(...args);
				// Start cooldown timer
				timer = setTimeout(() => {
					timer = undefined;
				}, delay);
			} else {
				// Pending debounce exists, so use standard debounce behavior
				clearTimeout(timer);

				timer = setTimeout(() => {
					if (active) {
						func(...args);
					}
					timer = undefined;
				}, delay);
			}
		} else {
			func(...args);
		}
	};

	return debounced;
}
