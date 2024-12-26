/* eslint-disable max-lines */
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { ofetch } from 'ofetch'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',

  app: {
    keepalive: true,
    head: {
      script:
        process.env.NODE_ENV === 'development'
          ? []
          : [
              {
                async: true,
                src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6167866428318160',
                crossorigin: 'anonymous',
                tagPosition: 'bodyClose',
              },
            ],
      meta: [
        { hid: 'charset', charset: 'utf-8' },
        { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
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

  nitro: {
    compressPublicAssets: true,
    minify: true,
    sourceMap: process.env.NODE_ENV === 'development',
    storage: {
      cache: {
        driver: 'lruCache',
        max: 1,
      },
    },
    devStorage: {
      cache: {
        driver: 'lruCache',
        max: 1,
      },
    },
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
    '@kgierke/nuxt-basic-auth',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],

  i18n: {
    lazy: true,
    defaultLocale: 'ja',
    locales: [
      { files: ['ja.json'], code: 'ja', language: 'ja-JP', name: '日本語' },
      { files: ['en.json'], code: 'en', language: 'en-US', name: 'English' },
    ],
    vueI18n: './i18n.config.ts',
    strategy: 'no_prefix',
  },

  runtimeConfig: {
    siteUrl: process.env.SITE_URL,
    slackHookUrl: process.env.SLACK_HOOK_URL,
    public: {
      apiKey: process.env.API_KEY,
      recaptcha: {
        v2SiteKey: process.env.RECAPTCHA_SITE_KEY,
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
    loadingStrategy: 'async',
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
    xsl: false,
    debug: process.env.NODE_ENV === 'development',
    urls: async () => {
      try {
        const apiFetch = ofetch.create({ baseURL: process.env.API_URL })
        const result = {
          cars: [],
          makers: [],
        } as Sitemap

        const func: Promise<globalThis.Sitemap>[] = []

        for (let i = 0; i < 8; i++) {
          const fetch = apiFetch<Sitemap>('/v1/sitemap', {
            query: {
              offset: i * 40000 + 1,
              limit: i * 40000 + 1 + 40000,
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

        return [
          ...makers,
          ...terms,
          ...names,
          ...prefectures,
          ...cars,
          ...info,
          ...features,
          ...post,
        ]
      } catch {
        return []
      }
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
    css: {
      preprocessorOptions: {
        // Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
        // のwarningを非表示にするためのオプション
        scss: {
          api: 'modern-compiler',
        },
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
  basicAuth: {
    enabled: true,
    users: [
      {
        username: process.env.BASIC_USER!,
        password: process.env.BASIC_PASS!,
      },
    ],
    allowedRoutes: ['^(?!.*managements).*$'],
  },
})
