import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'ibm-plex': ['IBM Plex Sans', 'sans-serif'],
				'ibm-plex-mono': ['IBM Plex Mono', 'monospace'],
				'ibm-plex-condensed': ['IBM Plex Sans Condensed', 'sans-serif'],
				sans: ['IBM Plex Sans', 'sans-serif'],
			},
			fontSize: {
				'display': ['68px', { lineHeight: '92px', fontWeight: '700' }],
				'title-1': ['48px', { lineHeight: '100%', fontWeight: '600' }],
				'title-2': ['36px', { lineHeight: '100%', fontWeight: '600' }],
				'title-3': ['24px', { lineHeight: '100%', fontWeight: '600' }],
				'subtitle-1': ['16px', { lineHeight: '100%', fontWeight: '600' }],
				'body-1': ['14px', { lineHeight: '150%', fontWeight: '400' }],
				'caption-1': ['14px', { lineHeight: '100%', fontWeight: '600' }],
				'caption-2': ['12px', { lineHeight: '100%', fontWeight: '500' }],
			},		

			colors: {
				'bg-1': '#020b0d',
				'bg-2': '#242424', 
				'bg-3': '#404040',
				'fg-1': '#ffffff',
				'fg-2': '#bdbdbd',
				'fg-3': '#707070',
				'brand': '#fff84c'
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
