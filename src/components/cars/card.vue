<script setup lang="ts">
import { load } from 'cheerio'

const props = defineProps({
  detail: {
    type: Object as () => DetailBase,
    required: true,
  },
})

const { t } = useI18n()

const imageLoaded = ref(false)
const viewed = ref(false)

const comment = computed(() => load(props.detail.comment.substring(0, 50)).text())

const isPost = computed(() => !props.detail.posted || imageLoaded.value)
const isViewed = computed(() => viewed.value)

/**
 * オーバーレイのメッセージ
 */
const overlayMessage = computed(() => {
  if (isPost.value) {
    return t('soldOut')
  }

  if (isViewed.value) {
    return t('viewed')
  }

  return ''
})

onMounted(async () => {
  const histories = localStorageUtil.getItem<LocalStorage>(Constants.LOCALSTORAGE.HISTORY)
  viewed.value = !!histories.find((v) => v.id === props.detail.id)
})

/**
 * Emitted if the image fails to load.
 */
const onError = () => {
  imageLoaded.value = true
}
</script>

<template>
  <div v-ripple class="tw-relative tw-rounded-lg tw-p-4 tw-shadow-md">
    <div
      v-if="isPost || isViewed"
      class="tw-pointer-events-none tw-absolute tw-inset-0 tw-z-10 tw-flex tw-items-center tw-justify-center tw-bg-black/50"
    >
      <div class="tw-text-lg tw-font-bold tw-text-white">{{ overlayMessage }}</div>
    </div>
    <Anchor :is-under-line="false" :to="`/cars/${detail.id}`">
      <Titles
        :is-sponsor="detail.isSponsor"
        :car-id="detail.id"
        :maker-name="detail.makerName"
        :name="detail.name"
      ></Titles>

      <div class="tw-flex">
        <div class="tw-w-2/4">
          <nuxt-img
            :placeholder="Constants.PLACEHOLDER_IMAGES.IMAGE1_1"
            layout="responsive"
            class="tw-h-64 tw-w-full tw-max-w-sm tw-rounded tw-object-cover"
            :src="detail.images[0]"
            :alt="detail.name"
            format="webp"
            @error="onError"
          />
        </div>
        <div class="tw-ml-2 tw-w-2/4">
          <Price :price="detail.price"></Price>

          <Item :label="$t('mileage')">
            <div>{{ formatUtil.toMileage(detail.mileage, 1, $t('ten_thousand_km')) }}</div>
          </Item>
          <Item :label="$t('vehicleInspection')">
            <div>
              {{
                formatUtil.toLocaleVehicleInspection(
                  detail.vehicleInspection,
                  detail.unknownVehicleInspection,
                  $t('date_format_year_month'),
                  $t('valid'),
                )
              }}
            </div>
          </Item>
          <Item :label="$t('region')">
            <div>{{ formatUtil.toJoinString(detail.prefecture, detail.locality) }}</div>
          </Item>
          <Item :label="$t('description')" :is-new-line="true">
            <div class="tw-line-clamp-2">
              {{ comment }}
            </div>
          </Item>
        </div>
      </div>
    </Anchor>
  </div>
</template>
