<script setup lang="ts">
import type ReportDialog from '~/components/report-dialog.vue'
import dayjs from '~/lib/day'

const route = useRoute()
const refReportDialog = ref<InstanceType<typeof ReportDialog> | null>(null)
const { data: car } = await useFetchi<Detail>(`/api/v1/cars/${route.params.id}`)
const sameSummary = ref<Summary>({ isEnd: false, details: [] })
const makerSummary = ref<Summary>({ isEnd: false, details: [] })

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
</script>

<template>
  <section class="tw-w-full">
    <CarsDetail :car="car" @click:goto="onGotoPage" @click:report="onClickReport"></CarsDetail>

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

    <NuxtLink class="tw-my-6 tw-flex tw-justify-end" :to="`/${makerSummary.details[0].makerId}`">
      {{ car.makerName }}の中古車をもっとみる
      <v-icon color="primary">mdi-chevron-right</v-icon>
    </NuxtLink>

    <ReportDialog ref="refReportDialog" :car-id="car.id"></ReportDialog>
  </section>
</template>
