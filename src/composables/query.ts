/* eslint-disable @typescript-eslint/no-explicit-any */
import queryString from 'query-string'

/**
 * queryを管理するオブジェクト
 */
const queryObject = ref<QueryObject>({
  text: '',
  keywords: [],
  carNames: [],
  makers: [],
  prefectureNames: [],
  socialTypes: [],
})

/**
 * queryからqueryObjectを生成する
 *
 * @param query route.query
 */
const useSetFromQuery = (query: any) => {
  /**
   * keyからKeyLabelを取得する
   * @param key
   * @returns adf
   */
  const getKeyLabel = (key: 'mileageFrom' | 'mileageTo' | 'priceFrom' | 'priceTo') => {
    const data = key.includes('mileage') ? Constants.MILEAGES : Constants.PRICES
    return {
      key: query[key]?.toString(),
      label: data.find((v) => v.key?.toString() === query[key])?.label,
    }
  }

  queryObject.value = {
    keywords: queryUtil.toArrayQuery(query['keywords[]']),
    carNames: queryUtil.toArrayQuery(query['carNames[]']).map((v) => ({
      title: v,
      value: '',
    })),
    prefectureNames: queryUtil.toArrayQuery(query['prefectures[]']).map((v) => ({
      title: v,
      value: '',
    })),
    makers: queryUtil.toArrayQuery(query['makerIds[]']).map((v) => ({
      title: Constants.MAKERS.filter((v) => v.key === v.key)[0].value,
      value: v,
    })),
    socialTypes: queryUtil.toArrayQuery(query['socialTypes[]']).map((v) => +v as Social),
    isSponsor: !!query.isSponsor,
    isSales: !!query.isSales,
    mileageFrom: getKeyLabel('mileageFrom'),
    mileageTo: getKeyLabel('mileageTo'),
    priceFrom: getKeyLabel('priceFrom'),
    priceTo: getKeyLabel('priceTo'),
    isVehicleInspection: query.isVehicleInspection === 'true',
    priceOrder: query.priceOrder,
    mileageOrder: query.mileageOrder,
    text: queryUtil.toArrayQuery(query['keywords[]']).join(' '),
  }
}

/**
 * queryObjectから表示用の検索条件を取得する
 */
const useGetSearchConditions = (): string[] => {
  const searchConditions: string[] = []
  const obj = queryObject.value
  if (obj.keywords.length) {
    searchConditions.push(...queryObject.value.keywords)
  }

  if (queryObject.value.makers.length) {
    const makers = Constants.MAKERS.filter(
      (v) => !!queryObject.value.makers.find((item) => item.value == v.key),
    )
    searchConditions.push(...makers.map((v) => v.value))
  }

  if (obj.carNames.length) {
    searchConditions.push(...obj.carNames.map((v) => v.title))
  }

  if (obj.prefectureNames.length) {
    searchConditions.push(...obj.prefectureNames.map((v) => v.title))
  }

  if (obj.socialTypes.length) {
    const socialNames = new Map<Social, string>([
      [1, 'X（旧Twitter）'],
      [2, 'ジモティー'],
      [3, 'ヤフオク'],
      [4, 'ラクマ'],
      [5, 'メルカリ'],
    ])
    const socials = obj.socialTypes.map((s) => {
      return socialNames.get(s) as string
    })
    searchConditions.push(...socials)
  }

  if (obj.mileageFrom?.key) {
    searchConditions.push(`${formatUtil.toMileage(obj.mileageFrom.key, 0)}以上`)
  }

  if (obj.mileageTo?.key) {
    searchConditions.push(`${formatUtil.toMileage(+obj.mileageTo.key, 0)}以下`)
  }

  if (obj.priceFrom?.key) {
    searchConditions.push(`${formatUtil.toTenThousand(obj.priceFrom.key, 0)}万円以上`)
  }

  if (obj.priceTo?.key) {
    searchConditions.push(`${formatUtil.toTenThousand(obj.priceTo.key, 0)}万円以下`)
  }

  if (obj.isVehicleInspection) {
    searchConditions.push(`車検あり`)
  }

  if (obj.priceOrder) {
    searchConditions.push(obj.priceOrder === 'asc' ? '価格が安い順' : '価格が高い順')
  }

  if (obj.mileageOrder) {
    searchConditions.push(obj.mileageOrder === 'asc' ? '走行距離が少ない順' : '走行距離が多い順')
  }

  return searchConditions
}

/**
 * queryObjectからqueryStringを取得する
 */
const useQueryString = () => {
  const obj = queryObject.value
  const query: QueryString = {
    page: obj.page,
    socialTypes: obj.socialTypes,
    isVehicleInspection: obj.isVehicleInspection,
    // eslint-disable-next-line no-irregular-whitespace
    keywords: obj.text ? obj.text.split(/ |　/g) : [],
    carNames: obj.carNames.map((v) => v.title),
    makerIds: obj.makers.map((v) => +v.value),
    prefectureNames: obj.prefectureNames.map((v) => v.title.toString()),
    mileageFrom: obj.mileageFrom?.key,
    mileageTo: obj.mileageTo?.key,
    priceFrom: obj.priceFrom?.key,
    priceTo: obj.priceTo?.key,
  }
  // @todo arrayFormatはどうするか考える
  return '?' + queryString.stringify(query, { arrayFormat: 'bracket' })
}

/**
 * queryObjectをリセットする
 */
const useReset = () => {
  queryObject.value = {
    text: '',
    keywords: [],
    carNames: [],
    makers: [],
    prefectureNames: [],
    socialTypes: [],
    page: undefined,
    mileageFrom: undefined,
    mileageTo: undefined,
    priceFrom: undefined,
    priceTo: undefined,
    isVehicleInspection: undefined,
  }
}

export { queryObject, useQueryString, useReset, useSetFromQuery, useGetSearchConditions }
