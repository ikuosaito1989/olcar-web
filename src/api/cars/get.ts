/**
 * 車情報を取得する
 */
export async function useFetchCars() {
  return await useFetchi<Summary>("/api/v1/cars");
}
