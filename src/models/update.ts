/*
  中古車情報を更新するためのインターフェース
*/
export interface Update {
  id: number
  name: string
  price: string | number | null
  mileage: string | number | null
  vehicleInspection: string | null
  unknownVehicleInspection: boolean
  comment: string
  makerName: string
  published: boolean
  isSponsor: boolean
}
