<script setup lang="ts">
import { mdiHandshakeOutline, mdiChevronRight, mdiMagnify } from '@mdi/js'
import type ReportDialog from '~/components/report-dialog.vue'
import dayjs from '~/lib/day'
const { t } = useI18n()
const route = useRoute()
const refReportDialog = ref<InstanceType<typeof ReportDialog> | null>(null)
const { data: car } = await useFetchi<Detail>(`/api/v1/cars/${route.params.id}`)
const sameSummary = ref<Summary>({ isEnd: false, details: [] })
const makerSummary = ref<Summary>({ isEnd: false, details: [] })

if (!car.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

onMounted(async () => {
  const query = {
    offset: 0,
    limit: 3,
    isSales: true,
    isCount: false,
    'excludeCarIds[]': [car.value.id],
  }

  $fetch<Summary>('/api/v1/cars', {
    query: {
      ...query,
      'makerIds[]': car.value.makerId,
    },
  }).then((summary) => (makerSummary.value = summary))

  $fetch<Summary>('/api/v1/cars', {
    query: {
      ...query,
      'carNames[]': [car.value.name],
    },
  }).then((summary) => (sameSummary.value = summary))

  const storage = localStorageUtil.getItem<LocalStorage>(Constants.LOCALSTORAGE.HISTORY)
  const item = storage.find((v) => v.id === car.value.id) ?? {
    id: car.value.id,
    actionAt: dayjs().format(Constants.ISO8601_FORMAT),
  }

  localStorageUtil.push<LocalStorage>(Constants.LOCALSTORAGE.HISTORY, item)
})

/**
 * レポートダイアログを表示する
 */
const onClickReport = () => {
  refReportDialog.value?.open()
}

/**
 * 検索条件によってSEO Metaを設定する
 */
const getHeader = () => {
  const title = `${car.value.makerName} ${car.value.name} ${formatUtil.toTenThousand(
    car.value.price,
  )}${t('tenThousandYen')} ${t('vehicleInspection')}:${formatUtil.toLocaleVehicleInspection(
    car.value.vehicleInspection,
    car.value.unknownVehicleInspection,
    t('date_format_year_month'),
    t('valid'),
  )} ${t('mileage')}:${formatUtil.toMileage(car.value.mileage, 1, t('ten_thousand_km'))}`

  // @note 10桁を超えるパラメータはシークレットキーのため、インデックスしないn
  const isNoIndex = route.params.id.length > 10

  return useSeo(title, car.value.comment, car.value.images[0], 'article', 'summary', isNoIndex)
}

useHead(getHeader())
</script>

<template>
  <section>
    <CarsDetail :car="car" @click:report="onClickReport"></CarsDetail>

    <div class="tw-m-2 tw-rounded-3xl tw-bg-[#f5f5f6] tw-p-4">
      <Anchor :is-under-line="false" to="/info/omakase-agent">
        <div class="tw-mb-4 tw-flex tw-items-center">
          <v-icon color="#f67b01" class="tw-mr-2" size="40">
            {{ mdiHandshakeOutline }}
          </v-icon>
          <div>
            {{ $t('omakaseDescription') }}
          </div>
        </div>
        <nuxt-img
          class="tw-m-auto tw-max-h-80 tw-object-contain"
          src="https://homepage.gsss.pro/wp-content/uploads/2023/08/1a7321fd5c87b44161456ab0d5bcbbaf-1.png"
        />
      </Anchor>
    </div>

    <Banner href="/info/exhibit" src="/banner/exhibit.webp"></Banner>

    <div
      class="tw-mx-2 tw-my-3 tw-border-s-8 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
    >
      {{ $t('findUsedCar', [`${car.makerName} ${car.name}`]) }}
    </div>
    <CarsList :details="sameSummary.details" />
    <Anchor
      class="tw-my-6 tw-flex tw-justify-end"
      :to="`/?carNames[]=${car.name}`"
      :external="true"
    >
      {{ car.name }}{{ $t('findMore') }}
      <v-icon color="primary">{{ mdiChevronRight }}</v-icon>
    </Anchor>
    <div
      class="tw-mx-2 tw-my-3 tw-border-s-8 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
    >
      {{ $t('findUsedCar', [car.makerName]) }}
    </div>
    <CarsList :details="makerSummary.details" />

    <Anchor class="tw-my-6 tw-flex tw-justify-end" :to="`/${car.makerId}`" :external="true">
      {{ car.makerName }}{{ $t('findMore') }}
      <v-icon color="primary">{{ mdiChevronRight }}</v-icon>
    </Anchor>

    <Banner href="/info/purchase-process" src="/banner/purchase-process.webp"></Banner>

    <Fav :icon="mdiMagnify" :label="$t('searchNow')" :to="'/search' + useQueryString()"></Fav>
    <ReportDialog ref="refReportDialog" :car-id="car.id"></ReportDialog>
  </section>
</template>
