import type ListDialog from '~/components/list-dialog.vue'

/**
 * 車両型式の選択状態を管理する
 */
const useVehicleModelCodeSelection = () => {
  const refVehicleModelCodes = ref<InstanceType<typeof ListDialog> | null>(null)
  const vehicleModelCodes = ref<Item[]>([])
  const selectedVehicleModelCodes = ref<Item[]>([])
  const searchedVehicleModelCodes = ref<VehicleModelCode[]>([])
  let searchTimer: ReturnType<typeof setTimeout> | undefined
  let searchSequence = 0

  onScopeDispose(() => clearTimeout(searchTimer))

  /**
   * 車名に紐づく型式を取得して、型式選択モーダルを開く
   */
  const openVehicleModelCodes = async (item: Item) => {
    const modelCodes = await $fetch<VehicleModelCode[]>('/api/v1/vehicle-model-codes', {
      query: { carNameId: item.value },
    })
    vehicleModelCodes.value = modelCodes.map((modelCode) => ({
      value: modelCode.id,
      title: modelCode.code,
    }))

    if (vehicleModelCodes.value.length) {
      await nextTick()
      refVehicleModelCodes.value?.open()
    }
  }

  /**
   * 選択した型式をキーワード入力欄へ追加する
   */
  const addVehicleModelCodeToKeywords = (item: Item) => {
    const currentText = queryObject.value.text.trim()
    const currentKeywords = currentText.split(/\s+/).filter((keyword) => keyword)
    if (currentKeywords.some((keyword) => keyword.toUpperCase() === item.title.toUpperCase())) {
      return
    }

    queryObject.value.text = [currentText, item.title].filter((keyword) => keyword).join(' ')
  }

  /**
   * 入力された型式を前方一致で検索する
   */
  const searchVehicleModelCodes = (value: string) => {
    clearTimeout(searchTimer)
    const normalizedValue = value.normalize('NFKC').trim().toUpperCase()
    const sequence = ++searchSequence

    if (normalizedValue.length < 2 || !/^[A-Z0-9-]+$/.test(normalizedValue)) {
      searchedVehicleModelCodes.value = []
      return
    }

    searchTimer = setTimeout(async () => {
      try {
        const modelCodes = await $fetch<VehicleModelCode[]>('/api/v1/vehicle-model-codes', {
          query: { query: normalizedValue },
        })
        if (sequence === searchSequence) {
          searchedVehicleModelCodes.value = modelCodes
        }
      } catch {
        if (sequence === searchSequence) {
          searchedVehicleModelCodes.value = []
        }
      }
    }, 250)
  }

  /**
   * 型式の検索結果をクリアする
   */
  const clearVehicleModelCodeSearch = () => {
    clearTimeout(searchTimer)
    searchSequence++
    searchedVehicleModelCodes.value = []
  }

  /**
   * 型式選択状態をリセットする
   */
  const resetVehicleModelCodes = () => {
    vehicleModelCodes.value = []
    selectedVehicleModelCodes.value = []
    clearVehicleModelCodeSearch()
  }

  return {
    refVehicleModelCodes,
    vehicleModelCodes,
    selectedVehicleModelCodes,
    searchedVehicleModelCodes,
    openVehicleModelCodes,
    addVehicleModelCodeToKeywords,
    searchVehicleModelCodes,
    clearVehicleModelCodeSearch,
    resetVehicleModelCodes,
  }
}

export { useVehicleModelCodeSelection }
