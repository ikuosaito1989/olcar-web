<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: [String, String] as PropType<'text' | 'number'>,
    default: 'text',
  },
  counter: {
    type: Number,
    default: undefined,
  },
  required: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array as () => Array<(value: string, message?: string) => string | boolean>,
    default: () => [],
  },
})

const text = defineModel<string>('text')
</script>

<template>
  <div>
    <div v-if="!!label">{{ label }}</div>
    <div v-if="required">必須</div>
    <v-text-field
      v-model="text"
      :rules="rules"
      :label="placeholder"
      :type="type"
      :counter="counter"
      :maxlength="counter"
      :clearable="clearable"
    ></v-text-field>
  </div>
</template>
