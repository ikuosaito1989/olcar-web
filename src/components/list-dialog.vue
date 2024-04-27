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
  validation: {
    type: [String, String] as PropType<'required'>,
    default: undefined,
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

watch(
  currentItems,
  async () => {
    if (!prop.validation) {
      return
    }

    errors.value.message = !currentItems.value?.length ? '必須入力です' : ''
    errors.value.error = !!errors.value.message
  },
  {
    deep: true,
  },
)

/**
 * リストのアイテムを選択する
 *
 * @param value
 */
const onClick = async (value: { id: unknown; value: boolean; path: unknown[] }) => {
  const item = prop.items.find((v) => v.value === value.id)!
  open()
  arrayUtil.push(currentItems.value, [item])
  emit('click:list', item)
}

/**
 * ダイアログをcloseする
 */
const onClose = async () => {
  dialog.value = false
  // @note watchを動かすためにpushを利用している
  arrayUtil.push(currentItems.value, currentItems.value)
}

/**
 * chipのcloseボタンを押下する
 */
const onClickChipClose = async (item: Item) => {
  key.value = crypto.randomUUID()
  arrayUtil.splice(currentItems.value, item)
  emit('click:close', item)
}

/**
 * ダイアログをopenする
 */
const open = () => {
  if (!prop.multiple && currentItems.value.length > 0) {
    return
  }

  dialog.value = !dialog.value
}

defineExpose({
  open,
})
</script>

<template>
  <div>
    <div v-if="!!label">{{ label }}</div>
    <div v-if="!!chipLabel">{{ chipLabel }}</div>
    <v-text-field
      v-if="!!buttonName"
      :error="errors.error"
      :error-messages="errors.message"
      :label="buttonName"
      type="text"
      readonly
      @click="open"
    ></v-text-field>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="onClose"></v-btn>

          <v-toolbar-title>{{ title }}</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list :items="items" @click:select="onClick"></v-list>
      </v-card>
    </v-dialog>
    {{ currentItems }}
    <v-chip
      v-for="(item, i) in currentItems"
      :key="`${key}_${i}`"
      closable
      @click:close="onClickChipClose(item)"
    >
      {{ item.title }}
    </v-chip>
  </div>
</template>
