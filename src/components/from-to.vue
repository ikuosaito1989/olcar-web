<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  fromItem: {
    type: Array as () => Array<KeyLabel>,
    required: true,
  },
  toItem: {
    type: Array as () => Array<KeyLabel>,
    required: true,
  },
  fromRequiredLabel: {
    type: String,
    default: '指定なし',
  },
  toRequiredLabel: {
    type: String,
    default: '指定なし',
  },
  isFromLabel: {
    type: String,
    default: '~',
  },
})

const from = defineModel<KeyLabel | null>('from')
const to = defineModel<KeyLabel | null>('to')
const fromValue = ref<string | number | undefined>(from.value?.label)
const toValue = ref<string | number | undefined>(to.value?.label)

watch([to, from], () => {
  if (!from.value?.key) fromValue.value = undefined
  if (!to.value?.key) toValue.value = undefined
})

/**
 * セレクトボックスの値を設定する
 * @param type
 * @param label
 */
const onSelect = (type: 'from' | 'to', label: string | number | null) => {
  const item = props[`${type}Item`].find((v) => v.label === label)

  if (type === 'from') {
    from.value = item
  } else {
    to.value = item
  }
}
</script>

<template>
  <div>
    <div
      class="tw-my-3 tw-border-s-4 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
    >
      {{ label }}
    </div>
    <div class="tw-flex">
      <v-select
        v-model="fromValue"
        :label="fromRequiredLabel"
        :items="fromItem.map((v) => v.label)"
        @update:model-value="onSelect('from', $event)"
      ></v-select>
      <div class="tw-mx-5 tw-mb-5 tw-flex tw-items-center">{{ isFromLabel }}</div>
      <v-select
        v-model="toValue"
        :label="toRequiredLabel"
        :items="toItem.map((v) => v.label)"
        @update:model-value="onSelect('to', $event)"
      ></v-select>
    </div>
  </div>
</template>
