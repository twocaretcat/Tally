/**
 * Locale messages for ar (Arabic)
 * @module
 */

import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

const TAGLINE = 'عداد الكلمات' as const;
const DESCRIPTION =
	'عداد الكلمات المفضل لديك بالوضع المظلم، الآن مع المزيد من الثيمات!' as const;

/**
 * Arabic locale strings for the entire application.
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
		longDescription: `${DESCRIPTION} قم بعد عدد الأحرف والكلمات والجمل والفقرات والأسطر في نصك على الفور باستخدام ${SITE.title}.`,
		// SEO list of key features. Used in structured data markup
		features: ['عد الكلمات', 'عد الأحرف', 'إحصائيات الأحرف'],
		// SEO browser requirements. Used in structured data markup
		requirements: 'يتطلب متصفح ويب حديث',
		// SEO keywords. Used in structured data markup
		keywords: [
			'عداد الأحرف',
			'عداد الكلمات',
			'عداد الجمل',
			'عداد الفقرات',
			'عداد الأسطر',
			'تحليل النص',
			'محلل النص',
			'إحصائيات النص',
			'أداة على الإنترنت',
		],
	},
	icon: {
		license: {
			label: 'ترخيص',
		},
		sponsorOnly: {
			label: 'للداعمين فقط',
		},
		experimental: {
			label: 'تجريبي',
		},
	},
	alert: {
		note: {
			// Title for alerts of type 'note'
			title: 'ملاحظة',
		},
		warning: {
			title: 'تحذير',
		},
		error: {
			// Title for alerts of type 'error'
			title: 'خطأ',
		},
	},
	header: {
		// Accessible label for the header/logo link
		label: `الصفحة الرئيسية لـ ${SITE.title}`,
	},
	input: {
		// Accessible label for the text input area
		label: 'إدخال النص',
		// Placeholder text shown in empty input area
		placeholder: 'القطة البنية السريعة تقفز فوق الكلب الكسول...',
		largeInputWarning: {
			// Warning message shown when input exceeds character limit
			message:
				'لقد أدخلت كمية كبيرة من النص. قد يسبب هذا مشاكل في الأداء. هل تريد المتابعة؟\n\n(يمكنك تعطيل هذا التحذير في الخيارات.)',
		},
	},
	output: {
		// Placeholder text shown when no counts are available
		placeholder: '-',
		map: {
			// Character count label
			characters: {
				label: 'الأحرف',
			},
			// Word count label
			words: {
				label: 'الكلمات',
			},
			// Sentence count label
			sentences: {
				label: 'الجمل',
			},
			// Paragraph count label
			paragraphs: {
				label: 'الفقرات',
			},
			// Line count label
			lines: {
				label: 'الأسطر',
			},
			// Space count label
			spaces: {
				label: 'المسافات',
			},
			// Letter count label
			letters: {
				label: 'الحروف',
			},
			// Digit count label
			digits: {
				label: 'الأرقام',
			},
			// Punctuation count label
			punctuation: {
				label: 'علامات الترقيم',
			},
			// Symbol/special count label
			symbols: {
				label: 'الرموز',
			},
		},
	},
	nav: {
		viewSource: {
			// Navigation link text for GitHub repository
			label: 'عرض الكود المصدري',
			// A more verbose tooltip shown on hover
			tooltip: 'عرض الكود المصدري على GitHub',
		},
		reportIssue: {
			// Navigation link text for issue tracker
			label: 'الإبلاغ عن مشكلة',
			// A more verbose tooltip shown on hover
			tooltip: 'الإبلاغ عن مشكلة',
		},
		sponsor: {
			// Navigation link text for sponsorship page
			label: 'رعاية المشروع',
			// A more verbose tooltip shown on hover
			tooltip: 'رعاية هذا المشروع',
		},
		moreProjects: {
			// Navigation link text for author's other projects
			label: 'مشاريع أخرى',
			// A more verbose tooltip shown on hover
			tooltip: 'عرض المزيد من مشاريعي',
		},
	},
	locales: {
		// Section title for language selector
		title: 'اللغة',
	},
	options: {
		// Section title for user preferences
		title: 'الخيارات',
		// Option names
		map: {
			rememberInputText: {
				label: 'تذكر نص الإدخال',
			},
			warnOnLargeInputText: {
				label: 'التحذير عند إدخال نص كبير',
			},
			enableDebugLogging: {
				label: 'تفعيل تسجيل التصحيح',
			},
		},
	},
	themes: {
		// Section title for theme selector
		title: 'الثيم',
		// Theme names
		map: {
			// Automatic theme based on system preference
			auto: {
				label: 'تلقائي',
			},
			// Pure black theme for OLED displays
			amoled: {
				label: 'AMOLED',
			},
			light: {
				label: 'فاتح',
			},
			dark: {
				label: 'داكن',
			},
			teal: {
				label: 'فيروزي',
			},
			dusk: {
				label: 'الشفق',
			},
			solarizedLight: {
				label: 'Solarized فاتح',
			},
			solarizedDark: {
				label: 'Solarized داكن',
			},
			gruvboxLight: {
				label: 'Gruvbox فاتح',
			},
			gruvboxDark: {
				label: 'Gruvbox داكن',
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
