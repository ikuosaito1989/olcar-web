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
    type: [String, String] as PropType<'text'>,
    default: 'text',
  },
  hint: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  counter: {
    type: Number,
    default: undefined,
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
    <v-textarea
      v-model="text"
      :label="placeholder"
      :hint="hint"
      :counter="counter"
      :maxlength="counter"
      :rules="rules"
    ></v-textarea>
  </div>
</template>
