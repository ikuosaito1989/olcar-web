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

const isVisible = ref(false)
const makerName = ref(Constants.MAKERS.find((v) => v.key === +route.params.makerId)?.value)
const searchConditions = ref(useGetSearchConditions())
queryObject.value.page = route.query.page ? +route.query.page : undefined

/**
 * ページを変更する
 *
 * @param value ページ数
 */
const onNavigate = ({
  path = '',
  sort,
}: {
  path?: string
  sort?: { key: 'priceOrder' | 'mileageOrder'; value: Sort }
}) => {
  useOrderReset()

  if (sort) {
    queryObject.value[sort.key] = sort.value
  }

  reloadNuxtApp({ path: `/${path}${useQueryString()}` })
}

/**
 * ページを変更する
 *
 * @param value ページ数
 */
const onChangePage = (value?: number) => {
  queryObject.value.page = value
  onNavigate({})
}

/**
 * 販売中のみ表示
 */
const onChangeSales = () => {
  if (!queryObject.value.isSales) {
    useIsSalesReset()
  }

  onNavigate({})
}
</script>

<template>
  <section>
    <div v-if="searchConditions.length" class="tw-mx-4 tw-mt-4">
      <div class="tw-mb-2 tw-font-bold">検索条件</div>
      <div class="tw-flex">
        <div
          v-for="(condition, i) in searchConditions"
          :key="`maker_${i}`"
          class="tw-pb-2 tw-pr-2 tw-font-bold"
        >
          <v-chip variant="elevated">
            {{ condition }}
          </v-chip>
        </div>
      </div>
    </div>

    <div v-if="makerName"><v-icon>mdi-car</v-icon>{{ makerName }}の中古車</div>

    <div v-if="summary.details.length === 0">
      <v-icon>mdi-magnify</v-icon>
      検索された車は見つかりませんでした。再度検索して下さい
    </div>
    <div class="tw-sticky tw-top-0 tw-z-50 tw-bg-white">
      <div class="tw-flex tw-h-12 tw-justify-end">
        <v-checkbox
          v-model="queryObject.isSales"
          color="primary"
          class="tw-mx-5"
          label="販売中のみ表示"
          @change="onChangeSales"
        ></v-checkbox>
      </div>

      <div
        class="tw-flex tw-h-12 tw-w-full tw-items-center tw-border tw-text-center tw-shadow [&>div:not(:last-child)]:tw-border-r [&>div]:tw-py-3 [&>div]:tw-font-bold"
      >
        <div v-ripple class="tw-w-full tw-text-[#bc4c00]" @click="onNavigate({ path: 'search' })">
          <v-icon color="primary" icon="mdi-magnify"></v-icon>絞り込む
        </div>
        <div v-ripple class="tw-w-full tw-text-[#bc4c00]" @click="() => (isVisible = !isVisible)">
          <v-icon color="primary" icon="mdi-sort"></v-icon>
          並び替え
        </div>
      </div>

      <v-expansion-panels v-model="isVisible">
        <v-expansion-panel :value="true">
          <v-expansion-panel-text class="tw-font-bold">
            <div class="tw-mb-4 tw-flex tw-items-center tw-justify-between">
              <div class="tw-basis-1/3 tw-font-bold">価格</div>
              <v-btn
                size="small"
                class="tw-mr-1 tw-basis-1/3 tw-font-bold"
                @click="onNavigate({ sort: { key: 'priceOrder', value: 'asc' } })"
              >
                安い順
              </v-btn>
              <v-btn
                size="small"
                class="tw-basis-1/3 tw-font-bold"
                @click="onNavigate({ sort: { key: 'priceOrder', value: 'desc' } })"
              >
                高い順
              </v-btn>
            </div>
            <div class="tw-mb-4 tw-flex tw-items-center tw-justify-between">
              <div class="tw-basis-1/3 tw-font-bold">走行距離</div>
              <v-btn
                size="small"
                class="tw-mr-1 tw-basis-1/3 tw-font-bold"
                @click="onNavigate({ sort: { key: 'mileageOrder', value: 'asc' } })"
              >
                少ない順
              </v-btn>
              <v-btn
                size="small"
                class="tw-basis-1/3 tw-font-bold"
                @click="onNavigate({ sort: { key: 'mileageOrder', value: 'desc' } })"
              >
                多い順
              </v-btn>
            </div>
            <div>
              <v-btn size="small" color="gray" class="tw-w-full" @click="onNavigate">
                条件をクリアして表示
              </v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <CarsList :details="summary.details" />

    <div class="tw-my-5 tw-flex tw-justify-center">
      <v-btn
        class="tw-mr-5"
        width="40"
        icon="mdi-chevron-left"
        :disabled="!queryObject.page || queryObject.page == 1"
        @click="onChangePage(queryObject.page ? queryObject.page - 1 : 1)"
      ></v-btn>
      <v-btn
        width="40"
        icon="mdi-chevron-right"
        :disabled="summary.isEnd"
        @click="onChangePage(queryObject.page ? queryObject.page + 1 : 2)"
      ></v-btn>
    </div>

    <Fav></Fav>
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
