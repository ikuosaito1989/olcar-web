<script setup lang="ts">
import { mdiClose } from '@mdi/js'
const prop = defineProps({
  car: {
    type: Object as () => Detail,
    required: true,
  },
})

const emit = defineEmits(['click:report'])

const keywords = ref<KeywordsText>({ keywords: [] })
const isVisible = ref(false)
const imageLoaded = ref(false)

const comment = computed(() => {
  if (!prop.car.comment) {
    return ''
  }

  const urls = formatUtil.getUrls(prop.car.comment)
  let comment = prop.car.comment
  urls
    .filter((url) => url.includes('https://t.co'))
    .forEach((url) => {
      comment = comment.replace(new RegExp(url, 'g'), '')
    })

  return formatUtil.toLink(comment)
})

const isPost = computed(() => !prop.car.posted || imageLoaded.value)

onMounted(async () => {
  $fetch<KeywordsText>(`/api/v1/keywords/text:keywords`, {
    method: 'POST',
    body: { text: prop.car.comment },
  }).then((keywordsText) => {
    keywords.value = keywordsText
  })
})

/**
 * レポートダイアログを表示する
 */
const onClickReport = () => {
  emit('click:report')
}

/**
 * Emitted if the image fails to load.
 */
const onError = () => {
  imageLoaded.value = true
}
</script>

<template>
  <div class="tw-m-2">
    <Titles
      :car-id="car.id"
      :name="car.name"
      :maker-name="car.makerName"
      :is-sponsor="car.isSponsor"
    ></Titles>

    <v-dialog
      v-model="isVisible"
      class="tw-bg-slate-800"
      max-width="768"
      @click:outside="isVisible = !isVisible"
    >
      <v-carousel hide-delimiters :show-arrows="car.images.length > 1">
        <v-btn
          :icon="mdiClose"
          size="small"
          class="!tw-absolute tw-right-0 tw-top-0 tw-z-10 tw-m-2"
          @click="isVisible = !isVisible"
        ></v-btn>
        <v-carousel-item
          v-for="(item, i) in car.images"
          :key="i"
          :src="item"
          eager
        ></v-carousel-item>
      </v-carousel>
    </v-dialog>
    <v-carousel height="300" hide-delimiters :show-arrows="car.images.length > 1 && !isPost">
      <v-carousel-item
        v-for="(image, i) in car.images"
        :key="i"
        class="tw-bg-slate-800"
        :src="image"
        eager
        @click="isVisible = !isVisible"
        @error="onError"
      ></v-carousel-item>
      <v-overlay
        class="tw-items-center tw-justify-center tw-text-center"
        contained
        persistent
        :disabled="false"
        :model-value="isPost"
      >
        <div class="tw-text-lg tw-font-bold tw-text-white">{{ $t('soldOut') }}</div>
      </v-overlay>
    </v-carousel>

    <Price :is-omakase="true" class="tw-my-3" :price="car.price"></Price>
    <div class="tw-text-xs">
      {{ $t('omakase_service_description') }}
      <Anchor class="tw-font-bold tw-text-[#1976d2]" to="/info/omakase-agent">
        {{ $t('here') }}
      </Anchor>
    </div>
    <Item :label="$t('mileage')">
      <div>{{ formatUtil.toMileage(car.mileage, 0, $t('ten_thousand_km')) }}</div>
    </Item>
    <Item :label="$t('vehicleInspection')">
      <div>
        {{
          formatUtil.toLocaleVehicleInspection(
            car.vehicleInspection,
            car.unknownVehicleInspection,
            $t('date_format_year_month'),
            $t('valid'),
          )
        }}
      </div>
    </Item>

    <Item :label="$t('region')">
      <div>{{ formatUtil.toJoinString(car.prefecture, car.locality) }}</div>
    </Item>
    <Item :label="$t('publishDate')">
      <div>{{ formatUtil.toLocaleDateString(car.createAt, $t('date_format_full')) }}</div>
    </Item>
    <Item :label="$t('seller')">
      <div class="tw-flex tw-items-center">
        <nuxt-img
          :placeholder="Constants.PLACEHOLDER_IMAGES.IMAGE1_1"
          class="tw-w-7"
          :src="car.userImageUrl"
        />
        <div class="tw-mx-1">{{ car.nickName }}</div>
      </div>
    </Item>
    <Item :label="$t('description')" :is-new-line="true">
      <!--eslint-disable-next-line vue/no-v-html-->
      <div class="tw-whitespace-pre-wrap" v-html="comment"></div>
    </Item>

    <v-alert prominent border="top" type="warning">
      {{ $t('advertisingInfo') }}
    </v-alert>

    <v-btn
      class="tw-mt-5 tw-w-full"
      variant="elevated"
      target="_blank"
      :href="car.referenceUrls[0]"
    >
      {{ $t('advertisingPage') }}
    </v-btn>
    <v-btn color="black" class="tw-mb-1 tw-mt-5 tw-w-full" @click="onClickReport">
      {{ $t('reportIssue') }}
    </v-btn>

    <div v-if="keywords.keywords.length > 0">
      <div
        class="tw-my-3 tw-border-s-8 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
      >
        {{ $t('keywordsIncluded') }}
      </div>

      <Anchor
        v-for="(keyword, i) in keywords.keywords"
        :key="i"
        :to="`/?keywords[]=${keyword}`"
        external
      >
        <v-chip v-ripple class="tw-mb-2 tw-mr-2" color="#f67b01" small label dark>
          {{ keyword }}
        </v-chip>
      </Anchor>

      <div class="tw-text-xs">{{ $t('keywordsDescription') }}</div>
    </div>

    <GoogleAd></GoogleAd>
  </div>
</template>

<style scoped>
:deep(.v-overlay__content) {
  width: 100% !important;
  margin: 0 !important;
}
</style>
