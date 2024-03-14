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
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="tw-flex tw-h-svh tw-flex-col tw-items-center tw-justify-center">
    <component :is="errorPage" />
    <v-btn color="primary" prepend-icon="$vuetify" @click="handleError">トップ</v-btn>
  </div>
</template>
