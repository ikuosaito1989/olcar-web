<script setup lang="ts">
const route = useRoute()
useSetFromQuery(route.query)

const makerIds = route.params.makerId ? [route.params.makerId] : []
const { data: summary } = await useFetchi<Summary>('/api/v1/cars', {
  query: {
    offset: formatUtil.toOffset(route.query.page, Constants.LIMIT),
    limit: Constants.LIMIT,
    'keywords[]': queryUtil.toArrayQuery(route.query['keywords[]']),
    'makerIds[]': [...makerIds, ...queryUtil.toArrayQuery(route.query['makerIds[]'])],
    'carNames[]': queryUtil.toArrayQuery(route.query['carNames[]']),
    'prefectures[]': queryUtil.toArrayQuery(route.query['prefectures[]']),
    'socialTypes[]': queryUtil.toArrayQuery(route.query['socialTypes[]']),
    isSponsor: !!route.query.isSponsor,
    isSales: !!route.query.isSales,
    mileageFrom: route.query.mileageFrom,
    mileageTo: route.query.mileageTo,
    priceFrom: route.query.priceFrom,
    priceTo: route.query.priceTo,
    isVehicleInspection: route.query.isVehicleInspection === 'true',
    priceOrder: route.query.priceOrder,
    mileageOrder: route.query.mileageOrder,
  },
})

const _length = Math.ceil(summary.value.total / Constants.LIMIT) || 1
const length = ref(Math.ceil(_length > 100 ? 99 : _length))
const makerName = ref(Constants.MAKERS.find((v) => v.key === +route.params.makerId)?.value)
const searchConditions = ref(useGetSearchConditions())
queryObject.value.page = route.query.page ? +route.query.page : undefined

/**
 * ページを変更する
 *
 * @param value ページ数
 */
const onNavigate = async ({
  path = '',
  sort,
}: {
  path?: string
  sort?: { key: 'priceOrder' | 'mileageOrder'; value: Sort }
}) => {
  if (sort) {
    useOrderReset()
    queryObject.value[sort.key] = sort.value
  }

  reloadNuxtApp({ path: `/${path}${useQueryString()}` })
}

/**
 * ページを変更する
 *
 * @param value ページ数
 */
const onChangePage = async (value: number) => {
  queryObject.value.page = value
  onNavigate({})
}
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    <div class="tw-sticky tw-top-0 tw-z-50">
      <div v-if="searchConditions.length">
        <div>検索条件</div>
        <v-chip v-for="(condition, i) in searchConditions" :key="`maker_${i}`">
          {{ condition }}
        </v-chip>
      </div>

      <div v-if="makerName"><v-icon>mdi-car</v-icon>{{ makerName }}の中古車</div>

      <div v-if="summary.total === 0">
        <v-icon>mdi-magnify</v-icon>
        検索された車は見つかりませんでした。再度検索して下さい
      </div>

      <div class="tw-flex tw-h-12 tw-justify-end">
        <v-checkbox
          v-model="queryObject.isSales"
          color="primary"
          class="tw-mx-5"
          label="販売中のみ表示"
          @change="onNavigate({})"
        ></v-checkbox>
      </div>

      <div
        class="tw-flex tw-h-12 tw-w-full tw-items-center tw-border tw-text-center tw-shadow-white [&>div]:tw-border-r [&>div]:tw-py-3 [&>div]:tw-font-bold"
      >
        <div class="tw-w-full">全{{ summary.total }}台</div>
        <div class="tw-w-full tw-text-[#bc4c00]" @click="onNavigate({ path: 'search' })">
          <v-icon color="primary" icon="mdi-magnify"></v-icon>絞り込む
        </div>
        <div class="tw-w-full tw-text-[#bc4c00]">
          <v-icon color="primary" icon="mdi-sort"></v-icon>
          並び替え
        </div>
      </div>

      <div>
        <div>価格</div>
        <div @click="onNavigate({ sort: { key: 'priceOrder', value: 'asc' } })">安い順</div>
        <div @click="onNavigate({ sort: { key: 'priceOrder', value: 'desc' } })">高い順</div>
        <div>走行距離</div>
        <div @click="onNavigate({ sort: { key: 'mileageOrder', value: 'asc' } })">少ない順</div>
        <div @click="onNavigate({ sort: { key: 'mileageOrder', value: 'desc' } })">多い順</div>
      </div>
    </div>
    <CarsList :details="summary.details" />

    <v-pagination
      v-model="queryObject.page"
      :length="length"
      @update:model-value="onChangePage"
    ></v-pagination>
  </section>
</template>
<style scoped>
:deep(.v-label) {
  font-size: 12px;
  color: black;
}
:deep(.v-messages) {
  min-height: 0;
}
</style>
