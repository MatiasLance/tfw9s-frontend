import colors from 'vuetify/lib/util/colors'

export default {
  theme: {
    dark: false,
    themes: {
      light: {
        anchor: '#181818',
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
      dark: {
        primary: colors.red.base,
        test: colors.blue.base
      },
    }
  }
};