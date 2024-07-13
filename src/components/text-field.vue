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
  chipLabel: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array as () => Array<(value: string, message?: string) => string | boolean>,
    default: () => [],
  },
  icon: {
    type: String,
    default: undefined,
  },
  hint: {
    type: String,
    default: undefined,
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
    <v-text-field
      v-model="text"
      :rules="rules"
      :placeholder="placeholder"
      :type="type"
      :counter="counter"
      :maxlength="counter"
      :clearable="clearable"
      :prepend-inner-icon="icon"
      :hint="hint"
    ></v-text-field>
  </div>
</template>
