/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	astroAllowShorthand: true,
	useTabs: true,
	tabWidth: 2,
	singleQuote: true,
	plugins: ['prettier-plugin-astro', 'prettier-plugin-astro-organize-imports'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
		{
			files: '*.svg',
			options: {
				parser: 'html',
			},
		},
	],
};

export default config;
