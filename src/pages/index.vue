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
const navigate = async (path: string = '') => {
  reloadNuxtApp({ path: `/${path}${useQueryString()}` })
}

/**
 * ページを変更する
 *
 * @param value ページ数
 */
const onChangePage = async (value: number) => {
  queryObject.value.page = value
  navigate()
}
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
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

    <div class="tw-flex">
      <div>{{ summary.total }}台</div>
      <div @click="navigate('search')">絞り込む</div>
      <div>並び替え</div>
    </div>
    <CarsList :summary="summary" />

    <v-pagination
      v-model="queryObject.page"
      :length="length"
      @update:model-value="onChangePage"
    ></v-pagination>
  </section>
</template>
