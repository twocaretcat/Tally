/**
 * Configuration for the input text area.
 *
 * @property id - The localStorage key for persisted input
 * @property defaultValue - The default input text value
 * @property maxCharacters - Maximum character count before showing a warning
 */
type InputConfig = {
	id: string;
	defaultValue: string;
	maxCharacters: number;
};

/**
 * Global input configuration for the application.
 */
export const INPUT = {
	id: 'input',
	defaultValue: '',
	maxCharacters: 100_000,
} as const satisfies InputConfig;
