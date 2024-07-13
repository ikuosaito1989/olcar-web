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
            black: 'rgba(0, 0, 0, 0.7)',
            gray: '#d5d5d5',
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
      },
      VCheckbox: {
        color: 'primary',
      },
      VSelect: {
        variant: 'outlined',
      },
      VTextarea: {
        variant: 'outlined',
      },
    },
  })
  app.vueApp.use(vuetify)
})
