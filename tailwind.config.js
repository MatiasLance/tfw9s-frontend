/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      colors: {
        'swd-blue': '#3981da',
        'swd-mblue': '#2b64a6',
        'swd-dblue': '#1e4573',
        'swd-grey': '#424242',
        'swd-red': '#fb0d2b',
        'swd-mred': '#e73538',
        'swd-dgrey': '#191919',
        'swd-midnight': '#121063',
        'swd-dred': '#8d0303',
        'swd-lgrey': '#efefef',
        'swd-mgrey': '#181818',
        'swd-slate': '#abb8c3',
        'swd-green': '#4cbe5c'
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
  variants: { extend: { visibility: [ 'group-hover' ] } },
  plugins: [ require('@tailwindcss/forms') ],
}
