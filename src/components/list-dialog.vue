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
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click:list'])
const currentItem = defineModel<Item[]>('currentItem', { required: true })
const errors = ref({ error: false, message: '' })
const dialog = ref(false)

watch(currentItem, async () => {
  errors.value.message = !currentItem.value?.length ? '必須入力です' : ''
  errors.value.error = !!errors.value.message
})

/**
 * リストのアイテムを選択する
 *
 * @param value
 */
const onClick = async (value: { id: unknown; value: boolean; path: unknown[] }) => {
  const item = prop.items.find((v) => v.value === value.id)!
  open()
  currentItem.value.push(item)
  currentItem.value = [...new Set(currentItem.value)]

  emit('click:list', item)
}

/**
 * ダイアログをcloseする
 */
const onClose = async () => {
  dialog.value = false
  currentItem.value.push(...currentItem.value)
  currentItem.value = [...new Set(currentItem.value)]
}

/**
 * ダイアログをopenする
 */
const open = () => {
  dialog.value = !dialog.value
}

defineExpose({
  open,
})
</script>

<template>
  <div>
    <div v-if="!!label">{{ label }}</div>
    <div v-if="required">必須</div>
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
  </div>
</template>
