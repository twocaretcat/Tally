/**
 * Locale messages for fr-FR (French)
 * @module
 */

import { SITE } from '@config/site';
import type { LocaleMessages } from '../types.ts';

const TAGLINE = 'Compteur de mots' as const;
const DESCRIPTION =
	'Votre compteur de mots préféré en mode sombre, désormais avec encore plus de thèmes !' as const;

const messages: LocaleMessages = {
	site: {
		title: `${SITE.title} - ${TAGLINE}`,
		description: DESCRIPTION,
		longDescription: `${DESCRIPTION} Comptez instantanément le nombre de caractères, mots, phrases, paragraphes et lignes dans votre texte avec ${SITE.title}.`,
		features: [
			'Comptage de mots',
			'Comptage de caractères',
			'Statistiques de caractères',
		],
		requirements: 'Nécessite un navigateur web moderne',
		keywords: [
			'compteur de caractères',
			'compteur de mots',
			'compteur de phrases',
			'compteur de paragraphes',
			'compteur de lignes',
			'analyse de texte',
			'analyseur de texte',
			'statistiques de texte',
			'outil en ligne',
		],
	},
	icon: {
		license: {
			label: 'Licence',
		},
		sponsorOnly: {
			label: 'Réservé aux sponsors',
		},
		experimental: {
			label: 'Expérimental',
		},
	},
	alert: {
		note: {
			title: 'Remarque',
		},
		warning: {
			title: 'Avertissement',
		},
		error: {
			title: 'Erreur',
		},
	},
	header: {
		label: `Page d'accueil de ${SITE.title}`,
	},
	input: {
		label: 'Zone de texte',
		placeholder: 'Le rapide chat brun saute par-dessus le chien paresseux...',
		largeInputWarning: {
			message:
				'Vous avez saisi une grande quantité de texte. Cela peut provoquer des problèmes de performance. Voulez-vous continuer ?\n\n(Vous pouvez désactiver cet avertissement dans les options.)',
		},
	},
	output: {
		placeholder: '-',
		map: {
			characters: {
				label: 'Caractères',
			},
			words: {
				label: 'Mots',
			},
			sentences: {
				label: 'Phrases',
			},
			paragraphs: {
				label: 'Paragraphes',
			},
			lines: {
				label: 'Lignes',
			},
			spaces: {
				label: 'Espaces',
			},
			letters: {
				label: 'Lettres',
			},
			digits: {
				label: 'Chiffres',
			},
			punctuation: {
				label: 'Ponctuation',
			},
			symbols: {
				label: 'Symboles',
			},
		},
	},
	nav: {
		viewSource: {
			label: 'Voir le code',
			tooltip: 'Voir le code source sur GitHub',
		},
		reportIssue: {
			label: 'Signaler un problème',
			tooltip: 'Signaler un problème',
		},
		sponsor: {
			label: 'Me sponsoriser',
			tooltip: 'Sponsoriser ce projet',
		},
		moreProjects: {
			label: 'Plus de projets',
			tooltip: 'Voir d’autres projets de ma part',
		},
	},
	locales: {
		title: 'Langue',
	},
	options: {
		title: 'Options',
		map: {
			rememberInputText: {
				label: 'Se souvenir du texte saisi',
			},
			warnOnLargeInputText: {
				label: "Avertir en cas d'entrée volumineuse",
			},
			enableDebugLogging: {
				label: 'Activer les logs de débogage',
			},
		},
	},
	themes: {
		title: 'Thème',
		map: {
			auto: {
				label: 'Automatique',
			},
			amoled: {
				label: 'AMOLED',
			},
			light: {
				label: 'Clair',
			},
			dark: {
				label: 'Sombre',
			},
			teal: {
				label: 'Sarcelle',
			},
			dusk: {
				label: 'Crépuscule',
			},
			solarizedLight: {
				label: 'Solarized Clair',
			},
			solarizedDark: {
				label: 'Solarized Sombre',
			},
			gruvboxLight: {
				label: 'Gruvbox Clair',
			},
			gruvboxDark: {
				label: 'Gruvbox Sombre',
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
