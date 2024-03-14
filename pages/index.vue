<script setup lang="ts">
const zipcode = ref('')
const rules = ref([
  (value: string) => {
    if (!value.length) {
      return '郵便番号を入力してください'
    }
    return true
  },
])

const { data: postcode, refresh } = await useFetchi<PostCode>('/api/postcodes/1000011.json')

const fetch = async () => {
  postcode.value = await $fetch<PostCode>(`/api/postcodes/${zipcode.value}.json`)
}

const address = computed(() => {
  const v = postcode.value
  return v.prefecture + v.city + v.suburb
})
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    <div>住所：{{ address }}</div>
    <v-text-field v-model="zipcode" :rules="rules" label="Zip Code"></v-text-field>
    <v-btn class="tw-mr-1" color="primary" prepend-icon="$vuetify" @click="fetch">検索</v-btn>
    <v-btn class="tw-mr-1" color="secondary" prepend-icon="$vuetify" @click="refresh()">
      初期化
    </v-btn>
  </section>
</template>
