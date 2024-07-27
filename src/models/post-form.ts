/**
 *  掲載依頼するページのフォームデータ
 */
export interface PostEdit {
  /**
   * 車名
   */
  carName: string

  /**
   * メーカー
   */
  makers: Item[]

  /**
   * 都道府県
   */
  prefectures: Item[]

  /**
   * 市区町村
   */
  locality: string

  /**
   * ファイル
   */
  files: FileUpload[]

  /**
   * 商品説明
   */
  description: string

  /**
   * 値段
   */
  price: string

  /**
   * ユーザー名
   */
  userName: string

  /**
   * リンク
   */
  link: string

  /**
   * メールアドレス
   */
  email: string

  /**
   * 走行距離
   */
  mileage: string

  /**
   * 車検年月
   */
  vehicleInspection: {
    year?: KeyLabel
    month?: KeyLabel
  }

  /**
   * Recaptcha
   */
  recaptcha?: string
}
