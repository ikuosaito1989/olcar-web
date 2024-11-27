<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
const props = defineProps({
  detail: {
    type: Object as () => DetailBase,
    required: true,
  },
})

const { t } = useI18n()

const imageLoaded = ref(false)
const viewed = ref(false)

const comment = computed(() => props.detail.comment.substring(0, 50))

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
 * {@link https://vuetifyjs.com/en/api/v-img/#events}
 */
const onError = () => {
  imageLoaded.value = true
}
</script>

<template>
  <div v-ripple class="tw-p-4 tw-shadow-md">
    <Anchor :is-under-line="false" :to="`/cars/${detail.id}`">
      <Titles
        :is-sponsor="detail.isSponsor"
        :car-id="detail.id"
        :maker-name="detail.makerName"
        :name="detail.name"
      ></Titles>

      <div class="tw-flex tw-items-center">
        <div class="tw-w-2/4">
          <v-img
            class="tw-rounded"
            height="220"
            :src="detail.images[0]"
            lazy-src="/datachef_unicolor.webp"
            @error="onError"
          >
            <v-overlay
              class="tw-items-center tw-justify-center tw-text-center"
              contained
              persistent
              :disabled="false"
              :model-value="isPost || isViewed"
            >
              <div class="tw-text-lg tw-font-bold tw-text-white">{{ overlayMessage }}</div>
            </v-overlay>
          </v-img>
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
            <!--eslint-disable-next-line vue/no-v-html-->
            <div class="tw-line-clamp-2" v-html="comment"></div>
          </Item>
        </div>
      </div>
    </Anchor>
  </div>
</template>

<style scoped>
:deep(.v-img__img--contain) {
  object-fit: cover;
}
</style>
