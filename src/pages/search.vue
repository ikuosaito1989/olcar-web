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
 * queryObjectからqueryStringを生成してリダイレクトする
 */
const onClickSearch = () => {
  reloadNuxtApp({ path: `/${useQueryString()}` })
}

useHead(headUtil.seo('検索'))
</script>

<template>
  <v-form class="tw-m-2">
    <div class="tw-my-4 tw-border-b tw-pb-3 tw-text-center tw-text-xl tw-font-bold">
      <v-icon color="primary">mdi-magnify</v-icon>
      検索
    </div>
    <ListDialog
      :current-items="queryObject.makers"
      title="メーカー選択"
      label="メーカー・車名"
      button-name="メーカー・車名"
      :items="makerItems"
      multiple
      @click:list="onClickMaker('makers', $event)"
    ></ListDialog>
    <ListDialog
      ref="refCarNames"
      :current-items="queryObject.carNames"
      :items="carNames"
      multiple
    ></ListDialog>
    <ListDialog
      :current-items="queryObject.prefectureNames"
      title="都道府県選択"
      label="都道府県"
      button-name="都道府県"
      :items="prefectureItems"
    ></ListDialog>

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
      <!-- コンポーネント化するか検討 -->
      <div
        class="tw-my-3 tw-border-s-4 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
      >
        走行距離
      </div>
      <v-checkbox v-model="queryObject.isVehicleInspection" label="車検あり"></v-checkbox>
    </div>

    <div
      class="tw-my-3 tw-border-s-4 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
    >
      サービス
    </div>
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
      icon="mdi-magnify"
    ></TextField>

    <div class="tw-fixed tw-bottom-0 tw-left-0 tw-w-full tw-bg-gray-100 tw-p-4 tw-opacity-90">
      <div class="tw-m-auto tw-flex tw-max-w-screen-md tw-text-center">
        <v-btn color="gray" variant="elevated" size="large" class="tw-w-4/12" @click="useReset"
          >クリア</v-btn
        >

        <v-btn
          variant="elevated"
          size="large"
          class="tw-ml-3 tw-w-8/12"
          append-icon="mdi-magnify"
          @click="onClickSearch"
          >検索する</v-btn
        >
      </div>
    </div>
  </v-form>
</template>
