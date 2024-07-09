<template>
  <v-app-bar class="!tw-static" theme="light" :elevation="1">
    <template #prepend>
      <v-app-bar-nav-icon color="primary"></v-app-bar-nav-icon>
    </template>

    <template #title>
      <NuxtLink to="/"> <v-img width="130" src="/logo.png" /> </NuxtLink>
    </template>
    <template #append>
      <NuxtLink to="/search">
        <v-btn icon="mdi-magnify"></v-btn>
      </NuxtLink>
      <NuxtLink to="/favorite">
        <v-btn icon="mdi-heart"></v-btn>
      </NuxtLink>
      <NuxtLink to="/history">
        <v-btn icon="mdi-history"></v-btn>
      </NuxtLink>
    </template>
  </v-app-bar>
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
