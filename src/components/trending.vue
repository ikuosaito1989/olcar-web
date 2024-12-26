<script setup lang="ts">
import { mdiFire, mdiClose, mdiLinkVariant } from '@mdi/js'
import dayjs from '~/lib/day'

const trends = ref<DetailBase[]>(
  Array.from(
    { length: 20 },
    () =>
      ({
        images: [Constants.PLACEHOLDER_IMAGES.IMAGE1_1],
      }) as DetailBase,
  ),
)

const trendsContainer = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)
const carouselIndex = ref(0)
const errorCarIds = ref<Set<number>>(new Set([]))
const viewedCarIds = ref<Set<number>>(new Set([]))
const progress = ref(0)
const timer = ref<NodeJS.Timeout>()

onMounted(async () => {
  // @note 1週間前のデータを削除、保存されたデータを閲覧済みに設定
  localStorageUtil.removeOlderThan(Constants.LOCALSTORAGE.TREND, 7)
  const storage = localStorageUtil.getItem<LocalStorage>(Constants.LOCALSTORAGE.TREND)
  viewedCarIds.value = new Set([...viewedCarIds.value, ...storage.map((v) => v.id)])

  const trendSummary: Summary = await $fetch<Summary>('/api/v1/cars/trend')
  // @note 閲覧済みを後ろにソートする
  trendSummary.details.sort((a, b) => {
    // eslint-disable-next-line require-jsdoc
    const has = (id: number) => (viewedCarIds.value.has(id) ? 1 : 0)
    return has(a.id) - has(b.id)
  })
  trends.value = trendSummary.details
})

onUnmounted(async () => {
  await clearProgress(carouselIndex.value)
})

/**
 * Emitted if the image fails to load.
 */
const onError = (id: number) => {
  errorCarIds.value.add(id)
  trends.value = trends.value.filter((v) => !errorCarIds.value.has(v.id))
}

/**
 * Dialogを開く
 * @param carId
 */
const onOpen = async (carId: number) => {
  isVisible.value = !isVisible.value
  const index = trends.value.findIndex((v) => v.id === carId)
  await resetProgress(index)
}

/**
 * カルーセルを変更する
 * @param index
 */
const onChangeCarousel = async (index: number) => {
  await resetProgress(index)
}

/**
 * 詳細画面へ遷移する
 * @param index
 */
const onNavigate = async (carId: number) => {
  onClose()
  await navigateTo(`/cars/${carId}`)
}

/**
 * Dialogを閉じる
 */
const onClose = async () => {
  isVisible.value = !isVisible.value
  await clearProgress(carouselIndex.value)
  if (trendsContainer.value) {
    trendsContainer.value.scrollLeft = carouselIndex.value * 98 - 98
  }
}

/**
 * 進捗を再設定する
 * @param index
 */
const resetProgress = async (index: number) => {
  await clearProgress(index)
  setProgress()
  setViewedCarIds(trends.value[index].id)
}

/**
 * 進捗を開始する
 */
const setProgress = () => {
  const updateInterval = 5000 / 100

  timer.value = setInterval(async () => {
    // @note 100に到達したように見せるため遊びを持たせる
    if (progress.value >= 110) {
      carouselIndex.value =
        carouselIndex.value + 1 > trends.value.length - 1 ? 0 : carouselIndex.value + 1
      await onChangeCarousel(carouselIndex.value)
      return
    }
    progress.value += 1
  }, updateInterval)
}

/**
 * 進捗をリセットする
 * @param index
 */
const clearProgress = async (index: number) => {
  clearInterval(timer.value)
  timer.value = undefined
  carouselIndex.value = index
  progress.value = 0
  // @note プログレスバーが戻り切らないためスリープする
  await timerUtil.sleep(200)
}

/**
 * 閲覧済みのCarIdをローカルストレージに設定する
 */
const setViewedCarIds = (carId: number) => {
  if (viewedCarIds.value.has(carId)) {
    return
  }

  localStorageUtil.push<LocalStorage>(Constants.LOCALSTORAGE.TREND, {
    id: carId,
    actionAt: dayjs().format(Constants.ISO8601_FORMAT),
  })
  viewedCarIds.value.add(carId)
}
</script>

<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div class="tw-my-2 tw-ml-1">
    <v-dialog v-model="isVisible" class="tw-bg-slate-800" max-width="768" @click:outside="onClose">
      <v-progress-linear
        class="tw-mb-2"
        color="#f67b01"
        :model-value="progress"
        :height="2"
      ></v-progress-linear>
      <v-btn
        :icon="mdiClose"
        size="small"
        class="!tw-absolute tw-right-0 tw-top-0 tw-z-10 tw-m-2"
        @click="onClose"
      ></v-btn>
      <v-carousel
        v-model="carouselIndex"
        hide-delimiters
        :show-arrows="false"
        @update:model-value="onChangeCarousel"
      >
        <v-carousel-item v-for="(item, i) in trends" :key="i" eager>
          <div class="tw-relative tw-h-full tw-w-full">
            <nuxt-img
              class="tw-block tw-h-full tw-w-full tw-object-contain tw-object-center"
              :src="item.images[0]"
            />
          </div>
          <div class="!tw-absolute tw-left-0 tw-top-0 tw-z-10 tw-m-2 tw-rotate-[-10deg] tw-p-2">
            <div
              class="tw-w-fit tw-rounded-xl tw-bg-white tw-p-1 tw-text-3xl tw-font-bold tw-text-[#bc4c00] tw-opacity-80"
            >
              {{ item.name }}
            </div>
            <Price
              :is-omakase="false"
              class="tw-w-fit tw-rounded-xl tw-bg-white tw-p-1 tw-opacity-80"
              :price="item.price"
            ></Price>
          </div>

          <v-btn
            size="large"
            variant="elevated"
            class="!tw-absolute tw-bottom-0 tw-left-1/2 tw-z-10 tw-m-1 -tw-translate-x-1/2 tw-transform !tw-font-bold"
            @click="onNavigate(item.id)"
          >
            <v-icon class="tw-mr-2" color="white">{{ mdiLinkVariant }}</v-icon>
            {{ $t('see_more_details') }}
          </v-btn>
        </v-carousel-item>
      </v-carousel>
    </v-dialog>

    <div class="tw-mx-1 tw-mb-2 tw-flex tw-items-center tw-text-base tw-font-bold">
      <v-icon class="" color="primary">{{ mdiFire }}</v-icon>
      <div>{{ $t('trending') }}</div>
    </div>

    <div
      ref="trendsContainer"
      class="content tw-flex tw-h-28 tw-overflow-auto tw-whitespace-nowrap"
    >
      <div v-for="(car, i) in trends" :key="i">
        <div
          :class="[
            'tw-mr-2 tw-h-[90px] tw-w-[90px] tw-shrink-0 tw-rounded-full tw-p-1',
            !viewedCarIds.has(car.id)
              ? 'tw-bg-gradient-to-br tw-from-[#f67b01] tw-to-[#eaf601]'
              : '',
          ]"
          @click="onOpen(car.id)"
        >
          <nuxt-img
            class="tw-h-[82px] tw-w-[82px] tw-rounded-full tw-bg-white tw-object-cover"
            :src="car.images[0]"
            @error="onError(car.id)"
          />
          <div class="tw-my-2 tw-truncate tw-text-center tw-text-xs">{{ car.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content::-webkit-scrollbar {
  display: none;
}
:deep(.v-overlay__content) {
  width: 100% !important;
}
</style>
