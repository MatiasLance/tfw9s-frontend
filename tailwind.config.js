/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    container: {
      center: true,
      padding: '1.75rem',
    },
    extend: {
      colors: {
        'brand-black': '#090909',
        'brand-yellow': '#ecbe13',
        'brand-blue': '#3981da',
        'brand-mblue': '#2b64a6',
        'brand-dblue': '#1e4573',
        'brand-grey': '#444444',
        'brand-grey-2': '#3C3C3C',
        'brand-red': '#fb0d2b',
        'brand-mred': '#e73538',
        'brand-dgrey': '#191919',
        'brand-midnight': '#121063',
        'brand-dred': '#8d0303',
        'brand-lgrey': '#6C6C6C',
        'brand-mgrey': '#4C4C4C',
        'brand-slate': '#abb8c3',
        'brand-green': '#4cbe5c',
      },
      maxHeight: {
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
      },
    },
  },
  variants: {
    lineClamp: [
      'responsive',
      'hover'
    ],
    extend: { visibility: [ 'group-hover' ] }
  },
  plugins: [
    require('@tailwindcss/typography')({ className: 'wysiwyg' }),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
