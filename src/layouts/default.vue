<template>
  <v-app class="tw-font-mono">
    <Header></Header>

    <div class="tw-m-2 tw-flex tw-min-h-svh tw-items-center tw-justify-center tw-pt-16">
      <slot />
    </div>

    <Footer></Footer>
    <Loader></Loader>
  </v-app>
</template>
