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
  <Anchor :to="href">
    <div v-ripple>
      <v-img max-height="300" contain :lazy-src="src" :src="src" />
    </div>
  </Anchor>
</template>
