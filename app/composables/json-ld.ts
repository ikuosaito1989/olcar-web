import { getCarJsonLd, getSiteJsonLd, SITE_URL } from '~/lib/json-ld'

/**
 * JSON-LDをheadへ追加する
 *
 * @param key script要素を識別するキー
 * @param data 構造化データ
 */
const useJsonLd = (key: string, data: object) => {
  useHead({
    script: [
      {
        key,
        type: 'application/ld+json',
        textContent: data,
      },
    ],
  })
}

/**
 * トップページ用の構造化データをheadへ追加する
 */
export const useSiteJsonLd = () => {
  const { localeProperties, t } = useI18n()
  const description = t('description_used_car_site').replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')

  useJsonLd('site-json-ld', getSiteJsonLd(description, localeProperties.value.language))
}

/**
 * 車両詳細ページ用の構造化データをheadへ追加する
 *
 * @param car 車両情報
 * @param id URLに使用する車両ID
 */
export const useCarJsonLd = (car: Detail, id: string | string[]) => {
  const pageUrl = `${SITE_URL}/cars/${encodeURIComponent(String(id))}`
  useJsonLd('car-json-ld', getCarJsonLd(car, pageUrl))
}
