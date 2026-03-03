<script setup lang="ts">
const loading = computed(() => useLoader())
</script>

<template>
  <v-dialog v-model="loading.value" persistent width="64">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-dialog>
</template>
