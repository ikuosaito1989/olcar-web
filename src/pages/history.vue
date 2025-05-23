<script setup lang="ts">
import { mdiHistory } from '@mdi/js'
const { t } = useI18n()

onMounted(async () => {
  await useSetStorageInCars(Constants.LOCALSTORAGE.HISTORY)
})

useHead(useSeo(t('viewingHistory')))
</script>

<template>
  <section>
    <div class="tw-my-4 tw-border-b tw-pb-3 tw-text-center tw-text-xl tw-font-bold">
      <v-icon color="primary">{{ mdiHistory }}</v-icon>
      {{ $t('viewingHistory') }}
    </div>
    <CarsList v-if="storageDetails" :details="storageDetails" />
    <div v-if="storageDetails?.length === 0" class="tw-m-8 tw-text-center tw-font-bold">
      {{ $t('noViewingHistory') }}
    </div>
  </section>
</template>
