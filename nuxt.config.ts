/* eslint-disable max-lines */
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { ofetch } from 'ofetch'

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
          content: process.env.SITE_URL,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${process.env.SITE_URL}/ogp.jpg`,
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
          content: `${process.env.SITE_URL}/ogp.jpg`,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: process.env.SITE_URL,
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
    '@nuxtjs/sitemap',
    'nuxt-gtag',
  ],

  runtimeConfig: {
    public: {
      recaptcha: {
        v2SiteKey: process.env.RECAPTCHA_SITE_KEY,
        v3SiteKey: 'YOUR_V3_SITEKEY_HERE',
      },
    },
  },

  routeRules: {
    '/api/**': {
      proxy: `${process.env.PROXY_URL}/**`,
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

  site: {
    url: process.env.SITE_URL,
  },

  sitemap: {
    cacheMaxAgeSeconds: 1000 * 60 * 1440, // @note 1日一回
    autoLastmod: true,
    exclude: ['/managements', '/maintenance'],
    experimentalWarmUp: true,
    experimentalCompression: true,
    urls: async () => {
      const apiFetch = ofetch.create({ baseURL: process.env.API_URL })
      const result = {
        cars: [],
        makers: [],
      } as Sitemap
      const func: Promise<globalThis.Sitemap>[] = []

      for (let i = 0; i < 6; i++) {
        const fetch = apiFetch<Sitemap>('/v1/sitemap', {
          query: {
            offset: i * 40000 + 1,
            limit: 40000,
          },
        })
        func.push(fetch)
      }

      const _sitemaps = Promise.all(func.map((v) => v))

      const makerIds = [...Array(50).keys()].map((i) => ++i)

      // @note 都道府県の車名
      // @note メーカー毎の車名
      const [_prefectures, _names] = await Promise.all([
        apiFetch<Prefecture[]>('/v1/prefecture'),
        apiFetch<CarName[]>('/v1/cars/names', {
          query: {
            'makerIds[]': makerIds,
          },
        }),
      ])

      const sitemaps = await _sitemaps
      sitemaps.forEach((v) => {
        result.cars.push(...v.cars)
        result.makers.push(...v.makers)
      })

      const names = [..._names.map((v) => `/?makerIds[]=${v.makerId}&carNames[]=${v.name}`)]
      const prefectures = [..._prefectures.map((v) => `/?prefectures[]=${v.name}`)]

      // @note メーカー
      const makers = result.makers.map((v) => `/${v}`)

      // @note 登録済みの車
      const cars = result.cars.map((v) => `/cars/${v}`)

      // @note 利用規約
      const terms = ['/terms/tos', '/terms/privacy', '/terms/transaction-law']

      // @note 記事
      const info = [
        '/info/caution',
        '/info/browser',
        '/info/exhibit',
        '/info/exhibit-free',
        '/info/purchase-process',
        '/info/contract-drafting',
        '/info/omakase-agent',
        '/info/line',
        '/info/needs-help',
        '/info/about',
      ]

      // 掲載
      const post = ['/post']

      // 掲載
      const features = ['/history', '/favorite']

      return [...makers, ...terms, ...names, ...prefectures, ...cars, ...info, ...features, ...post]
    },
    sitemaps: true,
    defaultSitemapsChunkSize: 10000,
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
