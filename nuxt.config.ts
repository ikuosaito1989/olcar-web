import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(
          vuetify({
            autoImport: true,
          }),
        )
      })
    },
    'nuxt-simple-sitemap',
    'nuxt-gtag',
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  routeRules: {
    '/api/**': {
      proxy: 'https://sample-docker-image-z2l33kyvbq-an.a.run.app/**',
    },
  },
  gtag: {
    id: process.env.GTAG,
  },
  sitemap: {
    urls: [
      {
        url: process.env.HOST,
        lastmod: '2024-03-06',
        priority: 1.0,
        loc: '',
      },
    ],
    xsl: false,
  },
  devtools: { enabled: true },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  imports: {
    dirs: ['models/**', 'config/**'],
  },
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: true,
    },
  ],
  tailwindcss: {
    // Options
  },
})
