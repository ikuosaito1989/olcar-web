<script setup lang="ts">
const props = defineProps({
  price: {
    type: [Number, null] as PropType<number | null>,
    required: true,
  },
})
</script>

<template>
  <div>
    <div>希望価格</div>
    <div>
      <div>
        {{ format.toTenThousand(props.price) }}
      </div>
      <div>万円</div>
    </div>
  </div>
</template>
