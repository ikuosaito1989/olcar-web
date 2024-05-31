<script setup lang="ts">
onMounted(async () => {
  await useSetStorageInCars(Constants.LOCALSTORAGE.HISTORY)
})
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    <div>閲覧履歴</div>
    <CarsList v-if="storageDetails" :details="storageDetails" />
  </section>
</template>
