<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <v-chip small outlined label>
      {{ props.label }}
    </v-chip>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
