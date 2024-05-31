<template>
  <v-app-bar :elevation="1">
    <template #prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <NuxtLink to="/">
      <v-app-bar-title>Application</v-app-bar-title>
    </NuxtLink>

    <template #append>
      <NuxtLink to="/favorite">
        <v-btn icon="mdi-heart"></v-btn>
      </NuxtLink>
      <NuxtLink to="/history">
        <v-btn icon="mdi-history"></v-btn>
      </NuxtLink>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>
