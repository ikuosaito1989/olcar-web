import type { DetailBase } from "./detail_base";

/*
 * 車情報のサマリ
 */
export interface Summary {
  total: number;
  details: DetailBase[];
}
