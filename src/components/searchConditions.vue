<script setup lang="ts">
defineProps({
  conditions: {
    type: Array as () => Array<string>,
    required: true,
  },
})
</script>

<template>
  <div v-if="conditions.length" class="tw-mx-4 tw-mt-4">
    <div class="tw-mb-2 tw-font-bold">{{ $t('searchCriteria') }}</div>
    <div class="tw-flex tw-flex-wrap">
      <div
        v-for="(condition, i) in conditions"
        :key="`maker_${i}`"
        class="tw-pb-3 tw-pr-3 tw-font-bold"
      >
        <v-chip variant="elevated">
          {{ condition }}
        </v-chip>
      </div>
    </div>
  </div>
</template>
