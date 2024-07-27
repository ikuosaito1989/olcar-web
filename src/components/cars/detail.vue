<script setup lang="ts">
const prop = defineProps({
  car: {
    type: Object as () => Detail,
    required: true,
  },
})

const emit = defineEmits(['click:goto', 'click:report'])

const keywords = ref<KeywordsText>({ keywords: [] })
const isVisible = ref(false)
const imageLoaded = ref(false)

const comment = computed(() => {
  if (!prop.car.comment) {
    return ''
  }

  const urls = formatUtil.getUrls(prop.car.comment)
  // eslint-disable-next-line no-irregular-whitespace
  let comment = prop.car.comment.replace(/　/g, '<br>')
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
 * 掲載ページへ遷移する
 */
const onGotoPage = () => {
  emit('click:goto')
}

/**
 * レポートダイアログを表示する
 */
const onClickReport = () => {
  emit('click:report')
}

/**
 * Emitted if the image fails to load.
 * {@link https://vuetifyjs.com/en/api/v-img/#events}
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
      <v-carousel height="auto" hide-delimiters :show-arrows="car.images.length > 1">
        <v-btn
          icon="mdi-close"
          size="small"
          variant="elevated"
          class="!tw-absolute tw-right-0 tw-top-0 tw-z-10 tw-m-2"
          @click="isVisible = !isVisible"
        ></v-btn>
        <v-carousel-item
          v-for="(item, i) in car.images"
          :key="i"
          reverse-transition="scroll-x-transition"
          transition="scroll-x-transition"
        >
          <v-img max-height="100vh" contain height="auto" :src="item" />
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
    <v-carousel height="300" hide-delimiters :show-arrows="car.images.length > 1 && !isPost">
      <v-carousel-item
        v-for="(image, i) in car.images"
        :key="i"
        class="tw-bg-slate-800"
        :src="image"
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
        <div class="tw-text-lg tw-font-bold tw-text-white">販売終了しました</div>
      </v-overlay>
    </v-carousel>

    <Price :is-omakase="true" class="tw-my-3" :price="car.price"></Price>
    <div class="tw-text-xs"
      >おまかせ代行サービスは購入から納車までおまかせできるサービスです。詳しくは
      <Anchor class="tw-font-bold tw-text-[#1976d2]" to="/info/omakase-agent">こちら</Anchor>
    </div>
    <Item label="走行距離">
      <div>{{ formatUtil.toMileage(car.mileage) }}</div>
    </Item>
    <Item label="車検">
      <div>
        {{
          formatUtil.toLocaleVehicleInspection(car.vehicleInspection, car.unknownVehicleInspection)
        }}
      </div>
    </Item>

    <Item label="地域">
      <div>{{ formatUtil.toJoinString(car.prefecture, car.locality) }}</div>
    </Item>
    <Item label="公開日">
      <div>{{ formatUtil.toLocaleDateString(car.createAt) }}</div>
    </Item>
    <Item label="販売元">
      <div class="tw-flex tw-items-center">
        <v-img class="tw-w-7 tw-rounded-full" :src="car.userImageUrl"></v-img>

        <div class="tw-mr-1">{{ car.nickName }}</div>
      </div>
    </Item>
    <Item label="説明" :is-new-line="true">
      <!--eslint-disable-next-line vue/no-v-html-->
      <div v-html="comment"></div>
    </Item>

    <v-alert prominent border="top" type="warning"
      >掲載されている情報は正確でない場合や情報が更新されている可能性があります。正しい情報は掲載元ページをご確認ください
    </v-alert>

    <v-btn class="tw-mt-5 tw-w-full" variant="flat" @click="onGotoPage">掲載ページへ</v-btn>
    <v-btn color="black" class="tw-mb-1 tw-mt-5 tw-w-full" @click="onClickReport"
      >公開停止、または問題を報告する</v-btn
    >
    <div v-if="keywords.keywords.length > 0">
      <div
        class="tw-my-3 tw-border-s-8 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
      >
        この車に含まれるキーワード
      </div>

      <div>
        <Anchor v-for="(keyword, i) in keywords.keywords" :key="i" :to="`/?keywords[]=${keyword}`">
          <v-chip class="tw-mb-2 tw-mr-2" color="#f67b01" small label dark>{{ keyword }}</v-chip>
        </Anchor>
      </div>
      <div class="tw-text-xs">※クリックすると検索できます</div>
    </div>
  </div>
</template>

<style scoped>
:deep(.v-overlay__content) {
  width: 100% !important;
  margin: 0 !important;
}
</style>
