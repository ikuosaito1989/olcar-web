<script setup lang="ts">
const { data: summary } = await useFetchi<Summary>('/api/v1/cars')
</script>

<template>
  <CarsCard v-for="detail in summary.details" :key="detail.id" :detail="detail"></CarsCard>
</template>
