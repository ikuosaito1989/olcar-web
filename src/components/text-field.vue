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
})

const text = defineModel<string>('text')
</script>

<template>
  <div>
    <div v-if="!!label">{{ label }}</div>
    <div v-if="required">必須</div>
    <v-text-field
      v-model="text"
      :label="placeholder"
      :type="type"
      :counter="counter"
      :maxlength="counter"
      :clearable="clearable"
    ></v-text-field>
  </div>
</template>
