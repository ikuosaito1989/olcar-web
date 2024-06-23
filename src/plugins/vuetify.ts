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
          },
        },
      },
    },
    defaults: {
      VBtn: {
        color: 'primary',
        variant: 'outlined',
      },
    },
  })
  app.vueApp.use(vuetify)
})
