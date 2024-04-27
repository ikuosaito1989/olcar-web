<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
const currentFiles = ref<File[]>([])

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
const onDelete = (file: File) => {
  arrayUtil.splice(currentFiles.value, file)
}

/**
 * 画像を追加する
 */
const addImages = (fileList: FileList) => {
  const files = Array.from(fileList).map((file: File) => file)
  const images = files.filter((v) => v.size <= 10000000).map((v) => v)
  arrayUtil.push(currentFiles.value, images, { maxLength: 3 })
}
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
      <input class="tw-hidden" type="file" accept=".png, .jpg, .jpeg" multiple @change="onAdd" />
    </label>
    <div>必須入力です。</div>
    <div v-for="file in currentFiles" :key="file.name">
      <v-btn @click="onDelete(file)"><v-icon>mdi-close</v-icon></v-btn>
      <v-img contain :src="createObjectURL(file)">
        <template #placeholder>
          <v-progress-circular indeterminate></v-progress-circular>
        </template>
      </v-img>
    </div>
  </div>
</template>
