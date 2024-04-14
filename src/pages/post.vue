<script setup lang="ts">
import TextArea from '../components/text-area.vue'
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    <div>掲載依頼する</div>
    <v-form class="tw-w-full tw-max-w-3xl">
      <TextField
        label="車種名"
        placeholder="プリウス"
        :counter="10"
        required
        clearable
        type="text"
      ></TextField>

      <TextArea
        label="商品説明"
        placeholder="商品説明"
        hint="1000文字以内で入力してください"
        :counter="10"
        required
        clearable
        type="text"
      ></TextArea>
    </v-form>
  </section>
</template>
