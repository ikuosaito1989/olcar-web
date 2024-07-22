<script setup lang="ts">
import type ReportDialog from '~/components/report-dialog.vue'
import dayjs from '~/lib/day'

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
 * 掲載ページへ遷移する
 */
const onGotoPage = () => {
  window.open(car.value.referenceUrls[0], '_blank', 'noreferrer')
}

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
  )}万円 車検:${formatUtil.toLocaleVehicleInspection(
    car.value.vehicleInspection,
    car.value.unknownVehicleInspection,
  )} 走行距離:${formatUtil.toMileage(car.value.mileage)}`

  // @note 10桁を超えるパラメータはシークレットキーのため、インデックスしないn
  const isNoIndex = route.params.id.length > 10

  return headUtil.seo(
    title,
    car.value.comment,
    car.value.images[0],
    'article',
    'summary',
    isNoIndex,
  )
}

useHead(getHeader())
</script>

<template>
  <section>
    <CarsDetail :car="car" @click:goto="onGotoPage" @click:report="onClickReport"></CarsDetail>

    <div class="tw-my-2 tw-rounded-3xl tw-bg-[#f5f5f6] tw-p-4">
      <NuxtLink to="/info/omakase-agent">
        <div class="tw-my-2 tw-flex tw-items-center">
          <v-icon color="#f67b01" class="" size="40">mdi-handshake-outline</v-icon>
          <div class="">
            個人売買のお取引が不安の方のために行政書士が購入から納車までサポートするおまかせ代行サービスを始めました！不安な手続きを完全サポート！
          </div>
        </div>
        <Banner
          src="https://homepage.gsss.pro/wp-content/uploads/2023/08/1a7321fd5c87b44161456ab0d5bcbbaf-1.png"
          href="/info/omakase-agent"
        ></Banner>
      </NuxtLink>
    </div>

    <Banner href="/info/exhibit" src="/banner/exhibit.png"></Banner>

    <div
      class="tw-mx-2 tw-my-3 tw-border-s-8 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
    >
      {{ car.makerName }} {{ car.name }}の中古車を探す
    </div>
    <CarsList :details="sameSummary.details" />
    <NuxtLink
      class="tw-my-6 tw-flex tw-justify-end"
      :to="`/?makerIds[]=${car.makerId}&carNames[]=${car.name}`"
    >
      {{ car.name }}の中古車をもっとみる
      <v-icon color="primary">mdi-chevron-right</v-icon>
    </NuxtLink>
    <div
      class="tw-mx-2 tw-my-3 tw-border-s-8 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
    >
      {{ car.makerName }}の中古車を探す
    </div>
    <CarsList :details="makerSummary.details" />

    <NuxtLink class="tw-my-6 tw-flex tw-justify-end" :to="`/${car.makerId}`">
      {{ car.makerName }}の中古車をもっとみる
      <v-icon color="primary">mdi-chevron-right</v-icon>
    </NuxtLink>

    <Banner href="/info/purchase-process" src="/banner/purchase-process.png"></Banner>

    <Fav></Fav>
    <ReportDialog ref="refReportDialog" :car-id="car.id"></ReportDialog>
  </section>
</template>
