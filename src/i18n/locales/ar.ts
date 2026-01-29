/**
 * Locale messages for ar (Arabic)
 * @module
 */

import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

const TAGLINE = 'عداد الكلمات' as const;
const DESCRIPTION =
	'عداد الكلمات المفضل لديك في الوضع الداكن، الآن مع التدقيق النحوي!' as const;
const AUTO_LABEL = 'تلقائي' as const;

/**
 * Arabic locale strings for the entire application.
 *
 * Contains translations for site metadata, UI labels, messages, and all user-facing text.
 */
const messages: LocaleMessages = {
	site: {
		title: `${SITE.title} - ${TAGLINE}`,
		description: DESCRIPTION,
		longDescription: `${DESCRIPTION} قم بعد عدد الأحرف والكلمات والجمل والفقرات والأسطر في نصك على الفور باستخدام ${SITE.title}.`,
		features: ['عد الكلمات', 'عد الأحرف', 'إحصائيات الأحرف'],
		requirements: 'يتطلب متصفح ويب حديث',
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
			title: 'ملاحظة',
		},
		warning: {
			title: 'تحذير',
		},
		error: {
			title: 'خطأ',
		},
	},
	header: {
		label: `الصفحة الرئيسية لـ ${SITE.title}`,
	},
	input: {
		label: 'إدخال النص',
		placeholder: 'القطة البنية السريعة تقفز فوق الكلب الكسول...',
		largeInputWarning: {
			message:
				'لقد أدخلت كمية كبيرة من النص. قد يسبب هذا مشاكل في الأداء. هل تريد المتابعة؟\n\n(يمكنك تعطيل هذا التحذير في الخيارات.)',
		},
	},
	output: {
		placeholder: '-',
		map: {
			characters: {
				label: 'الأحرف',
			},
			words: {
				label: 'الكلمات',
			},
			sentences: {
				label: 'الجمل',
			},
			paragraphs: {
				label: 'الفقرات',
			},
			lines: {
				label: 'الأسطر',
			},
			spaces: {
				label: 'المسافات',
			},
			letters: {
				label: 'الحروف',
			},
			digits: {
				label: 'الأرقام',
			},
			punctuation: {
				label: 'علامات الترقيم',
			},
			symbols: {
				label: 'الرموز',
			},
		},
	},
	nav: {
		viewSource: {
			label: 'عرض الكود المصدري',
			tooltip: 'عرض الكود المصدري على GitHub',
		},
		reportIssue: {
			label: 'الإبلاغ عن مشكلة',
			tooltip: 'الإبلاغ عن مشكلة',
		},
		sponsor: {
			label: 'رعاية المشروع',
			tooltip: 'رعاية هذا المشروع',
		},
		moreProjects: {
			label: 'مشاريع أخرى',
			tooltip: 'عرض المزيد من مشاريعي',
		},
	},
	option: {
		locale: {
			title: 'اللغة',
		},
		general: {
			title: 'الخيارات',
			map: {
				rememberInputText: {
					label: 'تذكر نص الإدخال',
				},
				warnOnLargeInputText: {
					label: 'التحذير عند إدخال نص كبير',
				},
				enableLinting: {
					label: 'تمكين التدقيق النحوي',
				},
				enableDebugLogging: {
					label: 'تفعيل تسجيل التصحيح',
				},
			},
		},
		lintingRegion: {
			title: 'منطقة التدقيق النحوي',
			unsupportedWarning: {
				tooltip: 'التدقيق النحوي غير متاح لهذه اللغة',
			},
			map: {
				auto: {
					label: AUTO_LABEL,
				},
			},
		},
		theme: {
			title: 'الثيم',
			map: {
				auto: {
					label: AUTO_LABEL,
				},
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
	},
} as const satisfies LocaleMessages;

export default messages;
