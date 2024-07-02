<script setup lang="ts">
defineProps({
  price: {
    type: [Number, null] as PropType<number | null>,
    required: true,
  },
})
</script>

<template>
  <div class="tw-text-xs">
    <div>希望価格</div>
    <div class="tw-flex tw-items-baseline">
      <div class="tw-mr-1 tw-text-3xl tw-font-bold tw-text-[#bc4c00]">
        {{ formatUtil.toTenThousand(price) }}
      </div>
      <div>万円</div>
    </div>
  </div>
</template>
