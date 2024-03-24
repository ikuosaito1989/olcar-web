<script setup lang="ts">
const prop = defineProps({
  items: {
    type: Array as () => Array<Item>,
    required: true,
  },
  buttonName: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click:list'])

const dialog = ref(false)

/**
 * リストのアイテムを選択する
 *
 * @param value
 */
const onClick = async (value: { id: unknown; value: boolean; path: unknown[] }) => {
  const item = prop.items.find((v) => v.value === value.id)
  open()
  emit('click:list', item)
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
    <v-btn v-if="!!buttonName" @click="open">{{ buttonName }}</v-btn>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>

          <v-toolbar-title>{{ title }}</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list :items="items" @click:select="onClick"></v-list>
      </v-card>
    </v-dialog>
  </div>
</template>
