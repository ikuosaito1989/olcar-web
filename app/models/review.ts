/*
 * 中古車情報を申請するためのインターフェース
 */
export interface Review {
  name: string
  makerId: number
  files: File[]
  comment: string
  price: number | null
  nickName: string
  referenceUrls: string[]
  email: string
  mileage: number | null
  vehicleInspection: string | null
  prefecture: string
  locality: string
}
