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
})

const from = defineModel<KeyLabel | null>('from')
const to = defineModel<KeyLabel | null>('to')
const fromValue = ref<string | number | undefined>(from.value?.label)
const toValue = ref<string | number | undefined>(to.value?.label)

watch([to, from], () => {
  if (!from.value?.key) fromValue.value = undefined
  if (!to.value?.key) toValue.value = undefined
})

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
    <div>{{ label }}</div>
    <div class="tw-flex">
      <v-select
        v-model="fromValue"
        :label="fromRequiredLabel"
        :items="fromItem.map((v) => v.label)"
        @update:model-value="onSelect('from', $event)"
      ></v-select>
      <div>~</div>
      <v-select
        v-model="toValue"
        :label="toRequiredLabel"
        :items="toItem.map((v) => v.label)"
        @update:model-value="onSelect('to', $event)"
      ></v-select>
    </div>
  </div>
</template>
