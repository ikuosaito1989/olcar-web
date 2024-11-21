/**
 *  管理画面のフォームデータ
 */
export interface ManagementsEdit {
  /**
   * 車名
   */
  carName: string

  /**
   * メーカー
   */
  makers: Item[]

  /**
   * 商品説明
   */
  description: string

  /**
   * 値段
   */
  price: string

  /**
   * リンク
   */
  link: string

  /**
   * 走行距離
   */
  mileage: string

  /**
   * スポンサー
   */
  isSponsor: boolean

  /**
   * 車検
   */
  vehicleInspection: string
}
