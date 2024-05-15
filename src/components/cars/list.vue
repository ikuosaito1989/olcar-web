<script setup lang="ts">
defineProps({
  details: {
    type: Array as () => Array<DetailBase>,
    required: true,
  },
})
</script>

<template>
  <CarsCard v-for="detail in details" :key="detail.id" :detail="detail"></CarsCard>
</template>
