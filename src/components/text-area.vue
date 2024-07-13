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
  chipLabel: {
    type: String,
    default: '',
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
    <div class="tw-flex tw-items-center">
      <div
        v-if="!!label"
        class="tw-my-3 tw-mr-2 tw-border-s-4 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
      >
        {{ label }}
      </div>
      <v-chip v-if="!!chipLabel">{{ chipLabel }}</v-chip>
    </div>
    <v-textarea
      v-model="text"
      :placeholder="placeholder"
      :hint="hint"
      :counter="counter"
      :maxlength="counter"
      :rules="rules"
    ></v-textarea>
  </div>
</template>
