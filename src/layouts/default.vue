<template>
  <v-app
    class="tw-m-auto tw-box-border tw-break-all tw-font-sans tw-text-sm tw-leading-6 tw-tracking-tight tw-antialiased"
  >
    <Header></Header>

    <div class="tw-m-auto tw-max-w-screen-md">
      <slot />
    </div>

    <Footer></Footer>
    <Loader></Loader>
  </v-app>
</template>

<style scoped>
:deep(.v-btn) {
  text-transform: none;
}
</style>
