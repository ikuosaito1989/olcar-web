import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    keepalive: false,
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
      style: [
        {
          /**
           * Vuetify v4 / Tailwind CSS v4 はどちらも CSS カスケードレイヤーを使う。
           * Nuxt がインライン展開するコンポーネントスタイルが先に vuetify-components を
           * 宣言すると読み込み順で優先度が変わってしまうため、最優先で順序を固定する。
           */
          children:
            '@layer properties, theme, base, components, utilities, vuetify-core, vuetify-components, vuetify-overrides, vuetify-utilities, app-overrides;',
          tagPriority: -100,
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
    externals: {
      inline: ['vue', 'vue-router', '@vue/*'],
    },
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

  css: ['~/css/tailwind.css', '~/css/vuetify-compat.css'],

  modules: [
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
    '@nuxt/scripts',
    'nuxt-gtag',
    '@kgierke/nuxt-basic-auth',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/turnstile',
  ],

  i18n: {
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
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRET_KEY,
    },
    public: {
      apiKey: process.env.API_KEY,
      turnstile: {
        siteKey: process.env.TURNSTILE_SITE_KEY,
      },
    },
  },

  routeRules: {
    '/api/**': {
      proxy: `${process.env.PROXY_URL}/**`,
    },
    '/sitemaps/**': {
      proxy: 'https://storage.googleapis.com/olcar_images/**',
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
        file: fileURLToPath(new URL('./app/pages/index.vue', import.meta.url)),
      })

      pages.push({
        name: 'terms-id',
        path: '/terms/:id',
        file: fileURLToPath(new URL('./app/pages/info/[id].vue', import.meta.url)),
      })
    },
  },

  gtag: {
    id: process.env.GTAG,
    loadingStrategy: 'async',
  },

  turnstile: {
    siteKey: process.env.TURNSTILE_SITE_KEY,
  },

  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
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
