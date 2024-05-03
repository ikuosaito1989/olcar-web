<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { VFileInput } from 'vuetify/components'

const prop = defineProps({
  rules: {
    type: Array as () => Array<
      | ((value: File[], message?: string) => string | boolean)
      | ((value: File[], maxSize?: number, message?: string) => string | boolean)
    >,
    default: () => [],
  },
})

const fileRef = ref<InstanceType<typeof VFileInput> | null>(null)
const currentItems = defineModel<FileUpload[]>('currentItems', { required: true })
const errors = ref({ error: false, message: '' })

/**
 * URLを生成する
 * @param file
 */
const createObjectURL = (file: File) => URL.createObjectURL(file)

/**
 * ドラッグからファイルを追加する
 * @param e
 */
const onDrag = (e: any) => {
  addImages(e.dataTransfer.files)
}

/**
 * inputタグからファイルを追加する
 * @param e
 */
const onAdd = (e: any) => {
  addImages(e.target.files)
}

/**
 * 画像を削除する
 */
const onDelete = async (file: File) => {
  arrayUtil.splice(currentItems, file)
  validate()
}

/**
 * 画像を追加する
 */
const addImages = async (fileList: FileList) => {
  fileRef.value?.reset()
  const _files = Array.from(fileList).map((file: File) => file)
  arrayUtil.pushFile(currentItems, _files, { maxLength: 3 })
  validate()
}

/**
 * バリデーション
 *
 * @param files
 */
const validate = async () => {
  let message: string | boolean = ''
  errors.value.message = ''
  errors.value.error = false

  for (const rule of prop.rules) {
    message = rule(currentItems.value)
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
  validate,
})
</script>

<template>
  <div>
    <label
      class="tw-block tw-min-h-32 tw-w-full tw-bg-slate-100"
      @dragover.prevent
      @drop.prevent="onDrag"
    >
      <v-icon> mdi-image-plus </v-icon>
      <div>画像を追加する</div>
      <v-file-input
        ref="fileRef"
        accept=".png, .jpg, .jpeg"
        multiple
        :error="errors.error"
        :error-messages="errors.message"
        @change="onAdd"
      ></v-file-input>
    </label>
    <div v-for="file in currentItems" :key="file.name">
      <v-btn @click="onDelete(file)"><v-icon>mdi-close</v-icon></v-btn>
      <v-img contain :src="createObjectURL(file)">
        <template #placeholder>
          <v-progress-circular indeterminate></v-progress-circular>
        </template>
      </v-img>
    </div>
  </div>
</template>
<style scoped>
:deep(.v-input__prepend) {
  display: none;
}
:deep(.v-input__control) {
  display: none;
}
</style>
