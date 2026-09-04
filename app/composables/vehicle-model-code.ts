import type ListDialog from '~/components/list-dialog.vue'

/**
 * 車両型式の選択状態を管理する
 */
const useVehicleModelCodeSelection = () => {
  const refVehicleModelCodes = ref<InstanceType<typeof ListDialog> | null>(null)
  const vehicleModelCodes = ref<Item[]>([])
  const selectedVehicleModelCodes = ref<Item[]>([])
  let searchTimer: ReturnType<typeof setTimeout> | undefined
  let searchSequence = 0

  onScopeDispose(() => clearTimeout(searchTimer))

  /**
   * APIレスポンスを型式選択項目へ変換する
   */
  const toItems = (modelCodes: VehicleModelCode[]) =>
    modelCodes.map((modelCode) => ({
      value: modelCode.code,
      title: modelCode.carNames?.length
        ? `${modelCode.code}（${modelCode.carNames.join('・')}）`
        : modelCode.code,
    }))

  /**
   * 車名に紐づく型式を取得して、型式選択モーダルを開く
   */
  const openVehicleModelCodes = async (item: Item) => {
    const modelCodes = await $fetch<VehicleModelCode[]>('/api/v1/vehicle-model-codes', {
      query: { carNameId: item.value },
    })
    vehicleModelCodes.value = toItems(modelCodes)

    if (vehicleModelCodes.value.length) {
      await nextTick()
      refVehicleModelCodes.value?.open()
    }
  }

  /**
   * 選択した型式をキーワード入力欄へ追加する
   */
  const addVehicleModelCodeToKeywords = (item: Item) => {
    const modelCode = item.value.toString()
    const currentText = queryObject.value.text.trim()
    const currentKeywords = currentText.split(/\s+/).filter((keyword) => keyword)
    const isAlreadyAdded = currentKeywords.some(
      (keyword) => keyword.toUpperCase() === modelCode.toUpperCase(),
    )
    if (!isAlreadyAdded) {
      queryObject.value.text = [currentText, modelCode].filter((keyword) => keyword).join(' ')
    }

    clearVehicleModelCodeSearch()
  }

  /**
   * 入力された型式を前方一致で検索する
   */
  const searchVehicleModelCodes = (value: string) => {
    clearTimeout(searchTimer)
    const normalizedValue = value.normalize('NFKC').trim().toUpperCase()
    const sequence = ++searchSequence

    if (!normalizedValue || !/^[A-Z0-9-]+$/.test(normalizedValue)) {
      vehicleModelCodes.value = []
      return
    }

    searchTimer = setTimeout(async () => {
      try {
        const modelCodes = await $fetch<VehicleModelCode[]>('/api/v1/vehicle-model-codes', {
          query: { query: normalizedValue },
        })
        if (sequence === searchSequence) {
          vehicleModelCodes.value = toItems(modelCodes)
        }
      } catch {
        if (sequence === searchSequence) {
          vehicleModelCodes.value = []
        }
      }
    }, 250)
  }

  /**
   * 型式の先頭50件を取得する
   */
  const loadDefaultVehicleModelCodes = async () => {
    const sequence = ++searchSequence
    try {
      const modelCodes = await $fetch<VehicleModelCode[]>('/api/v1/vehicle-model-codes')
      if (sequence === searchSequence) {
        vehicleModelCodes.value = toItems(modelCodes)
      }
    } catch {
      if (sequence === searchSequence) {
        vehicleModelCodes.value = []
      }
    }
  }

  /**
   * 型式の検索結果をクリアする
   */
  const clearVehicleModelCodeSearch = () => {
    clearTimeout(searchTimer)
    searchSequence++
    vehicleModelCodes.value = []
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
    openVehicleModelCodes,
    addVehicleModelCodeToKeywords,
    searchVehicleModelCodes,
    loadDefaultVehicleModelCodes,
    clearVehicleModelCodeSearch,
    resetVehicleModelCodes,
  }
}

export { useVehicleModelCodeSelection }
