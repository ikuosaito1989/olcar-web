<script setup lang="ts">
const props = defineProps({
  price: {
    type: [Number, null] as PropType<number | null>,
    required: true,
  },
  isOmakase: {
    type: Boolean,
    default: false,
  },
})

const omakasePrice = computed(() => (props.price ? props.price + 30000 : 0))
</script>

<template>
  <div class="tw-flex tw-text-xs">
    <div>
      <div class="tw-font-bold">{{ $t('desiredPrice') }}</div>
      <div class="tw-flex tw-items-baseline">
        <div class="tw-mr-1 tw-text-3xl tw-font-bold tw-text-[#bc4c00]">
          {{ formatUtil.toTenThousand(price) }}
        </div>
        <div>{{ $t('tenThousandYen') }}</div>
      </div>
    </div>
    <div v-if="isOmakase" class="tw-ml-3">
      <div class="tw-font-bold">{{ $t('omakaseService') }}</div>
      <div class="tw-flex tw-items-baseline">
        <div class="tw-mr-1 tw-mt-2 tw-text-xl tw-font-bold tw-text-[#f67b01]">
          {{ formatUtil.toTenThousand(omakasePrice) }}
        </div>
        <div>{{ $t('tenThousandYen') }}</div>
      </div>
    </div>
  </div>
</template>
