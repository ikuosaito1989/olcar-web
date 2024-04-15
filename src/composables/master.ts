/**
 * マスタ系のAPIを整形して返す
 */
const useFetchMaster = async (): Promise<{ prefectures: Item[]; makers: Item[] }> => {
  const [{ data: _prefectures }, { data: _makers }] = await Promise.all([
    useFetchi<Prefecture[]>(`/api/v1/prefecture`),
    useFetchi<MakerBase[]>(`/api/v1/makers`),
  ])
  return {
    prefectures: _prefectures.value.map((v) => ({ value: v.groupCode, title: v.name })),
    makers: _makers.value.map((v) => ({ value: v.id, title: v.name })),
  }
}

export { useFetchMaster }
