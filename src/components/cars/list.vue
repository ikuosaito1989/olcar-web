<script setup lang="ts">
defineProps({
  summary: {
    type: Object as () => Summary,
    required: true,
  },
})
</script>

<template>
  <CarsCard v-for="detail in summary.details" :key="detail.id" :detail="detail"></CarsCard>
</template>
