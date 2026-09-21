export const SITE_URL = 'https://ol-car.com'

/**
 * トップページ用のWebSite・Organization構造化データを生成する
 *
 * @param description サイトの説明
 * @param language ページの言語
 * @returns JSON-LD
 */
export const getSiteJsonLd = (description: string, language: string) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'olcar（オルカー）',
      alternateName: 'olcar',
      description,
      inLanguage: language,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'olcar（オルカー）',
      alternateName: 'olcar',
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.webp`,
      },
      sameAs: [
        'https://twitter.com/byebye20201',
        'https://www.youtube.com/channel/UCPONUTjMWhfzaDcM3fzUk4Q',
        'https://www.tiktok.com/@olcar2021',
      ],
    },
  ],
})

/**
 * 車両詳細ページ用のProduct・Car・パンくず構造化データを生成する
 *
 * @param car 車両情報
 * @param pageUrl 車両詳細ページのURL
 * @returns JSON-LD
 */
export const getCarJsonLd = (car: Detail, pageUrl: string) => {
  const name = `${car.makerName} ${car.name}`
  const product = {
    '@type': ['Product', 'Car'],
    '@id': `${pageUrl}#car`,
    url: pageUrl,
    name,
    sku: String(car.id),
    category: '中古車',
    itemCondition: 'https://schema.org/UsedCondition',
    brand: {
      '@type': 'Brand',
      name: car.makerName,
    },
    model: car.name,
    ...(car.comment && { description: car.comment }),
    ...(car.images.length > 0 && { image: car.images }),
    ...(car.mileage !== null && {
      mileageFromOdometer: {
        '@type': 'QuantitativeValue',
        value: car.mileage,
        unitCode: 'KMT',
      },
    }),
    ...(car.price !== null && {
      offers: {
        '@type': 'Offer',
        url: pageUrl,
        price: car.price,
        priceCurrency: 'JPY',
        availability: car.posted ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/UsedCondition',
      },
    }),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      product,
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'olcar（オルカー）',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: car.makerName,
            item: `${SITE_URL}/${car.makerId}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name,
            item: pageUrl,
          },
        ],
      },
    ],
  }
}
