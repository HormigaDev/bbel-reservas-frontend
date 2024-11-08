import type { Config } from 'tailwindcss';

const shadow = '0 0 12px ';
const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                burgundy: '#800020',
                burgunlight: '#aa0030',
                champagne: '#f7e7ce',
                copper: '#b87333',
                greygrey: '#333333',
                greydark: '#222222',
                gold: '#d4af37',
                marfil: '#faf3e0',
                purewhite: '#fafafa',
                burgundylight: '#9b2a45',
                champagnelight: '#f9f0d3',
                copperlight: '#d8915d',
                greygreylight: '#4d4d4d',
                greydarklight: '#404040',
                goldlight: '#e4c26a',
                marfillight: '#fdf7e3',
                purewhitelight: '#ffffff',
            },
            boxShadow: {
                burgundy: shadow + '#800020',
                burgunlight: shadow + '#aa0030',
                champagne: shadow + '#f7e7ce',
                copper: shadow + '#b87333',
                greygrey: shadow + '#333333',
                greydark: shadow + '#222222',
                gold: shadow + '#d4af37',
                marfil: shadow + '#faf3e0',
                purewhite: shadow + '#fafafa',
            },
        },
    },
    plugins: [],
};
export default config;
