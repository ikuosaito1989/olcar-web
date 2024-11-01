<script setup lang="ts">
const drawer = ref(false)
const isRender = ref(false)
/**
 * ダイアログをopenする
 */
const open = () => {
  drawer.value = !drawer.value
}
onMounted(async () => {
  await nextTick() // ページがマウントされてからレンダリング完了を待つ
  isRender.value = true
})
</script>
<template>
  <v-app-bar class="!tw-static" theme="light" :elevation="1">
    <template #prepend>
      <v-app-bar-nav-icon color="primary" @click="open"></v-app-bar-nav-icon>
    </template>

    <template #title>
      <Anchor to="/">
        <div v-ripple>
          <v-img width="130" min-height="33" src="/logo.png" lazy-src="/logo.png" />
        </div>
      </Anchor>
    </template>
    <template #append>
      <Anchor to="/search">
        <v-btn icon="mdi-magnify"></v-btn>
      </Anchor>
      <Anchor to="/favorite">
        <v-btn icon="mdi-heart-outline"></v-btn>
      </Anchor>
      <Anchor to="/history">
        <v-btn icon="mdi-history"></v-btn>
      </Anchor>
    </template>
  </v-app-bar>
  <v-navigation-drawer
    v-if="isRender"
    v-model="drawer"
    class="!tw-top-0 !tw-z-[9999] !tw-h-screen tw-p-2"
    temporary
  >
    <div class="tw-mb-16 [&>a]:tw-w-full [&>a]:!tw-justify-start [&>a]:tw-text-left">
      <v-btn color="black" href="/" variant="text" prepend-icon="mdi-home">トップ</v-btn>
      <v-btn color="black" href="/search" variant="text" prepend-icon="mdi-magnify">検索</v-btn>
      <v-btn color="black" href="/favorite" variant="text" prepend-icon="mdi-heart-outline">
        お気に入り
      </v-btn>
      <v-btn color="black" href="/history" variant="text" prepend-icon="mdi-history">
        閲覧履歴
      </v-btn>
      <div class="tw-my-2 tw-font-bold tw-text-[#f67b01]">olcarについて</div>
      <v-btn color="black" href="/info/about" variant="text">olcarについて</v-btn>
      <v-btn color="black" href="/info/purchase-process" variant="text">
        個人売買の車購入ガイド
      </v-btn>
      <v-btn color="black" href="/info/caution" variant="text">個人売買における詐欺について</v-btn>
      <v-btn
        color="black"
        href="https://forms.gle/Q2hQvMqLP9Jw2bea6"
        target="_blank"
        variant="text"
      >
        お問い合わせ
      </v-btn>
      <v-btn
        color="black"
        href="https://festive-yonath-a04e1e.netlify.app/"
        target="_blank"
        variant="text"
      >
        運営者情報
      </v-btn>
      <div class="tw-my-2 tw-font-bold tw-text-[#f67b01]">olcarのサービス</div>
      <v-btn color="black" href="/info/exhibit" variant="text">閲覧数が増える掲載オプション</v-btn>
      <v-btn color="black" href="/post" variant="text">無料掲載</v-btn>
      <v-btn color="black" href="/info/omakase-agent" variant="text">おまかせ代行サービス</v-btn>
      <div class="tw-my-2 tw-font-bold tw-text-[#f67b01]">SNS</div>
      <v-btn color="black" target="_blank" href="https://lin.ee/80JiY1r" variant="text">LINE</v-btn>
      <v-btn color="black" target="_blank" href="https://twitter.com/byebye20201" variant="text">
        Twitter
      </v-btn>
      <v-btn
        color="black"
        target="_blank"
        href="https://www.youtube.com/channel/UCPONUTjMWhfzaDcM3fzUk4Q"
        variant="text"
      >
        Youtube
      </v-btn>
      <v-btn color="black" target="_blank" href="https://www.tiktok.com/@olcar2021" variant="text">
        Tiktok
      </v-btn>
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
