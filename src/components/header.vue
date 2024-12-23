<script setup lang="ts">
import { mdiMagnify, mdiHeartOutline, mdiHistory, mdiHome } from '@mdi/js'
const drawer = ref(false)
const isRender = ref(false)
/**
 * ダイアログをopenする
 */
const open = () => {
  drawer.value = !drawer.value
}
onMounted(async () => {
  await nextTick()
  isRender.value = true
})
</script>

<template>
  <v-app-bar class="!tw-static" theme="light" :elevation="1">
    <template #prepend>
      <v-app-bar-nav-icon color="primary" @click="open"></v-app-bar-nav-icon>
    </template>

    <template #title>
      <Anchor to="/" :external="true">
        <div v-ripple>
          <nuxt-img
            :placeholder="Constants.PLACEHOLDER_IMAGES.IMAGE1_1"
            layout="responsive"
            class="tw-min-h-8 tw-w-32"
            src="/logo.webp"
          />
        </div>
      </Anchor>
    </template>
    <template #append>
      <Anchor to="/search">
        <v-btn :icon="mdiMagnify"></v-btn>
      </Anchor>
      <Anchor to="/favorite">
        <v-btn :icon="mdiHeartOutline"></v-btn>
      </Anchor>
      <Anchor to="/history">
        <v-btn :icon="mdiHistory"></v-btn>
      </Anchor>
    </template>
  </v-app-bar>
  <v-navigation-drawer
    v-if="isRender"
    v-model="drawer"
    class="!tw-top-0 !tw-z-[9999] !tw-h-screen tw-p-2"
    temporary
    touchless
  >
    <div class="tw-mb-16 [&>a]:tw-w-full [&>a]:!tw-justify-start [&>a]:tw-text-left">
      <v-btn color="black" href="/" variant="text" :prepend-icon="mdiHome">{{ $t('home') }}</v-btn>
      <v-btn color="black" href="/search" variant="text" :prepend-icon="mdiMagnify">
        {{ $t('search') }}
      </v-btn>
      <v-btn color="black" href="/favorite" variant="text" :prepend-icon="mdiHeartOutline">
        {{ $t('favorites') }}
      </v-btn>
      <v-btn color="black" href="/history" variant="text" :prepend-icon="mdiHistory">
        {{ $t('history') }}
      </v-btn>
      <div class="tw-my-2 tw-font-bold tw-text-[#f67b01]">{{ $t('aboutOlcar') }}</div>
      <v-btn color="black" href="/info/about" variant="text">{{ $t('aboutOlcarLink') }}</v-btn>
      <v-btn color="black" href="/info/purchase-process" variant="text">
        {{ $t('purchaseGuide') }}
      </v-btn>
      <v-btn color="black" href="/info/caution" variant="text">{{ $t('fraudWarning') }}</v-btn>
      <v-btn
        color="black"
        href="https://forms.gle/Q2hQvMqLP9Jw2bea6"
        target="_blank"
        variant="text"
      >
        {{ $t('contactUs') }}
      </v-btn>
      <v-btn
        color="black"
        href="https://festive-yonath-a04e1e.netlify.app/"
        target="_blank"
        variant="text"
      >
        {{ $t('aboutUs') }}
      </v-btn>
      <div class="tw-my-2 tw-font-bold tw-text-[#f67b01]">{{ $t('olcarServices') }}</div>
      <v-btn color="black" href="/info/exhibit" variant="text">{{ $t('exhibitOption') }}</v-btn>
      <v-btn color="black" href="/post" variant="text">{{ $t('freeListing') }}</v-btn>
      <v-btn color="black" href="/info/omakase-agent" variant="text">
        {{ $t('omakaseService') }}
      </v-btn>
      <div class="tw-my-2 tw-font-bold tw-text-[#f67b01]">{{ $t('socialMedia') }}</div>
      <v-btn color="black" target="_blank" href="https://lin.ee/80JiY1r" variant="text">
        {{ $t('line') }}
      </v-btn>
      <v-btn color="black" target="_blank" href="https://twitter.com/byebye20201" variant="text">
        {{ $t('twitter') }}
      </v-btn>
      <v-btn
        color="black"
        target="_blank"
        href="https://www.youtube.com/channel/UCPONUTjMWhfzaDcM3fzUk4Q"
        variant="text"
      >
        {{ $t('youtube') }}
      </v-btn>
      <v-btn color="black" target="_blank" href="https://www.tiktok.com/@olcar2021" variant="text">
        {{ $t('tiktok') }}
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
