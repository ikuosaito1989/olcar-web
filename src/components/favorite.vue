<script setup lang="ts">
const prop = defineProps({
  carId: {
    type: Number,
    required: true,
  },
})

const items = ref<LocalStorage[]>(localStorageUtil.getItem('favorite'))

/**
 * ラベル
 */
const label = computed(() =>
  items.value.find((v) => v.id === prop.carId) ? 'お気に入り済' : 'お気に入り',
)

/**
 * お気に入り押下
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, require-jsdoc
const onFavorite = (e: any) => {
  e.preventDefault()
  items.value = localStorageUtil.setItem('favorite', prop.carId)
}
</script>

<template>
  <v-btn @click="onFavorite">{{ label }}</v-btn>
</template>
