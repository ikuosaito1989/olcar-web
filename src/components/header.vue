<script setup lang="ts">
const drawer = ref(false)
/**
 * ダイアログをopenする
 */
const open = () => {
  drawer.value = !drawer.value
}
</script>
<template>
  <v-app-bar class="!tw-static" theme="light" :elevation="1">
    <template #prepend>
      <v-app-bar-nav-icon color="primary" @click="open"></v-app-bar-nav-icon>
    </template>

    <template #title>
      <a href="/"> <v-img width="130" src="/logo.png" lazy-src="/logo.png" /> </a>
    </template>
    <template #append>
      <v-btn href="/search" icon="mdi-magnify"></v-btn>
      <v-btn href="/favorite" icon="mdi-heart"></v-btn>
      <v-btn href="/history" icon="mdi-history"></v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    class="!tw-top-0 !tw-z-[9999] !tw-h-screen tw-p-2"
    temporary
  >
    <div class="[&>a]:tw-w-full [&>a]:!tw-justify-start [&>a]:tw-text-left">
      <v-btn color="black" href="/" variant="text" prepend-icon="mdi-home">トップ</v-btn>
      <v-btn color="black" href="/search" variant="text" prepend-icon="mdi-magnify">検索</v-btn>
      <v-btn color="black" href="/favorite" variant="text" prepend-icon="mdi-heart-outline"
        >お気に入り</v-btn
      >
      <v-btn color="black" href="/history" variant="text" prepend-icon="mdi-heart-outline"
        >閲覧履歴</v-btn
      >
      <div class="tw-my-2 tw-font-bold tw-text-[#f67b01]">olcarについて</div>
      <v-btn color="black" href="/info/about?ref=s" variant="text">olcarについて</v-btn>
      <v-btn color="black" href="/info/purchase-process?ref=s" variant="text"
        >個人売買の車購入ガイド</v-btn
      >
      <v-btn color="black" href="/info/caution" variant="text">個人売買における詐欺について</v-btn>
      <v-btn color="black" href="https://forms.gle/Q2hQvMqLP9Jw2bea6" target="_blank" variant="text"
        >お問い合わせ</v-btn
      >
      <v-btn
        color="black"
        href="https://festive-yonath-a04e1e.netlify.app/"
        target="_blank"
        variant="text"
        >運営者情報</v-btn
      >
      <div class="tw-my-2 tw-font-bold tw-text-[#f67b01]">olcarのサービス</div>
      <v-btn color="black" href="/info/exhibit" variant="text">閲覧数が増える掲載オプション</v-btn>
      <v-btn color="black" href="/post" variant="text">無料掲載</v-btn>
      <v-btn color="black" href="/info/omakase-agent?ref=s" variant="text"
        >おまかせ代行サービス</v-btn
      >
      <div class="tw-my-2 tw-font-bold tw-text-[#f67b01]">SNS</div>
      <v-btn color="black" target="_blank" href="https://lin.ee/80JiY1r" variant="text">LINE</v-btn>
      <v-btn color="black" target="_blank" href="https://twitter.com/byebye20201a" variant="text"
        >Twitter</v-btn
      >
      <v-btn
        color="black"
        target="_blank"
        href="https://www.youtube.com/channel/UCPONUTjMWhfzaDcM3fzUk4Q"
        variant="text"
        >Youtube</v-btn
      >
      <v-btn color="black" target="_blank" href="https://www.tiktok.com/@olcar2021" variant="text"
        >Tiktok</v-btn
      >
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
:deep(.v-toolbar__content) {
  max-width: 768px;
  margin: auto;
}
:deep(.v-toolbar__content > .v-toolbar-title) {
  margin-inline-start: 0px;
}
</style>
