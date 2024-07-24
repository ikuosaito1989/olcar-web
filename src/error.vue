<script setup lang="ts">
import type { NuxtError } from '#app'
import error404 from '~/components/errors/404.vue'
import error500 from '~/components/errors/500.vue'

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    required: true,
  },
})

const errorPage = computed(() => {
  if (props.error.statusCode === 404) {
    return error404
  }
  return error500
})
</script>

<template>
  <div class="tw-m-2 tw-flex tw-min-h-screen tw-items-center tw-justify-center">
    <div class="tw-max-w-screen-md">
      <component :is="errorPage" />
      <div class="tw-text-center">
        <v-btn color="primary" to="/">トップ</v-btn>
      </div>
    </div>
  </div>
</template>
