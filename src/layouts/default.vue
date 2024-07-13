<template>
  <v-app
    class="tw-m-auto tw-box-border tw-whitespace-pre-wrap tw-break-all tw-font-sans tw-text-sm tw-leading-6 tw-tracking-tight tw-antialiased"
  >
    <Header></Header>

    <v-container>
      <div class="tw-m-auto tw-max-w-screen-md">
        <slot />
      </div>
    </v-container>

    <Footer></Footer>
    <Loader></Loader>
  </v-app>
</template>

<style>
* {
  text-transform: none !important;
}

:deep(.v-container) {
  padding: 0;
}
</style>
