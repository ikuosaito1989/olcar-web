<script setup lang="ts">
onMounted(async () => {
  await useSetStorageInCars(Constants.LOCALSTORAGE.FAVORITE)
})
</script>

<template>
  <section class="tw-w-full">
    <div class="tw-my-4 tw-text-center tw-text-xl tw-font-bold">
      <v-icon color="primary">mdi-heart</v-icon>
      お気に入り
    </div>
    <CarsList v-if="storageDetails" :details="storageDetails" />
  </section>
</template>
