<script setup lang="ts">
const prop = defineProps({
  car: {
    type: Object as () => Detail,
    required: true,
  },
})

const emit = defineEmits(['click:goto', 'click:report'])

const keywords = ref<KeywordsText>({ keywords: [] })

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
</script>

<template>
  <div class="tw-m-2">
    <Titles
      :car-id="car.id"
      :name="car.name"
      :maker-name="car.makerName"
      :is-sponsor="car.isSponsor"
    ></Titles>

    <v-carousel height="300">
      <v-carousel-item v-for="(image, i) in car.images" :key="i" :src="image"></v-carousel-item>
    </v-carousel>

    <Price :is-omakase="true" class="tw-my-3" :price="car.price"></Price>
    <div class="tw-text-xs">
      おまかせ代行サービスは購入から納車までおまかせできるサービスです。詳しくは<a
        href="/info/omakase-agent"
        data-v-15e9aab1=""
        >こちら</a
      >
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
    <Item label="販売元" :is-newline="true">
      <div class="tw-m-2 tw-flex">
        <v-img class="tw-w-7 tw-rounded-full" :src="car.userImageUrl"></v-img>

        <div>{{ car.nickName }}</div>
      </div>
    </Item>
    <Item label="説明" :is-newline="true">
      <!--eslint-disable-next-line vue/no-v-html-->
      <div v-html="car.comment"></div>
    </Item>

    <v-alert prominent border="top" type="warning">
      掲載されている情報は正確でない場合や情報が更新されている可能性があります。正しい情報は掲載元ページをご確認ください
    </v-alert>

    <v-btn class="tw-mt-5 tw-w-full" variant="elevated" @click="onGotoPage">掲載ページへ</v-btn>
    <v-btn color="gray" class="tw-mt-5 tw-w-full" @click="onClickReport"
      >公開停止、または問題を報告する</v-btn
    >
    <div v-if="keywords.keywords.length > 0">
      <div
        class="tw-my-3 tw-border-s-8 tw-border-solid tw-border-[#f67b01] tw-pl-1.5 tw-text-base tw-font-bold"
      >
        この車に含まれるキーワード
      </div>

      <div>
        <NuxtLink
          v-for="(keyword, i) in keywords.keywords"
          :key="i"
          :active-class="`/?keywords[]=${keyword}`"
        >
          <v-chip class="tw-mb-2 tw-mr-2" color="#f67b01" small label dark>{{ keyword }}</v-chip>
        </NuxtLink>
      </div>
      <div class="tw-text-xs">※クリックすると検索できます</div>
    </div>
  </div>
</template>

<style scoped>
:deep(.v-overlay__content) {
  width: 100%;
  max-width: 100%;
}
</style>
