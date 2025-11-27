import type { ThemeId } from './theme.ts';

/**
 * Configuration for a collection of screenshots.
 * Each entry defines a theme and the input text to display in that screenshot.
 *
 * @property theme - The theme to use for rendering this screenshot
 * @property input - The input text to display, must start with a capital letter
 */
type ScreenshotsConfig = {
	theme: ThemeId;
	input: Capitalize<string>;
}[];

/**
 * Complete configuration for a screenshot generation set.
 * Defines output settings and the list of screenshots to generate.
 *
 * @property outDir - Output directory path where screenshots will be saved
 * @property width - Width of the generated screenshots in pixels
 * @property height - Height of the generated screenshots in pixels
 * @property list - List of individual screenshot configurations to generate
 */
type ScreenshotConfig = {
	outDir: string;
	width: number;
	height: number;
	list: ScreenshotsConfig;
};

const screenshots = [
	{
		theme: 'light',
		input: 'For an instant, everything was bathed in radiance.\n\n- March',
	},
	{
		theme: 'dark',
		input:
			'He was soon borne away by the waves, and lost in darkness and distance.\n\n- Frankenstein; or, The Modern Prometheus',
	},
	{
		theme: 'teal',
		input:
			'Assuredly the turquoise doth possess a soul more intelligent than that of man.\n\n- Anselmus De Boodt',
	},
	{
		theme: 'dusk',
		input:
			"There's a special quality to the loneliness of dusk, a melancholy more brooding even than the night's.\n\n- Ed Gorman, Everybody's Somebody's Fool",
	},
] as const satisfies ScreenshotsConfig;

/**
 * Global configuration for screenshot generation.
 */
export const SCREENSHOT = {
	id: 'preview',
	outDir: 'docs/images/theme/',
	width: 960,
	height: 1280,
	list: screenshots,
} as const satisfies ScreenshotConfig;
