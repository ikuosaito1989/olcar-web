/**
 *  クエリストリングオブジェクトの型
 */
export interface QueryObject {
  page?: number
  text: string
  keywords: string[]
  makers: Item[]
  carNames: Item[]
  prefectures: Item[]
  socialTypes: Social[]
  mileageFrom?: KeyLabel
  mileageTo?: KeyLabel
  priceFrom?: KeyLabel
  priceTo?: KeyLabel
  isVehicleInspection?: boolean
  isSponsor?: boolean
  isSales?: boolean
  priceOrder?: Sort
  mileageOrder?: Sort
}
