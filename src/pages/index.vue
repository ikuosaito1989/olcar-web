<script setup lang="ts">
const route = useRoute()
queryObject.value.page = route.query.page ? +route.query.page : 1

const { data: summary } = await useFetchi<Summary>('/api/v1/cars', {
  query: { offset: format.toOffset(route.query.page, Constants.LIMIT) },
})

/**
 * ページを変更する
 *
 * @param value ページ数
 */
const navigate = async (value: number) => {
  queryObject.value.page = value
  const query = useQueryString()
  reloadNuxtApp({ path: `/?${query}` })
}
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    <CarsList :summary="summary" />

    <v-pagination
      v-model="queryObject.page"
      :length="6"
      @update:model-value="navigate"
    ></v-pagination>
  </section>
</template>
