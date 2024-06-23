<template>
  <v-app
    class="tw-m-auto tw-box-border tw-max-w-screen-md tw-break-all tw-font-sans tw-text-sm tw-tracking-tight tw-antialiased"
  >
    <Header></Header>

    <div class="">
      <slot />
    </div>

    <Footer></Footer>
    <Loader></Loader>
  </v-app>
</template>
