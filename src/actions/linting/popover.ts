import { $lintPopover } from '@stores/index.ts';
import type { Lint } from 'harper.js';

/**
 * Updates the lint popover position and content.
 *
 * Opens the popover for a new lint at the given viewport coordinates,
 * or hides it when the same lint is selected again or no lint is provided.
 *
 * @param lint - Lint to display.
 * @param clientX - Viewport X coordinate.
 * @param clientY - Viewport Y coordinate.
 */
export async function updateLintPopover(
	lint: Lint | undefined,
	clientX: number,
	clientY: number,
) {
	// If the user clicks on the same lint again or their click doesn't intersect a lint range, hide the popover
	if (!lint || lint === $lintPopover.get().lint) {
		clearLintPopover();

		return;
	}

	console.debug('Updating lint popover');

	const { clientWidth, clientHeight } = document.documentElement;

	// Using a relative position allows the viewport to be resized without needing to recalculate the position of the popover
	$lintPopover.set({
		x: (clientX / clientWidth) * 100,
		y: (clientY / clientHeight) * 100,
		lint,
	});
}

/**
 * Clears the lint popover state.
 *
 * Hides the popover and removes the active lint.
 */
export function clearLintPopover() {
	console.debug('Clearing lint popover');

	$lintPopover.set({
		x: 50,
		y: 50,
		lint: null,
	});
}
