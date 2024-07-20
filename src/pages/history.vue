<script setup lang="ts">
onMounted(async () => {
  await useSetStorageInCars(Constants.LOCALSTORAGE.HISTORY)
})

useHead(headUtil.seo('閲覧履歴'))
</script>

<template>
  <section>
    <div class="tw-my-4 tw-text-center tw-text-xl tw-font-bold">
      <v-icon color="primary">mdi-history</v-icon>
      閲覧履歴
    </div>
    <CarsList v-if="storageDetails" :details="storageDetails" />
  </section>
</template>
