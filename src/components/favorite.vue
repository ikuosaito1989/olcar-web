<script setup lang="ts">
import dayjs from '~/lib/day'
import { mdiHeart, mdiHeartOutline } from '@mdi/js'
const prop = defineProps({
  carId: {
    type: Number,
    required: true,
  },
})

const { t } = useI18n()

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
const label = computed(() => (isFavorite.value ? t('favorite_added') : t('favorites')))

/**
 * variant
 */
const variant = computed(() => (isFavorite.value ? 'elevated' : 'outlined'))

/**
 * アイコン
 */
const icon = computed(() => (isFavorite.value ? mdiHeart : mdiHeartOutline))

/**
 * お気に入り押下
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, require-jsdoc
const onFavorite = (e: any) => {
  e.preventDefault()

  const storage = localStorageUtil.getItem<LocalStorage>(Constants.LOCALSTORAGE.FAVORITE)
  const item = storage.find((v) => v.id === prop.carId)

  if (prop.carId === 0) {
    return
  }

  if (item) {
    items.value = localStorageUtil.splice<LocalStorage>(Constants.LOCALSTORAGE.FAVORITE, item)
  } else {
    items.value = localStorageUtil.push<LocalStorage>(Constants.LOCALSTORAGE.FAVORITE, {
      id: prop.carId,
      actionAt: dayjs().format(Constants.ISO8601_FORMAT),
    })
  }
}
</script>

<template>
  <v-btn v-if="mounted" :variant="variant" :prepend-icon="icon" @click="onFavorite">
    {{ label }}
  </v-btn>
</template>
