import type { ThemeId } from './theme.ts';

type Dir = `${string}/`;

/**
 * Configuration for screenshot output presets.
 *
 * @property outDir - Output directory where screenshots will be saved
 * @property width - Screenshot width in pixels
 * @property height - Screenshot height in pixels
 * @property scale - Page scale factor applied during rendering
 */
type OutputOptionsConfig = {
	outDir: Dir;
	width: number;
	height: number;
	scale: number;
}[];

/**
 * Configuration for screenshot variants.
 * Each entry defines the theme and text content rendered in a screenshot.
 * These values are passed to the page as query parameters.
 *
 * @property theme - Theme used to render the screenshot
 * @property input - Text content to display
 */
type VariantsConfig = {
	theme: ThemeId;
	input: Capitalize<string>;
}[];

/**
 * Complete configuration for screenshot generation.
 *
 * @property variants - List of themed screenshot variants to render
 * @property outputOptions - List of output presets to generate for each variant
 */
type ScreenshotConfig = {
	variants: VariantsConfig;
	outputOptions: OutputOptionsConfig;
};

const outputOptions = [
	{
		outDir: 'docs/images/theme/',
		width: 2 * 960,
		height: 2 * 1280,
		scale: 2,
	},
	{
		outDir: 'docs/launch/product-hunt/',
		width: 1270,
		height: 760,
		scale: 0.8,
	},
	{
		outDir: 'docs/launch/peerlist/',
		width: 1200,
		height: 630,
		scale: 0.66,
	},
] as const satisfies OutputOptionsConfig;

const variants = [
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
] as const satisfies VariantsConfig;

/**
 * Global configuration for screenshot generation.
 */
export const SCREENSHOT = {
	variants,
	outputOptions,
} as const satisfies ScreenshotConfig;
