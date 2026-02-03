/**
 * Configuration for a single user preference option.
 *
 * @property defaultValue - The default boolean value
 */
type Option = {
	defaultValue: boolean;
};

/**
 * A record mapping option names to their configurations.
 */
type OptionMap = Record<string, Option>;

/**
 * The complete options configuration structure.
 *
 * @property id - The section identifier for options
 * @property map - Map of all available options
 */
type OptionConfig = {
	id: string;
	map: OptionMap;
};

const optionMap = {
	rememberInputText: {
		defaultValue: false,
	},
	warnOnLargeInputText: {
		defaultValue: true,
	},
	enableLinting: {
		defaultValue: true,
	},
	enableDebugLogging: {
		defaultValue: false,
	},
} as const satisfies OptionMap;

/**
 * Global options configuration for the application.
 */
export const OPTION = {
	id: 'options',
	map: optionMap,
} as const satisfies OptionConfig;

/**
 * Union type of all valid option IDs.
 */
export type OptionId = keyof typeof optionMap;
