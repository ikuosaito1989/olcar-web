<script setup lang="ts">
import GoogleAd from '../google-ad.vue'

defineProps({
  details: {
    type: Array as () => Array<DetailBase>,
    required: true,
  },
})
</script>

<template>
  <div v-for="(detail, index) in details" :key="detail.id">
    <CarsCard :detail="detail"></CarsCard>

    <div v-if="(index + 1) % 5 === 0">
      <GoogleAd></GoogleAd>
    </div>

    <div v-if="index + 1 === 5 || index + 1 === 15">
      <Banner src="/banner/line.webp" href="/info/line"></Banner>
      <Banner
        src="https://homepage.gsss.pro/wp-content/uploads/2023/08/1a7321fd5c87b44161456ab0d5bcbbaf-1.png"
        href="/info/omakase-agent"
      ></Banner>
    </div>

    <div v-if="index + 1 === 10 || index + 1 === 20">
      <Banner href="/post" src="/banner/exhibit-free.webp"></Banner>
    </div>
  </div>
</template>
