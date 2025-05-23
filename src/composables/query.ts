/* eslint-disable @typescript-eslint/no-explicit-any */
import queryString from 'query-string'

const SOCIAL_TYPE = Object.values(Constants.SOCIAL_TYPE)
  .filter((v) => v !== Constants.SOCIAL_TYPE.Contact)
  .map((v) => v)

/**
 * queryを管理するオブジェクト
 */
const queryObject = ref<QueryObject>({
  text: '',
  keywords: [],
  carNames: [],
  makers: [],
  prefectures: [],
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
    const data = key.includes('mileage')
      ? useTranslateKeyLabelToI18n(Constants.MILEAGES)
      : useTranslateKeyLabelToI18n(Constants.PRICES)
    return {
      key: query[key]?.toString(),
      label: data.find((v) => v.key?.toString() === query[key])?.label,
    }
  }

  queryObject.value = {
    page: query.page ? +query.page : undefined,
    keywords: queryUtil.toArrayQuery(query['keywords[]']),
    carNames: queryUtil.toArrayQuery(query['carNames[]']).map((v) => ({
      title: v,
      value: '',
    })),
    prefectures: queryUtil.toArrayQuery(query['prefectures[]']).map((v) => ({
      title: v,
      value: '',
    })),
    makers: queryUtil
      .toArrayQuery(query['makerIds[]'])
      .map((q) => ({
        title: Constants.MAKERS.find((m) => +q === m.key)?.value as string,
        value: q,
      }))
      .filter((v) => !!v.title),
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
    lastCarId: query.lastCarId ? +query.lastCarId : undefined,
    isNext: query.isNext,
  }
}

/**
 * 検索時のデフォルトのソーシャルタイプ
 *
 * * @param query route.query
 */
const useSearchSocialType = (query: any) => {
  if (!query['socialTypes[]']) {
    queryObject.value.socialTypes = SOCIAL_TYPE
  }
}
/**
 * queryObjectから表示用の検索条件を取得する
 */
const useGetSearchConditions = (): string[] => {
  const { t } = useI18n()
  const searchConditions: string[] = []
  const obj = queryObject.value
  if (obj.keywords.length) {
    arrayUtil.push(searchConditions, queryObject.value.keywords)
  }

  if (queryObject.value.makers.length) {
    const makers = Constants.MAKERS.filter(
      (v) => !!queryObject.value.makers.find((item) => item.value == v.key),
    )
    arrayUtil.push(
      searchConditions,
      makers.map((v) => v.value),
    )
  }

  if (obj.carNames.length) {
    arrayUtil.push(
      searchConditions,
      obj.carNames.map((v) => v.title),
    )
  }

  if (obj.prefectures.length) {
    arrayUtil.push(
      searchConditions,
      obj.prefectures.map((v) => v.title),
    )
  }

  if (obj.socialTypes.length) {
    const socialNames = new Map<Social, string>([
      [1, 'X（旧Twitter）'],
      [2, 'ジモティー'],
      [3, 'ヤフオク'],
      [4, 'ラクマ'],
      [5, 'メルカリ'],
    ])
    const socials = obj.socialTypes.map((s) => socialNames.get(s) as string)
    arrayUtil.push(searchConditions, socials)
  }

  if (obj.mileageFrom?.key) {
    arrayUtil.push(searchConditions, [
      `${formatUtil.toMileage(obj.mileageFrom.key, 0, t('ten_thousand_km'))}以上`,
    ])
  }

  if (obj.mileageTo?.key) {
    arrayUtil.push(searchConditions, [
      `${formatUtil.toMileage(+obj.mileageTo.key, 0, t('ten_thousand_km'))}以下`,
    ])
  }

  if (obj.priceFrom?.key) {
    arrayUtil.push(searchConditions, [`${formatUtil.toTenThousand(obj.priceFrom.key, 0)}万円以上`])
  }

  if (obj.priceTo?.key) {
    arrayUtil.push(searchConditions, [`${formatUtil.toTenThousand(obj.priceTo.key, 0)}万円以下`])
  }

  if (obj.isVehicleInspection) {
    arrayUtil.push(searchConditions, ['車検あり'])
  }

  if (obj.isSponsor) {
    arrayUtil.push(searchConditions, ['オススメ'])
  }

  if (obj.priceOrder) {
    arrayUtil.push(searchConditions, [obj.priceOrder === 'asc' ? '価格が安い順' : '価格が高い順'])
  }

  if (obj.mileageOrder) {
    arrayUtil.push(searchConditions, [
      obj.mileageOrder === 'asc' ? '走行距離が少ない順' : '走行距離が多い順',
    ])
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
    socialTypes: obj.socialTypes.length === SOCIAL_TYPE.length ? [] : obj.socialTypes,
    isVehicleInspection: obj.isVehicleInspection || undefined,
    // eslint-disable-next-line no-irregular-whitespace
    keywords: obj.text ? obj.text.split(/ |　/g).filter((v) => v) : [],
    carNames: obj.carNames.map((v) => v.title),
    makerIds: obj.makers.map((v) => +v.value),
    prefectures: obj.prefectures.map((v) => v.title.toString()),
    mileageFrom: obj.mileageFrom?.key,
    mileageTo: obj.mileageTo?.key,
    priceFrom: obj.priceFrom?.key,
    priceTo: obj.priceTo?.key,
    priceOrder: obj.priceOrder,
    mileageOrder: obj.mileageOrder,
    isSales: obj.isSales,
    isSponsor: obj.isSponsor,
    lastCarId: obj.lastCarId,
    isNext: obj.isNext,
  }

  if (!query.isSales) {
    delete query.isSales
  }

  if (!query.isSponsor) {
    delete query.isSponsor
  }

  const _queryString = queryString.stringify(query, { arrayFormat: 'bracket' })
  return _queryString ? `?${_queryString}` : ''
}

/**
 * ソートをリセットする
 */
const useOrderReset = () => {
  queryObject.value.priceOrder = undefined
  queryObject.value.mileageOrder = undefined
  usePageReset()
}

/**
 * ページ関連のデータをリセットする
 */
const usePageReset = () => {
  queryObject.value.page = undefined
  queryObject.value.lastCarId = undefined
  queryObject.value.isNext = undefined
}

/**
 * isSalesをリセットする
 */
const useIsSalesReset = () => {
  queryObject.value.isSales = undefined
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
    prefectures: [],
    socialTypes: [],
    page: undefined,
    mileageFrom: undefined,
    mileageTo: undefined,
    priceFrom: undefined,
    priceTo: undefined,
    isVehicleInspection: undefined,
    priceOrder: undefined,
    mileageOrder: undefined,
    lastCarId: undefined,
    isNext: undefined,
  }
}

export {
  queryObject,
  useQueryString,
  useReset,
  useOrderReset,
  useIsSalesReset,
  usePageReset,
  useSetFromQuery,
  useGetSearchConditions,
  useSearchSocialType,
}
