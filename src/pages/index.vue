<script setup lang="ts">
type Variant = 'elevated' | 'outlined'
const route = useRoute()
useSetFromQuery(route.query)
const { t } = useI18n()

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

if (route.params.makerId && !makerName.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const sortButtonType: globalThis.ComputedRef<{
  mileageAsc: Variant
  mileageDesc: Variant
  priceAsc: Variant
  priceDesc: Variant
  createAtAsc: Variant
}> = computed(() => {
  /**
   * ソートの状態によってVariantを取得する
   */
  const getVariant = (order: Sort | undefined, targetOrder: Sort) =>
    order === targetOrder ? 'elevated' : 'outlined'
  const mileageAsc: Variant = getVariant(queryObject.value.mileageOrder, 'asc')
  const mileageDesc: Variant = getVariant(queryObject.value.mileageOrder, 'desc')
  const priceAsc: Variant = getVariant(queryObject.value.priceOrder, 'asc')
  const priceDesc: Variant = getVariant(queryObject.value.priceOrder, 'desc')
  const createAtAsc: Variant =
    !queryObject.value.mileageOrder && !queryObject.value.priceOrder ? 'elevated' : 'outlined'
  return {
    mileageAsc,
    mileageDesc,
    priceAsc,
    priceDesc,
    createAtAsc,
  }
})

/**
 * ページを変更する
 *
 * @param value ページ数
 */
const onNavigate = async ({
  path = '',
  sort,
  isOrderReset = true,
}: {
  path?: string
  sort?: { key: 'priceOrder' | 'mileageOrder'; value: Sort }
  isOrderReset?: boolean
}) => {
  if (isOrderReset) {
    useOrderReset()
  }

  if (sort) {
    queryObject.value[sort.key] = sort.value
    queryObject.value.page = undefined
  }

  await navigateTo(`/${path}${useQueryString()}`, { external: !path })
}

/**
 * ページを変更する
 *
 * @param value ページ数
 */
const onChangePage = (value?: number) => {
  queryObject.value.page = value
  onNavigate({ isOrderReset: false })
}

/**
 * 販売中のみ表示
 */
const onChangeSales = () => {
  if (!queryObject.value.isSales) {
    useIsSalesReset()
  }

  onNavigate({ isOrderReset: false })
}

/**
 * 検索条件によってSEO Metaを設定する
 */
const getHeader = () => {
  const conditions = searchConditions.value.join(' ')
  if (makerName.value) {
    return useSeo(
      makerName.value,
      formatUtil.replace(t('used_car_description_of_maker'), makerName.value),
    )
  }

  if (searchConditions.value.length > 0) {
    return useSeo(`${conditions}`, formatUtil.replace(t('cheap_used_car_conditions'), conditions))
  }

  return useSeo()
}

useHead(getHeader())
</script>

<template>
  <section>
    <v-img class="tw-aspect-video" lazy-src="/datachef_unicolor16_9.webp" src="/top.webp"></v-img>
    <div v-if="searchConditions.length" class="tw-mx-4 tw-mt-4">
      <div class="tw-mb-2 tw-font-bold">{{ $t('searchCriteria') }}</div>
      <div class="tw-flex tw-flex-wrap">
        <div
          v-for="(condition, i) in searchConditions"
          :key="`maker_${i}`"
          class="tw-pb-3 tw-pr-3 tw-font-bold"
        >
          <v-chip variant="elevated">
            {{ condition }}
          </v-chip>
        </div>
      </div>
    </div>

    <div v-if="makerName" class="tw-px-4 tw-pt-4 tw-text-xl tw-font-bold">
      <v-icon class="tw-mb-1" color="primary">mdi-car</v-icon>

      {{ makerName }}
    </div>

    <div v-if="summary.details.length === 0" class="tw-mx-4 tw-text-center tw-font-bold">
      <v-icon>mdi-magnify</v-icon>
      {{ $t('noCarsFound') }}
    </div>

    <div class="tw-sticky tw-top-0 tw-z-50 tw-bg-white">
      <div class="tw-flex tw-h-12 tw-justify-end">
        <v-checkbox
          v-model="queryObject.isSales"
          color="primary"
          class="tw-mx-5"
          :label="$t('showOnlyAvailable')"
          @change="onChangeSales"
        ></v-checkbox>
      </div>

      <div
        class="tw-flex tw-h-12 tw-w-full tw-items-center tw-border tw-text-center tw-shadow [&>div:not(:last-child)]:tw-border-r [&>div]:tw-py-3 [&>div]:tw-font-bold"
      >
        <div v-ripple class="tw-w-full tw-text-[#bc4c00]" @click="onNavigate({ path: 'search' })">
          <v-icon color="primary" icon="mdi-magnify"></v-icon>
          {{ $t('filter') }}
        </div>
        <div v-ripple class="tw-w-full tw-text-[#bc4c00]" @click="() => (isVisible = !isVisible)">
          <v-icon color="primary" icon="mdi-sort"></v-icon>
          {{ $t('sort') }}
        </div>
        <div v-ripple class="tw-w-full tw-text-[#bc4c00]" @click="onNavigate({ path: 'favorite' })">
          <v-icon color="primary">mdi-heart-outline</v-icon>
          {{ $t('favorites') }}
        </div>
      </div>

      <v-expansion-panels v-model="isVisible">
        <v-expansion-panel :value="true">
          <v-expansion-panel-text class="tw-font-bold">
            <div class="tw-mb-4 tw-flex tw-items-center tw-justify-between">
              <div class="tw-basis-1/3 tw-font-bold">
                {{ $t('price') }}
              </div>
              <v-btn
                :variant="sortButtonType.priceAsc"
                size="small"
                class="tw-mr-1 tw-basis-1/3 tw-font-bold"
                @click="onNavigate({ sort: { key: 'priceOrder', value: 'asc' } })"
              >
                {{ $t('priceLowToHigh') }}
              </v-btn>
              <v-btn
                :variant="sortButtonType.priceDesc"
                size="small"
                class="tw-basis-1/3 tw-font-bold"
                @click="onNavigate({ sort: { key: 'priceOrder', value: 'desc' } })"
              >
                {{ $t('priceHighToLow') }}
              </v-btn>
            </div>
            <div class="tw-mb-4 tw-flex tw-items-center tw-justify-between">
              <div class="tw-basis-1/3 tw-font-bold">{{ $t('mileage') }}</div>
              <v-btn
                :variant="sortButtonType.mileageAsc"
                size="small"
                class="tw-mr-1 tw-basis-1/3 tw-font-bold"
                @click="onNavigate({ sort: { key: 'mileageOrder', value: 'asc' } })"
              >
                {{ $t('mileageLowToHigh') }}
              </v-btn>
              <v-btn
                :variant="sortButtonType.mileageDesc"
                size="small"
                class="tw-basis-1/3 tw-font-bold"
                @click="onNavigate({ sort: { key: 'mileageOrder', value: 'desc' } })"
              >
                {{ $t('mileageHighToLow') }}
              </v-btn>
            </div>
            <div class="tw-mb-4 tw-flex tw-items-center tw-justify-between">
              <div class="tw-basis-1/3 tw-font-bold">{{ $t('publishDate') }}</div>
              <v-btn
                :variant="sortButtonType.createAtAsc"
                size="small"
                class="tw-basis-[67.3%] tw-font-bold"
                @click="onNavigate"
              >
                {{ $t('newestFirst') }}
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
        width="120"
        :disabled="!queryObject.page || queryObject.page == 1 || summary.details.length === 0"
        @click="onChangePage(queryObject.page ? queryObject.page - 1 : 1)"
      >
        {{ $t('previousPage') }}
      </v-btn>
      <v-btn
        width="120"
        :disabled="summary.isEnd || summary.details.length === 0"
        @click="onChangePage(queryObject.page ? queryObject.page + 1 : 2)"
      >
        {{ $t('nextPage') }}
      </v-btn>
    </div>

    <Banner href="/info/purchase-process" src="/banner/purchase-process.webp"></Banner>
    <Banner href="/?isSponsor=true" src="/banner/recommendation.webp"></Banner>
    <Fav :label="$t('freeListing')"></Fav>
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
