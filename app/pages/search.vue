<script setup lang="ts">
import { mdiMagnify } from '@mdi/js'
import type ListDialog from '~/components/list-dialog.vue'
import { useGoTo } from 'vuetify'
const { t } = useI18n()
const route = useRoute()
const goTo = useGoTo()
const refCarNames = ref<InstanceType<typeof ListDialog> | null>(null)

useSetFromQuery(route.query)
useSearchSocialType(route.query)

const { prefectureItems, makerItems } = await useFetchMaster()
const { data: _carNames } = await useFetchi<CarName[]>(`/api/v1/cars/names`, {
  query: { 'makerIds[]': [] },
})
const carNames = ref<Item[]>([])
const count = ref<number>()

watch(
  () => queryObject.value,
  async () => {
    await onSearch()
  },
  { deep: true },
)

onMounted(async () => {
  await onSearch()
})

/**
 * リセット
 */
const onReset = async () => {
  useReset()
  goTo(0)
  await onSearch()
}

/**
 * 検索
 * @param item
 */
const onSearch = async () => {
  count.value = undefined
  const params = queryObject.value
  // eslint-disable-next-line no-irregular-whitespace
  const texts = params.text.split(/ |　/g).filter((t) => t.length > 1)
  const _count = await $fetch<CarCount>('/api/v1/cars/count', {
    query: {
      offset: formatUtil.toOffset(route.query.page, Constants.LIMIT),
      limit: Constants.LIMIT,
      'keywords[]': params.text ? texts : [],
      'makerIds[]': params.makers.map((v) => v.value),
      'carNames[]': params.carNames.map((v) => v.title),
      'prefectures[]': params.prefectures.map((v) => v.title),
      'socialTypes[]': params.socialTypes.length === 5 ? undefined : params.socialTypes,
      isSponsor: params.isSponsor,
      isSales: params.isSales,
      mileageFrom: params.mileageFrom?.key,
      mileageTo: params.mileageTo?.key,
      priceFrom: params.priceFrom?.key,
      priceTo: params.priceTo?.key,
      isVehicleInspection: params.isVehicleInspection,
    },
  })
  count.value = _count.totalCount
}

/**
 * Listコンポーネントから取得した情報をqueryObjectに設定する
 *
 * @param key
 * @param item
 */
const onClickMaker = async (item: Item) => {
  setCarNames(item.value)
  refCarNames.value?.open()
}

/**
 * queryObjectからqueryStringを生成してリダイレクトする
 */
const onClickSearch = async () => {
  await navigateTo(`/${useQueryString()}`, { external: true })
}

/**
 * CarNamesをセットする
 */
const setCarNames = async (id?: number | string) => {
  carNames.value = _carNames.value
    .filter((v) => !id || v.makerId === id)
    .map((v) => ({
      value: v.id,
      title: v.name,
    }))
}

useHead(useSeo(t('searchLabel')))
setCarNames()
</script>

<template>
  <v-form class="tw-m-2">
    <div class="tw-my-4 tw-border-b tw-pb-3 tw-text-center tw-text-xl tw-font-bold">
      <v-icon color="primary">{{ mdiMagnify }}</v-icon>
      {{ $t('searchLabel') }}
    </div>

    <TextField
      v-model:text="queryObject.text"
      :label="$t('keywordSearch')"
      :placeholder="$t('placeholder')"
      :counter="30"
      type="text"
    ></TextField>

    <ListDialog
      :current-items="queryObject.makers"
      :title="$t('selectManufacturer')"
      :label="$t('manufacturerOrCarName')"
      :button-name="$t('manufacturerOrCarName')"
      :hint="$t('manufacturerHint')"
      :is-two-way-binding-enabled="false"
      :items="makerItems"
      multiple
      @click:list="onClickMaker"
      @click:close="setCarNames()"
    ></ListDialog>
    <ListDialog
      ref="refCarNames"
      :title="$t('selectCarName')"
      :label="$t('carName')"
      :button-name="$t('carName')"
      :current-items="queryObject.carNames"
      :items="carNames"
      :hint="$t('carNameHint')"
      multiple
      @click:list="setCarNames()"
      @click:close="setCarNames()"
    ></ListDialog>
    <ListDialog
      :current-items="queryObject.prefectures"
      :title="$t('selectPrefecture')"
      :label="$t('prefecture')"
      :button-name="$t('prefecture')"
      :hint="$t('prefectureHint')"
      :items="prefectureItems"
      multiple
    ></ListDialog>

    <FromTo
      v-model:from="queryObject.priceFrom"
      v-model:to="queryObject.priceTo"
      :label="$t('price')"
      :from-item="useTranslateKeyLabelToI18n(Constants.PRICES)"
      :to-item="useTranslateKeyLabelToI18n(Constants.PRICES)"
    ></FromTo>

    <FromTo
      v-model:from="queryObject.mileageFrom"
      v-model:to="queryObject.mileageTo"
      :label="$t('mileage')"
      :from-item="useTranslateKeyLabelToI18n(Constants.MILEAGES)"
      :to-item="useTranslateKeyLabelToI18n(Constants.MILEAGES)"
    ></FromTo>

    <div>
      <div
        class="tw-my-3 tw-border-s-4 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
      >
        {{ $t('mileage') }}
      </div>
      <v-checkbox
        v-model="queryObject.isVehicleInspection"
        :label="$t('vehicleInspectionAvailable')"
      ></v-checkbox>
    </div>

    <div>
      <div
        class="tw-my-3 tw-border-s-4 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
      >
        {{ $t('salesStatus') }}
      </div>
      <v-checkbox v-model="queryObject.isSales" :label="$t('showOnlyAvailable')"></v-checkbox>
    </div>

    <div
      class="tw-my-3 tw-border-s-4 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
    >
      {{ $t('services') }}
    </div>
    <div class="tw-flex tw-flex-wrap">
      <v-checkbox
        v-model="queryObject.socialTypes"
        :label="$t('twitter')"
        :value="Constants.SOCIAL_TYPE.TWITTER"
      ></v-checkbox>
      <v-checkbox
        v-model="queryObject.socialTypes"
        :label="$t('jmty')"
        :value="Constants.SOCIAL_TYPE.JMTY"
      ></v-checkbox>
      <v-checkbox
        v-model="queryObject.socialTypes"
        :label="$t('yahoo')"
        :value="Constants.SOCIAL_TYPE.YAHOO"
      ></v-checkbox>
      <v-checkbox
        v-model="queryObject.socialTypes"
        :label="$t('mercari')"
        :value="Constants.SOCIAL_TYPE.MERCARI"
      ></v-checkbox>
      <v-checkbox
        v-model="queryObject.socialTypes"
        :label="$t('rakuma')"
        :value="Constants.SOCIAL_TYPE.RAKUMA"
      ></v-checkbox>
    </div>

    <div class="tw-sticky tw-bottom-0 tw-left-0 tw-z-[9999] tw-w-full tw-p-4">
      <div class="tw-m-auto tw-flex tw-max-w-screen-md tw-text-center">
        <v-btn color="gray" variant="elevated" size="large" class="tw-w-4/12" @click="onReset">
          {{ $t('clear') }}
        </v-btn>

        <v-btn
          :loading="count === undefined"
          variant="elevated"
          size="large"
          class="tw-ml-3 tw-w-8/12"
          @click="onClickSearch"
        >
          <div class="!tw-font-bold">{{ count?.toLocaleString() }}{{ $t('search') }}</div>
        </v-btn>
      </div>
    </div>
  </v-form>
</template>
