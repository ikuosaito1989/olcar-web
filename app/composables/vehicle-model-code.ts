import type ListDialog from '~/components/list-dialog.vue'

/**
 * 車両型式の選択状態を管理する
 */
const useVehicleModelCodeSelection = () => {
  const refVehicleModelCodes = ref<InstanceType<typeof ListDialog> | null>(null)
  const vehicleModelCodes = ref<Item[]>([])
  const selectedVehicleModelCodes = ref<Item[]>([])

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
   * 型式選択状態をリセットする
   */
  const resetVehicleModelCodes = () => {
    vehicleModelCodes.value = []
    selectedVehicleModelCodes.value = []
  }

  return {
    refVehicleModelCodes,
    vehicleModelCodes,
    selectedVehicleModelCodes,
    openVehicleModelCodes,
    addVehicleModelCodeToKeywords,
    resetVehicleModelCodes,
  }
}

export { useVehicleModelCodeSelection }
