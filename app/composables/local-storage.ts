import dayjs from '~/lib/day'

const storageDetails = ref<DetailBase[]>()

/**
 * LocalStorageに保存した車情報を閲覧順に取得する
 */
const useSetStorageInCars = async (key: string): Promise<void> => {
  const storage = localStorageUtil
    .getItem<LocalStorage>(key)
    .sort((a, b) => (dayjs(b.actionAt).isAfter(dayjs(a.actionAt)) ? 1 : -1))

  if (!storage.length) {
    storageDetails.value = []
    return
  }

  const data = await $fetch<Summary>('/api/v1/cars', {
    query: {
      'ids[]': localStorageUtil.getItem<LocalStorage>(key).map((v) => v.id),
    },
  })

  storageDetails.value = data.details.sort(
    (x, y) => storage.findIndex((v) => v.id === x.id) - storage.findIndex((v) => v.id === y.id),
  )
}

export { useSetStorageInCars, storageDetails }
