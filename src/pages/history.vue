<script setup lang="ts">
onActivated(async () => {
  await useSetStorageInCars(Constants.LOCALSTORAGE.HISTORY)
})

useHead(headUtil.seo('閲覧履歴'))
</script>

<template>
  <section>
    <div class="tw-my-4 tw-border-b tw-pb-3 tw-text-center tw-text-xl tw-font-bold">
      <v-icon color="primary">mdi-history</v-icon>
      閲覧履歴
    </div>
    <CarsList v-if="storageDetails" :details="storageDetails" />
    <div v-if="storageDetails?.length === 0" class="tw-m-8 tw-text-center tw-font-bold">
      閲覧履歴はありません
    </div>
  </section>
</template>
