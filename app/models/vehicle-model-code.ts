/**
 * 車両型式マスタ
 */
export interface VehicleModelCode {
  /**
   * 車両型式マスタID
   */
  id: number

  /**
   * 車両型式
   */
  code: string

  /**
   * 関連する車名
   */
  carNames?: string[]
}
