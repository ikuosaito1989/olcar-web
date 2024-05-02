<script setup lang="ts">
const { prefectureItems, makerItems } = await useFetchMaster()
import type { FileUpload, ListDialog } from '#build/components'
import { useRecaptchaProvider } from 'vue-recaptcha'
import { useGoTo } from 'vuetify'
import type { VForm } from 'vuetify/components'

useRecaptchaProvider()
const goTo = useGoTo()

const formRef = ref<InstanceType<typeof VForm> | null>(null)
const makerRef = ref<InstanceType<typeof ListDialog> | null>(null)
const uploadRef = ref<InstanceType<typeof FileUpload> | null>(null)

const response = ref()
const makers = ref([])
const prefectures = ref([])

/**
 *
 * @param e
 */
const onSubmit = async () => {
  const validate = await formRef.value?.validate()
  await makerRef.value?.validate()
  await uploadRef.value?.validate([])

  if (!validate?.valid) {
    goTo(`.v-messages__message`)
  }
}
</script>

<template>
  <div>
    <div>掲載依頼する</div>

    <v-form ref="formRef" class="tw-w-full tw-max-w-3xl">
      <TextField
        label="車種名"
        placeholder="プリウス"
        :counter="10"
        :rules="[validationUtil.required]"
        required
        clearable
        type="text"
      ></TextField>

      <ListDialog
        ref="makerRef"
        v-model:currentItems="makers"
        title="メーカー選択"
        label="メーカー・車名"
        button-name="メーカー・車名"
        :items="makerItems"
        chip-label="必須"
        :rules="[validationUtil.required]"
      ></ListDialog>

      <FileUpload ref="uploadRef" :rules="[validationUtil.required]"></FileUpload>

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

      <TextField label="走行距離" placeholder="50,000" clearable type="number"></TextField>

      <!-- todo 車検満了 -->
      <FromTo
        label="車検満了"
        :from-item="Constants.YEAR"
        :to-item="Constants.MONTH"
        is-from-label=""
      ></FromTo>

      <ListDialog
        :current-items="prefectures"
        title="都道府県選択"
        label="都道府県"
        button-name="都道府県"
        :items="prefectureItems"
      ></ListDialog>

      <TextField
        :rules="[validationUtil.required]"
        label="市区町村"
        placeholder="横浜市"
        required
        clearable
        type="text"
      ></TextField>

      <RecaptchaCheckbox v-model="response"></RecaptchaCheckbox>

      <v-btn @click="onSubmit">OK</v-btn>
    </v-form>
  </div>
</template>
