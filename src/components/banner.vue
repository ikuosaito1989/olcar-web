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
      <nuxt-img class="tw-m-auto tw-max-h-80 tw-object-contain" :src="src" />
    </div>
  </Anchor>
</template>
