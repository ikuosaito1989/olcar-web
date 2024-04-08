<script setup lang="ts">
const route = useRoute()

const { data: car } = await useFetchi<Detail>(`/api/v1/cars/${route.params.id}`)
const keywords = ref<KeywordsText>({ keywords: [] })
onMounted(async () => {
  keywords.value = await $fetch<KeywordsText>(`/api/v1/keywords/text:keywords`, {
    method: 'POST',
    body: { text: car.value.comment },
  })
})
/**
 * 掲載ページへ遷移する
 */
const onSubmit = () => {
  window.open(car.value.referenceUrls[0], '_blank', 'noreferrer')
}
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    <v-card-subtitle>{{ car.makerName }}</v-card-subtitle>
    <v-card-title>{{ car.name }}</v-card-title>

    <v-img :src="car.images[0]"></v-img>
    <Price :price="car.price"></Price>

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
      <div>{{ formatUtil.toArea(car.prefecture, car.locality) }}</div>
    </Item>
    <Item label="公開日">
      <div>{{ formatUtil.toLocaleDateString(car.createAt) }}</div>
    </Item>
    <Item label="販売元">
      <div>
        <v-avatar size="36px">
          <v-img :src="car.userImageUrl"></v-img>
        </v-avatar>
        <div>{{ car.nickName }}</div>
      </div>
    </Item>
    <Item label="説明">
      <!--eslint-disable-next-line vue/no-v-html-->
      <div v-html="car.comment"></div>
    </Item>

    <v-alert type="warning">
      掲載されている情報は正確でない場合や情報が更新されている可能性があります。正しい情報は掲載元ページをご確認ください
    </v-alert>

    <v-btn @click="onSubmit">掲載ページへ</v-btn>
    <v-btn>公開停止、または問題を報告する</v-btn>
    <div v-if="keywords.keywords.length > 0">
      <div>この車に含まれるキーワード</div>

      <div>
        <a v-for="(keyword, i) in keywords.keywords" :key="i" :href="`/?keywords[]=${keyword}`">
          <v-chip color="#f67b01" small label dark>{{ keyword }}</v-chip>
        </a>
      </div>
      <div>※クリックすると検索できます</div>
    </div>
  </section>
</template>
