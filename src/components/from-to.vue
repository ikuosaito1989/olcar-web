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
  fromLabel: {
    type: String,
    default: '指定なし',
  },
  toLabel: {
    type: String,
    default: '指定なし',
  },
})

const from = defineModel<KeyLabel | null>('from')
const to = defineModel<KeyLabel | null>('to')

const onSelect = (type: 'from' | 'to', label: string | null) => {
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
        :label="fromLabel"
        :items="fromItem.map((v) => v.label)"
        @update:model-value="onSelect('from', $event)"
      ></v-select>
      <div>~</div>
      <v-select
        :label="toLabel"
        :items="toItem.map((v) => v.label)"
        @update:model-value="onSelect('to', $event)"
      ></v-select>
    </div>
  </div>
</template>
