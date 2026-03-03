import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#f67b01',
            secondary: '#bc4c00',
            white: 'rgba(255, 255, 255, 0.7)',
            black: 'rgba(0, 0, 0, 0.7)',
            gray: '#d5d5d5',
            error: '#ff5252',
          },
        },
      },
    },
    defaults: {
      VBtn: {
        color: 'primary',
        variant: 'outlined',
      },
      VChip: {
        color: 'primary',
        variant: 'outlined',
        label: true,
        size: 'small',
      },
      VAlert: {
        variant: 'outlined',
      },
      VTextField: {
        variant: 'outlined',
        color: 'primary',
      },
      VCheckbox: {
        color: 'primary',
      },
      VSelect: {
        color: 'primary',
        variant: 'outlined',
      },
      VTextarea: {
        color: 'primary',
        variant: 'outlined',
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })
  app.vueApp.use(vuetify)
})
