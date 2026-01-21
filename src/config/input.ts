/**
 * Configuration for the input text area.
 *
 * @property id - The localStorage key for persisted input
 * @property default - The default input text value
 * @property maxCharacters - Maximum character count before showing a warning
 */
type InputConfig = {
	id: string;
	default: string;
	maxCharacters: number;
};

/**
 * Global input configuration for the application.
 */
export const INPUT = {
	id: 'input',
	default: '',
	maxCharacters: 100_000,
} as const satisfies InputConfig;
