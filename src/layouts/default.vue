<script setup lang="ts">
import { useRecaptchaProvider } from 'vue-recaptcha'
useRecaptchaProvider()
</script>

<template>
  <v-app
    class="tw-m-auto tw-box-border tw-break-all tw-font-sans tw-text-sm tw-leading-normal tw-tracking-tight tw-antialiased"
  >
    <Header></Header>

    <v-container>
      <div class="tw-m-auto tw-max-w-screen-md">
        <slot />
      </div>
    </v-container>

    <GoogleAd></GoogleAd>

    <Concept></Concept>
    <Footer></Footer>
    <Loader></Loader>
  </v-app>
</template>

<style>
* {
  text-transform: none !important;
}
</style>
<style scoped>
:deep(.v-container) {
  padding: 0;
}
</style>
