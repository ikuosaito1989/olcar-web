<script setup lang="ts">
import type ReportDialog from '~/components/report-dialog.vue'

const route = useRoute()
const refReportDialog = ref<InstanceType<typeof ReportDialog> | null>(null)
const { data: car } = await useFetchi<Detail>(`/api/v1/cars/${route.params.id}`)
const sameSummary = ref<Summary>({ total: 0, details: [] })
const makerSummary = ref<Summary>({ total: 0, details: [] })

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
  <section class="tw-w-full tw-max-w-3xl">
    <CarsDetail :car="car" @click:goto="onGotoPage" @click:report="onClickReport"></CarsDetail>

    <div>{{ car.makerName }} {{ car.name }}の中古車を探す</div>
    <CarsList :details="sameSummary.details" />
    <div>{{ car.makerName }}の中古車を探す</div>
    <CarsList :details="makerSummary.details" />

    <ReportDialog ref="refReportDialog" :car-id="car.id"></ReportDialog>
  </section>
</template>
