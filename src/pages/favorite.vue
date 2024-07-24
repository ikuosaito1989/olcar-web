<script setup lang="ts">
onMounted(async () => {
  await useSetStorageInCars(Constants.LOCALSTORAGE.FAVORITE)
})
useHead(headUtil.seo('お気に入り'))
</script>

<template>
  <section>
    <div class="tw-my-4 tw-border-b tw-pb-3 tw-text-center tw-text-xl tw-font-bold">
      <v-icon color="primary">mdi-heart</v-icon>
      お気に入り
    </div>
    <CarsList v-if="storageDetails" :details="storageDetails" />
    <div v-if="storageDetails?.length === 0" class="tw-m-8 tw-text-center tw-font-bold">
      お気に入りはありません
    </div>
  </section>
</template>
