<script setup lang="ts">
import dayjs from '~/lib/day'

const details = ref<DetailBase[]>()
onMounted(async () => {
  const storage = localStorageUtil
    .getItem<LocalStorage>(Constants.LOCALSTORAGE.FAVORITE)
    .sort((a, b) => (dayjs(b.actionAt).isAfter(dayjs(a.actionAt)) ? 1 : -1))

  const data = await $fetch<Summary>('/api/v1/cars', {
    query: {
      'ids[]': localStorageUtil
        .getItem<LocalStorage>(Constants.LOCALSTORAGE.FAVORITE)
        .map((v) => v.id),
    },
  })

  details.value = data.details.sort(
    (x, y) => storage.findIndex((v) => v.id === x.id) - storage.findIndex((v) => v.id === y.id),
  )
})
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    <div>お気に入り</div>
    <CarsList v-if="details" :details="details" />
  </section>
</template>
