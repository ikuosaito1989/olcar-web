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
    <div v-ripple class="tw-flex tw-justify-center">
      <nuxt-img
        :placeholder="Constants.PLACEHOLDER_IMAGES.IMAGE16_9"
        class="tw-max-h-80 tw-min-h-56 tw-w-full tw-max-w-xl tw-object-contain"
        :src="src"
      />
    </div>
  </Anchor>
</template>
