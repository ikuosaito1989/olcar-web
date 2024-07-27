/**
 *  クエリストリングの型
 */
export interface QueryString {
  page?: number
  keywords?: string[]
  makerIds?: number[]
  carNames?: string[]
  prefectures?: string[]
  socialTypes?: Social[]
  mileageFrom?: number | string | null
  mileageTo?: number | string | null
  priceFrom?: number | string | null
  priceTo?: number | string | null
  isVehicleInspection?: boolean
  priceOrder?: Sort
  mileageOrder?: Sort
  isSales?: boolean
}
