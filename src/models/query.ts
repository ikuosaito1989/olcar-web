/**
 *  クエリストリングの型
 */
export interface Query {
  page?: number
  keywords?: string[]
  makerIds?: number[]
  carNames?: string[]
  prefectureNames?: string[]
  socialTypes?: Social[]
  mileageFrom?: KeyLabel
  mileageTo?: KeyLabel
  priceFrom?: KeyLabel
  priceTo?: KeyLabel
  isVehicleInspection?: boolean
}
