<script setup lang="ts">
import List from '~/components/list.vue'

const [{ data: _prefectures }, { data: _makers }] = await Promise.all([
  useFetchi<Prefecture[]>(`/api/v1/prefecture`),
  useFetchi<MakerBase[]>(`/api/v1/makers`),
])

const prefectures = computed(() =>
  _prefectures.value.map((v) => ({ value: v.groupCode, title: v.name })),
)
const makers = computed(() => _makers.value.map((v) => ({ value: v.id, title: v.name })))
</script>

<template>
  <v-form class="tw-w-full tw-max-w-3xl">
    <List title="メーカー選択" button-name="メーカー・車名" :items="makers"></List>
    <List title="都道府県選択" button-name="都道府県" :items="prefectures"></List>

    <FromTo label="価格" :from-item="['California']" :to-item="['California']"></FromTo>
    <FromTo label="走行距離" :from-item="['California']" :to-item="['California']"></FromTo>

    <div>
      <div>走行距離</div>
      <v-checkbox label="車検あり"></v-checkbox>
    </div>

    <div>サービス</div>
    <div class="tw-flex">
      <v-checkbox label="X（旧Twitter）"></v-checkbox>
      <v-checkbox label="ジモティー"></v-checkbox>
      <v-checkbox label="ヤフオク"></v-checkbox>
      <v-checkbox label="メルカリ"></v-checkbox>
      <v-checkbox label="ラクマ"></v-checkbox>
    </div>

    <div>
      <div>キーワード検索</div>
      <v-text-field :counter="10" label="MT サンルーフ" hide-details required></v-text-field>
    </div>

    <div>
      <v-btn>クリア</v-btn>
      <v-btn>検索</v-btn>
    </div>
  </v-form>
</template>
