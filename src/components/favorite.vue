<script setup lang="ts">
const prop = defineProps({
  carId: {
    type: Number,
    required: true,
  },
})

const items = ref<LocalStorage[]>([])
const mounted = ref<boolean>(false)
onMounted(async () => {
  items.value = localStorageUtil.getItem<LocalStorage>(Constants.LOCALSTORAGE.FAVORITE)
  mounted.value = true
})

/**
 * お気に入り済か？
 */
const isFavorite = computed(() => !!items.value.find((v) => v.id === prop.carId))

/**
 * ラベル
 */
const label = computed(() => (isFavorite.value ? 'お気に入り済' : 'お気に入り'))

/**
 * お気に入り押下
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, require-jsdoc
const onFavorite = (e: any) => {
  e.preventDefault()
  const func = isFavorite.value
    ? localStorageUtil.splice<LocalStorage>
    : localStorageUtil.push<LocalStorage>
  items.value = func(Constants.LOCALSTORAGE.FAVORITE, { id: prop.carId })
}
</script>

<template>
  <v-btn v-if="mounted" @click="onFavorite">{{ label }}</v-btn>
</template>
