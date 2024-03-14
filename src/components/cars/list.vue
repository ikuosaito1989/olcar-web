<script setup lang="ts">
const { data: summary } = await useFetchCars();
</script>

<template>
  <li v-for="detail in summary.details">
    {{ detail.name }}
  </li>
</template>
