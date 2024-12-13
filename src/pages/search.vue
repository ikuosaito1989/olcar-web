<script setup lang="ts">
import { mdiMagnify } from '@mdi/js'
import type ListDialog from '~/components/list-dialog.vue'
const { t } = useI18n()
const route = useRoute()
const refCarNames = ref<InstanceType<typeof ListDialog> | null>(null)

useSetFromQuery(route.query)
useSearchSocialType(route.query)

const { prefectureItems, makerItems } = await useFetchMaster()
const { data: _carNames } = await useFetchi<CarName[]>(`/api/v1/cars/names`, {
  query: { 'makerIds[]': [] },
})
const carNames = ref<Item[]>([])

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

    <TextField
      v-model:text="queryObject.text"
      :label="$t('keywordSearch')"
      :placeholder="$t('placeholder')"
      :counter="30"
      type="text"
      :icon="mdiMagnify"
    ></TextField>

    <div
      class="tw-fixed tw-bottom-0 tw-left-0 tw-z-10 tw-w-full tw-bg-gray-100 tw-p-4 tw-opacity-90"
    >
      <div class="tw-m-auto tw-flex tw-max-w-screen-md tw-text-center">
        <v-btn color="gray" variant="elevated" size="large" class="tw-w-4/12" @click="useReset">
          {{ $t('clear') }}
        </v-btn>

        <v-btn
          variant="elevated"
          size="large"
          class="tw-ml-3 tw-w-8/12"
          :append-icon="mdiMagnify"
          @click="onClickSearch"
        >
          {{ $t('search') }}
        </v-btn>
      </div>
    </div>

    <GoogleAd></GoogleAd>
  </v-form>
</template>
