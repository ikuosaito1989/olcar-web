<script setup lang="ts">
import queryString from 'query-string'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  target: {
    type: String as PropType<'_self' | '_blank' | '_parent' | '_top'>,
    default: undefined,
  },
})

const route = useRoute()
const hrefObj = queryString.parseUrl(props.to)

// @note pathが同一の場合はexternalをつけるためのフラグ
const changed = computed(() => route.path === hrefObj.url)
</script>

<template>
  <NuxtLink :to="to" :external="changed" :target="target">
    <slot></slot>
  </NuxtLink>
</template>
