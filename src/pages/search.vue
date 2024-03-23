<script setup lang="ts">
const text = ref('')
const [{ data: _prefectures }, { data: _makers }] = await Promise.all([
  useFetchi<Prefecture[]>(`/api/v1/prefecture`),
  useFetchi<MakerBase[]>(`/api/v1/makers`),
])

const prefectures = computed(() =>
  _prefectures.value.map((v) => ({ value: v.groupCode, title: v.name })),
)
const makers = computed(() => _makers.value.map((v) => ({ value: v.id, title: v.name })))

const onClickMaker = (item: Item) => {
  if (!queryObject.value.makerIds) {
    queryObject.value.makerIds = []
  }

  queryObject.value.makerIds.push(+item.value)
}

const onClickPrefectures = (item: Item) => {
  if (!queryObject.value.prefectureNames) {
    queryObject.value.prefectureNames = []
  }

  queryObject.value.prefectureNames.push(item.title)
}

const onClickSearch = () => {
  // eslint-disable-next-line no-irregular-whitespace
  queryObject.value.keywords = text.value ? text.value.split(/ |　/g) : []
  console.log(queryObject.value)
}
</script>

<template>
  <v-form class="tw-w-full tw-max-w-3xl">
    <List
      title="メーカー選択"
      button-name="メーカー・車名"
      :items="makers"
      @click:list="onClickMaker"
    ></List>
    <List
      title="都道府県選択"
      button-name="都道府県"
      :items="prefectures"
      @click:list="onClickPrefectures"
    ></List>

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

    <div>
      <div>キーワード検索</div>
      <v-text-field
        v-model="text"
        :counter="10"
        label="MT サンルーフ"
        hide-details
        required
      ></v-text-field>
    </div>

    <div>
      <v-btn @click="useReset">クリア</v-btn>
      <v-btn @click="onClickSearch">検索</v-btn>
    </div>
  </v-form>
</template>
