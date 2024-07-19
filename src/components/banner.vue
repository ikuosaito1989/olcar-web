<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <NuxtLink class="" :to="href">
    <v-img max-height="300" contain :lazy-src="src" :src="src" />
  </NuxtLink>
</template>
