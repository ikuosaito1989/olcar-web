<script setup lang="ts">
import type { VTextField } from 'vuetify/components'

const prop = defineProps({
  items: {
    type: Array as () => Array<Item>,
    required: true,
  },
  buttonName: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  chipLabel: {
    type: String,
    default: '',
  },
  rules: {
    type: Array as () => Array<(value: string, message?: string) => string | boolean>,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click:list', 'click:close'])
const currentItems = defineModel<Item[]>('currentItems', { required: true })
const errors = ref({ error: false, message: '' })
const dialog = ref(false)
const key = ref(crypto.randomUUID())

/**
 * リストのアイテムを選択する
 *
 * @param value
 */
const onClick = async (value: { id: unknown; value: boolean; path: unknown[] }) => {
  const item = prop.items.find((v) => v.value === value.id)!
  open()

  if (!prop.multiple) {
    currentItems.value.splice(0, currentItems.value.length)
  }

  arrayUtil.push<Item>(currentItems, [item])
  validate()

  emit('click:list', item)
}

/**
 * ダイアログをcloseする
 */
const onClose = async () => {
  dialog.value = false
  validate()
}

/**
 * chipのcloseボタンを押下する
 */
const onClickChipClose = async (item: Item) => {
  key.value = crypto.randomUUID()
  arrayUtil.splice(currentItems, item)
  validate()
  emit('click:close', item)
}

/**
 * ダイアログをopenする
 */
const open = () => {
  dialog.value = !dialog.value
}

/**
 * バリデーション
 */
const validate = async () => {
  const target = currentItems.value.map((v) => v.value).join('')
  let message: string | boolean = ''
  errors.value.message = ''
  errors.value.error = false

  for (const rule of prop.rules) {
    message = rule(target)
    if (typeof message === 'string') {
      break
    }
  }

  if (typeof message === 'boolean' || !message) {
    return true
  }

  errors.value.message = message
  errors.value.error = !!errors.value.message
  return false
}

defineExpose({
  open,
  validate,
})
</script>

<template>
  <div class="tw-mb-2">
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
      v-if="!!buttonName"
      v-ripple
      :error="errors.error"
      :error-messages="errors.message"
      :placeholder="buttonName"
      type="text"
      readonly
      @click="open"
    ></v-text-field>
    <v-dialog v-model="dialog" transition="scroll-x-transition" fullscreen>
      <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="onClose"></v-btn>

          <v-toolbar-title>{{ title }}</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list :items="items" @click:select="onClick"></v-list>
      </v-card>
    </v-dialog>
    <v-chip
      v-for="(item, i) in currentItems"
      :key="`${key}_${i}`"
      class="tw-m-2"
      closable
      @click:close="onClickChipClose(item)"
    >
      {{ item.title }}
    </v-chip>
  </div>
</template>
