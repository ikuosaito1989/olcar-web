<script setup lang="ts">
const dialog = ref(false)
defineProps({
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
const emit = defineEmits(['emitTest'])
const test = async (value: any) => {
  emit('emitTest')
  console.log(value)
}

const open = async () => {
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
        <v-list :items="items" @click:open="test" @click:select="test"></v-list>
      </v-card>
    </v-dialog>
  </div>
</template>
