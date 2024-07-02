<script setup lang="ts">
defineProps({
  detail: {
    type: Object as () => DetailBase,
    required: true,
  },
})
</script>

<template>
  <div class="tw-p-4 tw-shadow">
    <NuxtLink :to="`/cars/${detail.id}`">
      <Titles
        :is-sponsor="detail.isSponsor"
        :car-id="detail.id"
        :maker-name="detail.makerName"
        :name="detail.name"
      ></Titles>

      <div class="tw-flex tw-items-center">
        <div class="tw-w-2/4">
          <v-img class="tw-rounded" max-height="220" :src="detail.images[0]"></v-img>
        </div>
        <div class="tw-ml-2 tw-w-2/4">
          <Price :price="detail.price"></Price>

          <Item label="走行距離">
            <div>{{ formatUtil.toMileage(detail.mileage) }}</div>
          </Item>
          <Item label="車検">
            <div>
              {{
                formatUtil.toLocaleVehicleInspection(
                  detail.vehicleInspection,
                  detail.unknownVehicleInspection,
                )
              }}
            </div>
          </Item>
          <Item label="地域">
            <div>{{ formatUtil.toJoinString(detail.prefecture, detail.locality) }}</div>
          </Item>
          <Item label="説明" :is-newline="true">
            <!--eslint-disable-next-line vue/no-v-html-->
            <div v-html="detail.comment"></div>
          </Item>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
:deep(.v-img__img--contain) {
  object-fit: cover;
}
</style>
