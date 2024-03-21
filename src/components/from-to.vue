<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  fromItem: {
    type: Array<string>,
    required: true,
  },
  toItem: {
    type: Array<string>,
    required: true,
  },
  fromLabel: {
    type: String,
    default: '指定なし',
  },
  toLabel: {
    type: String,
    default: '指定なし',
  },
})
</script>

<template>
  <div>
    <div>{{ label }}</div>
    <div class="tw-flex">
      <v-select :label="fromLabel" :items="fromItem"></v-select>
      <div>~</div>
      <v-select :label="toLabel" :items="toItem"></v-select>
    </div>
  </div>
</template>
