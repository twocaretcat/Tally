/**
 * Locale messages for en-US (American English)
 * @module
 */

import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

// A short tagline shown beside the app name in some cases for additional context
const TAGLINE = 'Word Counter' as const;
// A short description of the site
const DESCRIPTION =
	'Your favorite dark mode word counter, now with even more themes!' as const;

/**
 * English locale strings for the entire application.
 *
 * Contains translations for site metadata, UI labels, messages, and all user-facing text.
 */
const messages: LocaleMessages = {
	site: {
		// Full site title shown in browser tabs
		title: `${SITE.title} - ${TAGLINE}`,
		// Short description shown below the page title
		description: DESCRIPTION,
		// Extended description for SEO and social sharing
		longDescription: `${DESCRIPTION} Count the number of characters, words, sentences, paragraphs, and lines in your text instantly with ${SITE.title}.`,
		// SEO list of key features. Used in structured data markup
		features: ['Word counting', 'Character counting', 'Character statistics'],
		// SEO browser requirements. Used in structured data markup
		requirements: 'Requires a modern web browser',
		// SEO keywords. Used in structured data markup
		keywords: [
			'character counter',
			'word counter',
			'sentence counter',
			'paragraph counter',
			'line counter',
			'text analysis',
			'text analyzer',
			'text statistics',
			'online tool',
		],
	},
	icon: {
		license: {
			// Accessible label for license icon
			label: 'License',
		},
		sponsorOnly: {
			// Accessible label for sponsor-only feature icon
			label: 'Sponsor-only',
		},
		experimental: {
			// Accessible label for experimental feature icon
			label: 'Experimental',
		},
	},
	alert: {
		note: {
			// Title for alerts of type 'note'
			title: 'Note',
		},
		warning: {
			// Title for alerts of type 'warning'
			title: 'Warning',
		},
		error: {
			// Title for alerts of type 'error'
			title: 'Error',
		},
	},
	header: {
		// Accessible label for the header/logo link
		label: `${SITE.title} homepage`,
	},
	input: {
		// Accessible label for the text input area
		label: 'Text input',
		// Placeholder text shown in empty input area
		placeholder: 'The quick brown cat jumps over the lazy dog...',
		largeInputWarning: {
			// Warning message shown when input exceeds character limit
			message:
				"You've entered a large amount of text. This may cause performance issues. Do you want to continue?\n\n(You can disable this warning in the options.)",
		},
	},
	output: {
		// Placeholder text shown when no counts are available
		placeholder: '-',
		map: {
			// Character count label
			characters: {
				label: 'Characters',
			},
			// Word count label
			words: {
				label: 'Words',
			},
			// Sentence count label
			sentences: {
				label: 'Sentences',
			},
			// Paragraph count label
			paragraphs: {
				label: 'Paragraphs',
			},
			// Line count label
			lines: {
				label: 'Lines',
			},
			// Space count label
			spaces: {
				label: 'Spaces',
			},
			// Letter count label
			letters: {
				label: 'Letters',
			},
			// Digit count label
			digits: {
				label: 'Digits',
			},
			// Punctuation count label
			punctuation: {
				label: 'Punctuation',
			},
			// Symbol/special count label
			symbols: {
				label: 'Symbols',
			},
		},
	},
	nav: {
		viewSource: {
			// Navigation link text for GitHub repository
			label: 'View source',
			// A more verbose tooltip shown on hover
			tooltip: 'View the source code on GitHub',
		},
		reportIssue: {
			// Navigation link text for issue tracker
			label: 'Report issue',
			// A more verbose tooltip shown on hover
			tooltip: 'Report an issue',
		},
		sponsor: {
			// Navigation link text for sponsorship page
			label: 'Sponsor me',
			// A more verbose tooltip shown on hover
			tooltip: 'Sponsor this project',
		},
		moreProjects: {
			// Navigation link text for author's other projects
			label: 'More projects',
			// A more verbose tooltip shown on hover
			tooltip: 'View more projects by me',
		},
	},
	locales: {
		// Section title for language selector
		title: 'Language',
	},
	options: {
		// Section title for user preferences
		title: 'Options',
		// Option names
		map: {
			rememberInputText: {
				label: 'Remember input text',
			},
			warnOnLargeInputText: {
				label: 'Warn on large input text',
			},
			enableDebugLogging: {
				label: 'Enable debug logging',
			},
		},
	},
	themes: {
		// Section title for theme selector
		title: 'Theme',
		// Theme names
		map: {
			// Automatic theme based on system preference
			auto: {
				label: 'Auto',
			},
			// Pure black theme for OLED displays
			amoled: {
				label: 'AMOLED',
			},
			light: {
				label: 'Light',
			},
			dark: {
				label: 'Dark',
			},
			teal: {
				label: 'Teal',
			},
			dusk: {
				label: 'Dusk',
			},
			solarizedLight: {
				label: 'Solarized Light',
			},
			solarizedDark: {
				label: 'Solarized Dark',
			},
			gruvboxLight: {
				label: 'Gruvbox Light',
			},
			gruvboxDark: {
				label: 'Gruvbox Dark',
			},
			catppuccinLatte: {
				label: 'Catppuccin Latte',
			},
			catppuccinMocha: {
				label: 'Catppuccin Mocha',
			},
			nord: {
				label: 'Nord',
			},
			dracula: {
				label: 'Dracula',
			},
		},
	},
} as const satisfies LocaleMessages;

export default messages;
