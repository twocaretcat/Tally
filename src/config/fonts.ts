/**
 * A CSS custom property name that starts with "--".
 */
type CssVariable = `--${string}`;

/**
 * Font weight specifications, either as individual numbers or variable font ranges.
 */
type Weights = number[] | `${number} ${number}`[];

/**
 * Configuration tuple for the fonts used in the application.
 *
 * @property name - The font family name
 * @property cssVariable - The CSS custom property name for this font
 * @property weights - Supported font weights or variable font range
 * @property fallbacks - Ordered list of fallback font families
 */
type FontsConfig = [
	{
		name: Capitalize<string>;
		cssVariable: CssVariable;
		weights: Weights;
		fallbacks: string[];
	},
	{
		name: Capitalize<string>;
		cssVariable: CssVariable;
		weights: Weights;
		fallbacks: string[];
	},
];

/**
 * Global font configuration for the application.
 *
 * Defines the primary and secondary fonts with their CSS variables,
 * weights, and fallback stacks.
 */
export const FONTS = [
	{
		name: 'Lexend',
		cssVariable: '--f-header',
		weights: [700],
		fallbacks: [
			'Avenir',
			'Montserrat',
			'Corbel',
			'URW Gothic',
			'source-sans-pro',
			'sans-serif',
		],
	},
	{
		name: 'Ubuntu Sans',
		cssVariable: '--f-body',
		weights: ['300 800'],
		fallbacks: [
			'Ubuntu',
			'Seravek',
			'Gill Sans Nova',
			'Calibri',
			'DejaVu Sans',
			'source-sans-pro',
			'sans-serif',
		],
	},
] as const satisfies FontsConfig;
