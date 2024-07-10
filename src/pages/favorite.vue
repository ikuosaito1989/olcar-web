<script setup lang="ts">
onMounted(async () => {
  await useSetStorageInCars(Constants.LOCALSTORAGE.FAVORITE)
})
</script>

<template>
  <section class="tw-w-full">
    <div>お気に入り</div>
    <CarsList v-if="storageDetails" :details="storageDetails" />
  </section>
</template>
