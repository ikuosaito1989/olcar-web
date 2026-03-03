<script setup lang="ts">
defineProps({
  carId: {
    type: Number,
    default: undefined,
  },
  makerName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isSponsor: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div class="tw-mb-1 tw-flex tw-items-center tw-justify-between">
    <div>
      <div class="tw-text-xs tw-opacity-65">{{ makerName }}</div>
      <div class="tw-text-xl tw-font-bold">{{ name }}</div>
    </div>
    <div>
      <div v-if="isSponsor" class="tw-mb-1">
        <v-chip variant="elevated">{{ $t('recommended') }}</v-chip>
      </div>
      <Favorite v-if="carId" :car-id="carId"></Favorite>
    </div>
  </div>
</template>
