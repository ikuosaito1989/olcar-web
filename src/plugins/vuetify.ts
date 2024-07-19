// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

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
  })
  app.vueApp.use(vuetify)
})
