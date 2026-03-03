/*
 * 車情報のサマリ
 */
export interface Summary {
  totalCount: number
  allCount: number
  isEnd: boolean
  details: DetailBase[]
}
