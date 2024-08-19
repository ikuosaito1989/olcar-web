<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: 'mdi-car',
  },
  label: {
    type: String,
    default: '無料掲載する',
  },
  to: {
    type: String,
    default: '/post',
  },
})
</script>

<template>
  <v-fab elevation="3" :to="to" color="primary" icon="mdi-car" size="78px" app>
    <div class="tw-text-center">
      <v-icon size="32px">{{ icon }}</v-icon>
      <div class="tw-text-[10px] tw-font-bold tw-tracking-normal">{{ label }}</div>
    </div>
  </v-fab>
</template>
