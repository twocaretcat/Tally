/**
 * Locale messages for zh-CN (Simplified Chinese)
 * @module
 */

import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

const TAGLINE = '字数统计工具' as const;
const DESCRIPTION = '您最喜爱的深色模式字数统计工具，现拥有更多主题！' as const;

const messages: LocaleMessages = {
	site: {
		title: `${SITE.title} - ${TAGLINE}`,
		description: DESCRIPTION,
		longDescription: `${DESCRIPTION} 使用 ${SITE.title} 即时统计文本中的字符数、单词数、句子数、段落数和行数。`,
		features: ['单词计数', '字符计数', '字符统计'],
		requirements: '需要现代网页浏览器',
		keywords: [
			'字符计数器',
			'单词计数器',
			'句子计数器',
			'段落计数器',
			'行计数器',
			'文本分析',
			'文本分析器',
			'文本统计',
			'在线工具',
		],
	},
	icon: {
		license: {
			label: '许可证',
		},
		sponsorOnly: {
			label: '仅限赞助者',
		},
		experimental: {
			label: '实验性',
		},
	},
	alert: {
		note: {
			title: '备注',
		},
		error: {
			title: '错误',
		},
	},
	header: {
		label: `${SITE.title} 首页`,
	},
	input: {
		label: '文本输入',
		placeholder: '敏捷的棕色狐狸跳过了懒惰的狗...',
		largeInputWarning: {
			message:
				'您输入了大量文本，这可能会导致性能问题。是否要继续？\n\n（您可以在选项中禁用此警告。）',
		},
	},
	output: {
		placeholder: '-',
		map: {
			characters: {
				label: '字符',
			},
			words: {
				label: '单词',
			},
			sentences: {
				label: '句子',
			},
			paragraphs: {
				label: '段落',
			},
			lines: {
				label: '行数',
			},
			spaces: {
				label: '空格',
			},
			letters: {
				label: '字母',
			},
			digits: {
				label: '数字',
			},
			punctuation: {
				label: '标点符号',
			},
			symbols: {
				label: '符号',
			},
		},
	},
	nav: {
		viewSource: {
			label: '查看源码',
			tooltip: '在 GitHub 上查看源代码',
		},
		reportIssue: {
			label: '报告问题',
			tooltip: '报告问题',
		},
		sponsor: {
			label: '赞助我',
			tooltip: '赞助此项目',
		},
		moreProjects: {
			label: '更多项目',
			tooltip: '查看我的更多项目',
		},
	},
	locales: {
		title: '语言',
	},
	options: {
		title: '选项',
		map: {
			warnOnLargeInputText: {
				label: '大文本输入时警告',
			},
			rememberInputText: {
				label: '记住输入文本',
			},
			enableDebugLogging: {
				label: '启用调试日志',
			},
		},
	},
	themes: {
		title: '主题',
		map: {
			auto: {
				label: '自动',
			},
			amoled: {
				label: 'AMOLED',
			},
			light: {
				label: '浅色',
			},
			dark: {
				label: '深色',
			},
			teal: {
				label: '蓝绿色',
			},
			dusk: {
				label: '黄昏',
			},
			solarizedLight: {
				label: 'Solarized 浅色',
			},
			solarizedDark: {
				label: 'Solarized 深色',
			},
			gruvboxLight: {
				label: 'Gruvbox 浅色',
			},
			gruvboxDark: {
				label: 'Gruvbox 深色',
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
