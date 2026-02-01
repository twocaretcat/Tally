import { getDefinedElementById } from '@utils/index.ts';
import type { Lint } from 'harper.js';
import { assert } from 'radashi';

export const CLASS = {
	lintKindText: 'lint-kind-text',
	lintMessage: 'lint-message',
} as const;

/**
 * Updates the contents and styling of a lint card.
 *
 * Sets the lint type label, message HTML, and accent color
 * based on the provided lint data.
 *
 * @param id - DOM ID of the lint card root element.
 * @param lint - Lint data used to populate the card.
 */
export function updateLintCardById(id: string, lint: Lint) {
	const card = getDefinedElementById(id);
	const lintKind = card.querySelector<HTMLElement>(`.${CLASS.lintKindText}`);
	const lintMessage = card.querySelector<HTMLElement>(`.${CLASS.lintMessage}`);

	assert(lintKind);
	assert(lintMessage);

	lintKind.textContent = lint.lint_kind_pretty();
	lintMessage.innerHTML = lint.message_html();

	card.style.setProperty('--lint-card-color', `var(--${lint.lint_kind()})`);
}
