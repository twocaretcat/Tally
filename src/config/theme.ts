/**
 * Configuration for a single theme.
 *
 * @property wip - Whether the theme is still a work in progress
 * @property sponsor - Whether the theme requires sponsorship to access
 */
export type Theme = {
	wip: boolean;
	sponsor: boolean;
};

/**
 * A record mapping theme IDs to their configuration objects.
 */
type ThemeMap = Record<string, Theme>;

/**
 * The complete theme configuration structure.
 *
 * @property id - The localStorage key for theme persistence
 * @property defaultValue - The default theme ID and color
 * @property map - Map of all available themes
 */
type ThemeConfig = {
	id: string;
	defaultValue: {
		id: ThemeId;
		color: string;
	};
	map: ThemeMap;
};

const freeTheme = {
	wip: false,
	sponsor: false,
} as const satisfies Theme;

const themeMap = {
	auto: freeTheme,
	amoled: freeTheme,
	light: freeTheme,
	dark: freeTheme,
	teal: freeTheme,
	dusk: freeTheme,
	solarizedLight: freeTheme,
	solarizedDark: freeTheme,
	gruvboxLight: freeTheme,
	gruvboxDark: freeTheme,
	catppuccinLatte: freeTheme,
	catppuccinMocha: freeTheme,
	nord: freeTheme,
	dracula: freeTheme,
} as const satisfies ThemeMap;

/**
 * Global theme configuration for the application.
 *
 * Defines the default theme, persistence key, and all available themes.
 */
export const THEME = {
	id: 'theme',
	defaultValue: {
		id: 'auto',
		color: '#151515',
	},
	map: themeMap,
} as const satisfies ThemeConfig;

/**
 * Union type of all valid theme IDs.
 */
export type ThemeId = keyof typeof themeMap;
