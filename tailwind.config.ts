import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'dark'], // Defina temas que podem ser usados
	},
} satisfies Config;
