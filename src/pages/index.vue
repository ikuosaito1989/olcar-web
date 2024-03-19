<script setup lang="ts">
import queryString from 'query-string'

const route = useRoute()
const page = ref(route.query.page ? +route.query.page : 1)
const queryObject = ref({ page: page })
const offset = format.toOffset(route.query.page, Constants.LIMIT)

const { data: summary } = await useFetchi<Summary>('/api/v1/cars', {
  query: { offset: offset },
})

/**
 * ページを変更する
 *
 * @param value ページ数
 */
const navigate = async (value: number) => {
  queryObject.value.page = value
  const query = queryString.stringify(queryObject.value)
  reloadNuxtApp({ path: `/?${query}` })
}
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    <CarsList :summary="summary" />

    <v-pagination v-model="page" :length="6" @update:model-value="navigate"></v-pagination>
  </section>
</template>
