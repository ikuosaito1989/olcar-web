<script setup lang="ts">
import type { VTextField } from 'vuetify/components'
import { toHiragana, toKatakana, toRomaji } from 'wanakana'
import { mdiMagnify, mdiClose } from '@mdi/js'

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
  hint: {
    type: String,
    default: '',
  },
  isTwoWayBindingEnabled: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['click:list', 'click:close'])

const { t } = useI18n()

const currentItems = defineModel<Item[]>('currentItems', { required: true })
const errors = ref({ error: false, message: '' })
const dialog = ref(false)
const key = ref(crypto.randomUUID())
const _items = ref(prop.items)

watch(
  () => prop.items,
  () => {
    resetItems()
  },
)

/**
 * リストのアイテムを選択する
 *
 * @param value
 */
const onClick = async (item: Item) => {
  open()

  if (!prop.multiple) {
    currentItems.value.splice(0, currentItems.value.length)
  }

  if (prop.isTwoWayBindingEnabled && !currentItems.value.find((v) => +v.value === +item.value)) {
    arrayUtil.push<Item>(currentItems, [item])
  }

  validate()
  resetItems()
  emit('click:list', item)
}

/**
 * ダイアログをcloseする
 */
const onClose = async () => {
  dialog.value = false
  resetItems()
  validate()
  emit('click:close')
}

/**
 * chipのcloseボタンを押下する
 */
const onClickChipClose = async (item: Item) => {
  key.value = crypto.randomUUID()
  arrayUtil.splice(currentItems, item)
  validate()
}

/**
 * ダイアログをopenする
 */
const open = () => {
  resetItems()
  dialog.value = !dialog.value
}

/**
 * 検索テキストを更新する
 */
const update = (value: string) => {
  if (!value) {
    resetItems()
    return
  }

  const prefectures =
    prop.label === t('prefecture')
      ? Array.from(Constants.PREFECTURES.entries())
          .filter(([, hiragana]) => hiragana.startsWith(value))
          .map(([kanji]) => kanji)
      : []

  _items.value = prop.items.filter((v) => {
    const isPrefectureFound = prefectures.length ? !!prefectures.find((p) => p == v.title) : false
    return (
      v.title.startsWith(toHiragana(value)) ||
      v.title.startsWith(toKatakana(value)) ||
      v.title.toUpperCase().startsWith(toRomaji(value).toUpperCase()) ||
      v.title.toUpperCase().startsWith(value.toUpperCase()) ||
      isPrefectureFound
    )
  })
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

/**
 * itemsをリセットする
 */
const resetItems = () => {
  _items.value = prop.items
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
    <v-dialog v-model="dialog" transition="slide-x-reverse-transition" fullscreen>
      <v-card v-if="dialog">
        <v-toolbar color="primary">
          <v-btn color="white" :icon="mdiClose" @click="onClose"></v-btn>

          <v-toolbar-title>{{ title }}</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <TextField
          :icon="mdiMagnify"
          :hint="hint"
          :persistent-hint="true"
          required
          clearable
          type="text"
          @update="update"
        ></TextField>

        <v-virtual-scroll :items="_items">
          <template #default="{ item }">
            <v-list-item :key="item.value" @click="onClick(item)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-virtual-scroll>
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
