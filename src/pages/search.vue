<script setup lang="ts">
import type ListDialog from '~/components/list-dialog.vue'
type ListType = 'carNames' | 'makers' | 'prefectureNames'

const route = useRoute()
const refCarNames = ref<InstanceType<typeof ListDialog> | null>(null)

useSetFromQuery(route.query)
useSearchSocialType(route.query)

const { prefectureItems, makerItems } = await useFetchMaster()
const carNames = ref<Item[]>([])

/**
 * Listコンポーネントから取得した情報をqueryObjectに設定する
 *
 * @param key
 * @param item
 */
const onClickMaker = async (key: ListType, item: Item) => {
  const _carNames = await $fetch<CarName[]>(`/api/v1/cars/names`, {
    query: { 'makerIds[]': [item.value] },
  })
  carNames.value = _carNames.map((v) => ({ value: v.id, title: v.name }))
  refCarNames.value?.open()
}

/**
 * v-chipを削除する
 *
 * @param key
 * @param item
 */
const onClickChipClose = (key: ListType, item: Item) => {
  const index = queryObject.value[key].indexOf(item)
  queryObject.value.makers.splice(index, 1)
}

/**
 * queryObjectからqueryStringを生成してリダイレクトする
 */
const onClickSearch = () => {
  reloadNuxtApp({ path: `/${useQueryString()}` })
}
</script>

<template>
  <v-form class="tw-w-full tw-max-w-3xl">
    <ListDialog
      :current-items="queryObject.makers"
      title="メーカー選択"
      label="メーカー・車名"
      button-name="メーカー・車名"
      :items="makerItems"
      @click:list="onClickMaker('makers', $event)"
    ></ListDialog>
    <ListDialog
      ref="refCarNames"
      :current-items="queryObject.carNames"
      :items="carNames"
    ></ListDialog>
    <v-chip
      v-for="(maker, i) in queryObject.makers"
      :key="`maker_${i}`"
      closable
      @click:close="onClickChipClose('makers', maker)"
    >
      {{ maker.title }}
    </v-chip>
    <v-chip
      v-for="(carName, i) in queryObject.carNames"
      :key="`carName_${i}`"
      closable
      @click:close="onClickChipClose('carNames', carName)"
    >
      {{ carName.title }}
    </v-chip>
    <ListDialog
      :current-items="queryObject.prefectureNames"
      title="都道府県選択"
      label="都道府県"
      button-name="都道府県"
      :items="prefectureItems"
    ></ListDialog>

    <v-chip
      v-for="(prefectureName, i) in queryObject.prefectureNames"
      :key="`prefectureNames_${i}`"
      closable
      @click:close="onClickChipClose('prefectureNames', prefectureName)"
    >
      {{ prefectureName.title }}
    </v-chip>

    <FromTo
      v-model:from="queryObject.priceFrom"
      v-model:to="queryObject.priceTo"
      label="価格"
      :from-item="Constants.PRICES"
      :to-item="Constants.PRICES"
    ></FromTo>

    <FromTo
      v-model:from="queryObject.mileageFrom"
      v-model:to="queryObject.mileageTo"
      label="走行距離"
      :from-item="Constants.MILEAGES"
      :to-item="Constants.MILEAGES"
    ></FromTo>

    <div>
      <div>走行距離</div>
      <v-checkbox v-model="queryObject.isVehicleInspection" label="車検あり"></v-checkbox>
    </div>

    <div>サービス</div>
    <div class="tw-flex">
      <v-checkbox
        v-model="queryObject.socialTypes"
        label="X（旧Twitter）"
        :value="Constants.SOCIAL_TYPE.TWITTER"
      ></v-checkbox>
      <v-checkbox
        v-model="queryObject.socialTypes"
        label="ジモティー"
        :value="Constants.SOCIAL_TYPE.JMTY"
      ></v-checkbox>
      <v-checkbox
        v-model="queryObject.socialTypes"
        label="ヤフオク"
        :value="Constants.SOCIAL_TYPE.YAHOO"
      ></v-checkbox>
      <v-checkbox
        v-model="queryObject.socialTypes"
        label="メルカリ"
        :value="Constants.SOCIAL_TYPE.MERCARI"
      ></v-checkbox>
      <v-checkbox
        v-model="queryObject.socialTypes"
        label="ラクマ"
        :value="Constants.SOCIAL_TYPE.RAKUMA"
      ></v-checkbox>
    </div>

    <TextField
      v-model:text="queryObject.text"
      label="キーワード検索"
      placeholder="MT サンルーフ"
      :counter="10"
      type="text"
    ></TextField>

    <div>
      <v-btn @click="useReset">クリア</v-btn>
      <v-btn @click="onClickSearch">検索</v-btn>
    </div>
  </v-form>
</template>
