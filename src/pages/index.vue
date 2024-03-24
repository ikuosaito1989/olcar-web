<script setup lang="ts">
const route = useRoute()
useSetFromQuery(route.query)

const { data: summary } = await useFetchi<Summary>('/api/v1/cars', {
  query: {
    offset: formatUtil.toOffset(route.query.page, Constants.LIMIT),
    limit: Constants.LIMIT,
    'keywords[]': queryUtil.toArrayQuery(route.query['keywords[]']),
    'makerIds[]': queryUtil.toArrayQuery(route.query['makerIds[]']),
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

queryObject.value.page = route.query.page ? +route.query.page : 1

/**
 * ページを変更する
 *
 * @param value ページ数
 */
const navigate = async (value: number) => {
  queryObject.value.page = value
  reloadNuxtApp({ path: `/?${useQueryString()}` })
}
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    <v-chip v-for="(condition, i) in useGetSearchConditions()" :key="`maker_${i}`">
      {{ condition }}
    </v-chip>

    <CarsList :summary="summary" />

    <v-pagination
      v-model="queryObject.page"
      :length="6"
      @update:model-value="navigate"
    ></v-pagination>
  </section>
</template>
