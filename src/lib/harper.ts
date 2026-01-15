/**
 * Available categories for lint rule classifications.
 *
 * Harper currently doesn't provide a way to get these dynamically so they must be hardcoded.
 *
 * These categories represent different types of writing issues that can be detected:
 * - Agreement: Subject-verb, pronoun-antecedent, or other grammatical agreement issues
 * - BoundaryError: Issues with word or sentence boundaries
 * - Capitalization: Incorrect letter casing
 * - Eggcorn: Words or phrases mistakenly used in place of similar-sounding correct ones
 * - Enhancement: Suggestions to improve writing quality
 * - Formatting: Document or text structure issues
 * - Grammar: General grammatical errors
 * - Malapropism: Incorrect word usage due to confusion with similar-sounding words
 * - Miscellaneous: Issues that don't fit other categories
 * - Nonstandard: Usage that deviates from standard language conventions
 * - Punctuation: Incorrect or missing punctuation marks
 * - Readability: Issues affecting text clarity or comprehension
 * - Redundancy: Unnecessary repetition or wordiness
 * - Regionalism: Region-specific language that may not be universally understood
 * - Repetition: Unintentional word or phrase repetition
 * - Spelling: Misspelled words
 * - Style: Stylistic preferences and conventions
 * - Typo: Typographical errors
 * - Usage: Incorrect word usage or idiom misuse
 * - WordChoice: Suboptimal word selection
 *
 * @constant
 * @readonly
 */
export const LINT_KINDS = [
	'Agreement',
	'BoundaryError',
	'Capitalization',
	'Eggcorn',
	'Enhancement',
	'Formatting',
	'Grammar',
	'Malapropism',
	'Miscellaneous',
	'Nonstandard',
	'Punctuation',
	'Readability',
	'Redundancy',
	'Regionalism',
	'Repetition',
	'Spelling',
	'Style',
	'Typo',
	'Usage',
	'WordChoice',
] as const;

/**
 * A union type representing any valid lint rule category.
 *
 * Harper currently doesn't provide a way to get these dynamically so they must be hardcoded.
 *
 * @example
 * const kind: LintKind = 'Grammar'; // Valid
 * const invalid: LintKind = 'InvalidKind'; // Type error
 */
export type LintKind = (typeof LINT_KINDS)[number];
