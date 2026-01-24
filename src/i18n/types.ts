import type { OptionId } from '@config/option.ts';
import type { OutputId } from '@config/output.ts';
import type { ThemeId } from '@config/theme.ts';

/**
 * An object containing a capitalized title string.
 */
type WithTitle = {
	title: Capitalize<string>;
};

/**
 * An object containing a capitalized label string.
 */
type WithLabel = {
	label: Capitalize<string>;
};

/**
 * An object containing a capitalized tooltip string.
 */
type WithTooltip = {
	tooltip: Capitalize<string>;
};

/**
 * Localized strings for a button link component.
 *
 * @property label - The visible button text
 * @property tooltip - The tooltip text shown on hover
 */
type ButtonLink = WithLabel & WithTooltip;

/**
 * A map of output IDs to their localized labels.
 */
type OutputMap = {
	[id in OutputId]: WithLabel & Partial<WithLabel>;
};

/**
 * A map of option IDs to their localized labels.
 */
type OptionMap = {
	[id in OptionId]: WithLabel;
};

/**
 * A map of option IDs to their localized labels.
 */
type LintingLocaleMap = {
	auto: WithLabel;
};

/**
 * A map of theme IDs to their localized labels.
 */
type ThemeMap = {
	[id in ThemeId]: WithLabel;
};

/**
 * The complete structure of all locale strings for the application.
 *
 * Defines the shape of translation objects including site metadata, UI labels,
 * navigation items, footer content, and configuration options.
 */
export type LocaleMessages = {
	site: WithTitle & {
		description: Capitalize<string>;
		longDescription: Capitalize<string>;
		features: Capitalize<string>[];
		requirements: Capitalize<string>;
		keywords: string[];
	};
	icon: {
		license: WithLabel;
		sponsorOnly: WithLabel;
		experimental: WithLabel;
	};
	alert: {
		note: WithTitle;
		warning: WithTitle;
		error: WithTitle;
	};
	header: WithLabel;
	input: WithLabel & {
		placeholder: Capitalize<string>;
		largeInputWarning: {
			message: Capitalize<string>;
		};
	};
	output: {
		placeholder: Capitalize<string>;
		map: OutputMap;
	};
	nav: {
		viewSource: ButtonLink;
		reportIssue: ButtonLink;
		sponsor: ButtonLink;
		moreProjects: ButtonLink;
	};
	option: {
		locale: WithTitle;
		general: WithTitle & {
			map: OptionMap;
		};
		lintingLocale: WithTitle & {
			unsupportedWarning: WithTooltip;
			map: LintingLocaleMap;
		};
		theme: WithTitle & {
			map: ThemeMap;
		};
	};
};
