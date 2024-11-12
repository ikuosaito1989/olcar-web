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
  isUnderLine: {
    type: Boolean,
    default: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const hrefObj = queryString.parseUrl(props.to)

// @note pathが同一の場合はexternalをつけるためのフラグ
const external = computed(() => props.external || route.path === hrefObj.url)
</script>

<template>
  <NuxtLink
    :class="{ 'hover:tw-underline': isUnderLine }"
    :to="to"
    :external="external"
    :target="target"
  >
    <slot></slot>
  </NuxtLink>
</template>
