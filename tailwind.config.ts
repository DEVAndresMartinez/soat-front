/** @type {import('tailwindcss').Config} */

const config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#40DA88',
                secondary: '#24366D',
                background: '#109F4A',
            },
            fontFamily: {
            }
        },
    },
    plugins: [],
}

export default config;