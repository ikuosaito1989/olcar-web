<script setup lang="ts">
import { mdiHeartOutline } from '@mdi/js'
const { t } = useI18n()
onActivated(async () => {
  await useSetStorageInCars(Constants.LOCALSTORAGE.FAVORITE)
})

useHead(useSeo(t('favorites')))
</script>

<template>
  <section>
    <div class="tw-my-4 tw-border-b tw-pb-3 tw-text-center tw-text-xl tw-font-bold">
      <v-icon color="primary">{{ mdiHeartOutline }}</v-icon>
      {{ $t('favorites') }}
    </div>
    <CarsList v-if="storageDetails" :details="storageDetails" />
    <div v-if="storageDetails?.length === 0" class="tw-m-8 tw-text-center tw-font-bold">
      {{ $t('noFavorites') }}
    </div>
  </section>
</template>
