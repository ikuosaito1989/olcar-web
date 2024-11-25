const useSeo =
  /**
   *
   * @param title
   * @param description
   * @param image
   * @param type
   * @param twitterCard
   * @param isNoIndex
   * @returns
   */
  (
    titleName?: string,
    description?: string,
    image: string = 'https://ol-car.com/ogp.webp',
    type: string = 'website',
    twitterCard: string = 'summary',
    isNoIndex: boolean = false,
  ) => {
    const { t } = useI18n()
    const title = titleName
      ? `${titleName} | ${t('title')}`
      : t('headTitle').replace(/<("[^"]*"|'[^']*'|[^'">]|)*>/g, '')
    const keywords = t('content_used_car_keywords')

    description =
      description ?? t('description_used_car_site').replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')

    return {
      title: title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: keywords,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: type,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://ol-car.com',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: image,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: twitterCard,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: 'https://ol-car.com',
        },
        {
          hid: 'robots',
          name: 'robots',
          content: isNoIndex ? 'noindex' : 'noarchive',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  }

export { useSeo }
