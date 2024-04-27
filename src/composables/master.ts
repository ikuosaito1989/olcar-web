/**
 * マスタ系のAPIを整形して返す
 */
const useFetchMaster = async (): Promise<{ prefectureItems: Item[]; makerItems: Item[] }> => {
  const [{ data: _prefectures }, { data: _makers }] = await Promise.all([
    useFetchi<Prefecture[]>(`/api/v1/prefecture`),
    useFetchi<MakerBase[]>(`/api/v1/makers`),
  ])
  return {
    prefectureItems: _prefectures.value.map((v) => ({ value: v.groupCode, title: v.name })),
    makerItems: _makers.value.map((v) => ({ value: v.id, title: v.name })),
  }
}

export { useFetchMaster }
