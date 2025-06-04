<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isNewLine: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <!-- eslint-disable-next-line tailwindcss/no-custom-classname -->
  <div class="google-auto-placed">
    <div>
      <v-chip size="default" class="tw-mr-1 tw-w-20 tw-justify-center tw-font-bold">
        {{ props.label }}
      </v-chip>
    </div>
    <div :class="{ 'tw-my-2': isNewLine }"><slot></slot></div>
  </div>
</template>

<style scoped>
.google-auto-placed {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
