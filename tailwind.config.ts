import type { Config } from 'tailwindcss';

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
            },
        },
    },
    plugins: [],
};
export default config;
