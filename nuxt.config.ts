import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',

  app: {
    head: {
      title: '格安な中古車、車の個人売買なら【olcar（オルカー）】',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { hid: 'charset', charset: 'utf-8' },
        { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: `格安な中古車、車の個人売買を集めた中古車情報サイト、olcar（オルカー）です。個人売買を中心とした中古車情報を集め、従来の中古車情報サイトの価格より安い値段の車が勢揃いしています！`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '中古車,中古車販売,中古車情報,中古車検索,中古自動車,車選び,',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: '格安な中古車、車の個人売買なら【olcar（オルカー）】',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://ol-car.com',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://ol-car.com/ogp.jpg',
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'olcar（オルカー）',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `格安な中古車、車の個人売買を集めた中古車情報サイト、olcar（オルカー）です。個人売買を中心とした中古車情報を集め、従来の中古車情報サイトの価格より安い値段の車が勢揃いしています！`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: '格安な中古車、車の個人売買なら【olcar（オルカー）】',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `格安な中古車、車の個人売買を集めた中古車情報サイト、olcar（オルカー）です。個人売買を中心とした中古車情報を集め、従来の中古車情報サイトの価格より安い値段の車が勢揃いしています！格安な中古車、車の個人売買を集めた中古車情報サイト、olcar（オルカー）です。個人売買を中心とした中古車情報を集め、従来の中古車情報サイトの価格より安い値段の車が勢揃いしています！`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://ol-car.com/ogp.jpg',
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: 'https://ol-car.com',
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'noarchive',
        },
        { name: 'theme-color', content: '#ffac42' },
        { name: 'apple-mobile-web-app-status-bar-style', content: '#ffac42' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    'vue-recaptcha/nuxt',
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
      recaptcha: {
        v2SiteKey: '6LeF3WEdAAAAAElYIkssJ_U8bBPE40OwQEs-U6pZ',
        v3SiteKey: 'YOUR_V3_SITEKEY_HERE',
      },
    },
  },

  routeRules: {
    '/api/**': {
      proxy: 'https://sample-docker-image-z2l33kyvbq-an.a.run.app/**',
    },
  },

  hooks: {
    /**
     * 独自のルーティングを設定する
     */
    'pages:extend'(pages) {
      pages.push({
        name: 'index-makerId',
        path: '/:makerId',
        file: '~/pages/index.vue',
      })

      pages.push({
        name: 'terms-id',
        path: '/terms/:id',
        file: '~/pages/info/[id].vue',
      })
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

  compatibilityDate: '2024-07-10',
})
