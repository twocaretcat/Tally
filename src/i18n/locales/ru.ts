/**
 * Locale messages for ru-RU (Russian)
 * @module
 */

import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

const TAGLINE = 'Счётчик слов' as const;
const DESCRIPTION =
  'Ваш любимый счётчик слов в тёмном режиме, теперь с ещё большим количеством тем!' as const;

const messages: LocaleMessages = {
  site: {
    title: `${SITE.title} - ${TAGLINE}`,
    description: DESCRIPTION,
    longDescription: `${DESCRIPTION} Подсчитайте количество символов, слов, предложений, абзацев и строк в тексте мгновенно с помощью ${SITE.title}.`,
    features: ['Подсчёт слов', 'Подсчёт символов', 'Статистика символов'],
    requirements: 'Требуется современный веб-браузер',
    keywords: [
      'счётчик символов',
      'счётчик слов',
      'счётчик предложений',
      'счётчик параграфов',
      'счётчик строк',
      'text analysis',
      'text analyzer',
      'text statistics',
      'онлайн инструмент',
    ],
  },
  alert: {
    note: {
      title: 'Примечание',
    },
    error: {
      title: 'Ошибка',
    },
  },
  header: {
    label: `Домашняя страница ${SITE.title}`,
  },
  input: {
    label: 'Ввод текста',
    placeholder: 'Шустрая бурая лисица прыгает через ленивого пса...',
    largeInputWarning: {
      message:
        'Вы ввели огромное количество текста. Это может вызвать проблемы с производительностью. Вы хотите продолжить?\n\n(Вы можете отключить это предупреждение в настройках)',
    },
  },
  output: {
    placeholder: '0',
    map: {
      characters: {
        label: 'Символы',
      },
      words: {
        label: 'Слова',
      },
      sentences: {
        label: 'Предложения',
      },
      paragraphs: {
        label: 'Абзацы',
      },
      lines: {
        label: 'Строки',
      },
      spaces: {
        label: 'Пробелы',
      },
      letters: {
        label: 'Буквы',
      },
      digits: {
        label: 'Цифры',
      },
      punctuation: {
        label: 'Знаки препинания',
      },
      symbols: {
        label: 'Специальные символы',
      },
    },
  },
  nav: {
    viewSource: {
      label: 'Исходный код',
      tooltip: 'Посмотреть исходный код на GitHub',
    },
    reportIssue: {
      label: 'Сообщить о проблеме',
      tooltip: 'Сообщить о проблеме',
    },
    sponsor: {
      label: 'Спонсировать меня',
      tooltip: 'Поддержать этот проект',
    },
    moreProjects: {
      label: 'Больше проектов',
      tooltip: 'Посмотреть больше моих проектов',
    },
  },
  locales: {
    title: 'Язык',
  },
  options: {
    title: 'Настройки',
    map: {
      warnOnLargeInputText: {
        label: 'Предупреждать при вводе большого количества текста',
      },
      rememberInputText: {
        label: 'Запоминать введённый текст',
      },
      enableDebugLogging: {
        label: 'Включить ведение журнала отладки',
      },
    },
  },
  themes: {
    title: 'Тема',
    map: {
      auto: {
        label: 'Авто',
      },
      amoled: {
        label: 'AMOLED',
      },
      light: {
        label: 'Светлая',
      },
      dark: {
        label: 'Тёмная',
      },
      teal: {
        label: 'Бирюзовый',
      },
      dusk: {
        label: 'Сумерки',
      },
      solarizedLight: {
        label: 'Solarized Светлая',
      },
      solarizedDark: {
        label: 'Solarized Тёмная',
      },
      gruvboxLight: {
        label: 'Gruvbox Светлая',
      },
      gruvboxDark: {
        label: 'Gruvbox Тёмная',
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
