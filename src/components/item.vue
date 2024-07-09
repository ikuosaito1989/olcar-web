<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isNewline: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="tw-my-2 tw-flex tw-flex-wrap tw-items-center">
    <div class="">
      <v-chip size="default" class="tw-mr-1 tw-w-20 tw-justify-center tw-font-bold">
        {{ props.label }}
      </v-chip>
    </div>
    <div class="tw-line-clamp-2 tw-leading-8">
      <slot></slot>
    </div>
  </div>
</template>
