/* Import modules. */
const colors = require('tailwindcss/colors')

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'blue-gray': colors.blueGray,
                cyan: colors.cyan,
                rose: colors.rose,
                sky: colors.sky,
                teal: colors.teal,
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
