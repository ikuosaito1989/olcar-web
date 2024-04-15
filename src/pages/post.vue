<script setup lang="ts">
const { prefectures, makers } = await useFetchMaster()
import { useRecaptchaProvider } from 'vue-recaptcha'

useRecaptchaProvider()

const response = ref()

const onClickList = () => {}
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

      <ListDialog
        title="メーカー選択"
        label="メーカー・車名"
        button-name="メーカー・車名"
        :items="makers"
        required
        @click:list="onClickList()"
      ></ListDialog>
      <!-- todo chipsに統一する -->

      <!-- todo 商品画像 -->

      <TextArea
        label="商品説明"
        placeholder="商品説明"
        hint="1000文字以内で入力してください"
        :counter="10"
        required
        clearable
      ></TextArea>

      <TextField label="価格" placeholder="500,000" required clearable type="number"></TextField>

      <TextField
        label="ユーザー名"
        placeholder="オルカー"
        required
        clearable
        type="text"
      ></TextField>

      <TextField
        label="掲載ページのリンク"
        placeholder="https://example.com"
        required
        clearable
        type="text"
      ></TextField>

      <TextField
        label="メールアドレス"
        placeholder="support@ol-car.com"
        required
        clearable
        type="text"
      ></TextField>

      <!-- todo 車検満了 -->

      <ListDialog
        title="都道府県選択"
        label="都道府県"
        button-name="都道府県"
        :items="prefectures"
        @click:list="onClickList()"
      ></ListDialog>

      <TextField label="市区町村" placeholder="横浜市" required clearable type="text"></TextField>

      <RecaptchaCheckbox v-model="response"></RecaptchaCheckbox>
    </v-form>
  </section>
</template>
