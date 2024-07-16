<script setup lang="ts">
const emit = defineEmits(['click:confirm', 'click:preview'])
const { prefectureItems, makerItems } = await useFetchMaster()
import type { FileUpload, ListDialog, Recaptcha } from '#build/components'
import { useGoTo } from 'vuetify'
import type { VForm } from 'vuetify/components'

const goTo = useGoTo()

const formRef = ref<InstanceType<typeof VForm> | null>(null)
const makerRef = ref<InstanceType<typeof ListDialog> | null>(null)
const uploadRef = ref<InstanceType<typeof FileUpload> | null>(null)
const recaptchaRef = ref<InstanceType<typeof Recaptcha> | null>(null)
const elementIds = {
  makerDialog: 'maker-dialog',
  uploadDialog: 'upload-dialog',
  recaptchaDialog: 'recaptcha-dialog',
}
const formData = defineModel<PostEdit>('formData', { required: true })

/**
 * この内容で掲載依頼する押下
 */
const onConfirm = async () => {
  if (!(await validate())) {
    return
  }

  if (!recaptchaRef.value?.validate()) {
    goTo(`#${elementIds.recaptchaDialog}`, { offset: -60 })
    return
  }

  emit('click:confirm', formData.value)
}

/**
 * プレビュー押下
 */
const onClickPreview = async () => {
  if (!(await validate())) {
    return
  }

  formData.value.recaptcha = undefined
  emit('click:preview', formData.value)
}

/**
 * バリデーション
 */
const validate = async () => {
  const validate = await formRef.value?.validate()
  const makerValid = await makerRef.value?.validate()
  const uploadResult = await uploadRef.value?.validate()

  let ids: (HTMLElement | null)[] = []

  if (!validate?.valid) {
    ids = validate?.errors.map((v) =>
      document.getElementById(v.id as string),
    ) as (HTMLElement | null)[]
  }

  if (!makerValid) {
    ids.push(document.getElementById(elementIds.makerDialog))
  }

  if (!uploadResult) {
    ids.push(document.getElementById(elementIds.uploadDialog))
  }

  if (ids.length === 0) {
    return true
  }

  const rect = ids.map((v) => ({ id: v?.id, rect: v?.getBoundingClientRect() }))
  const sortRect = rect.sort((a, b) => ((a.rect?.top as number) > (b.rect?.top as number) ? 1 : -1))

  goTo(`#${sortRect[0].id}`, { offset: -30 })
  return false
}
</script>

<template>
  <div>
    <div class="tw-my-4 tw-border-b tw-pb-3 tw-text-center tw-text-xl tw-font-bold">
      掲載依頼する
    </div>
    <v-form ref="formRef" class="tw-w-full">
      <TextField
        v-model:text="formData.carName"
        label="車種名"
        placeholder="プリウス"
        :counter="30"
        :rules="[validationUtil.required]"
        chip-label="必須"
        clearable
        type="text"
        hint="「プリウス」等の車種名を記入してください"
      ></TextField>

      <ListDialog
        :id="elementIds.makerDialog"
        ref="makerRef"
        v-model:current-items="formData.makers"
        title="メーカー選択"
        label="メーカー・車名"
        button-name="メーカー・車名"
        :items="makerItems"
        chip-label="必須"
        :rules="[validationUtil.required]"
      ></ListDialog>

      <FileUpload
        :id="elementIds.uploadDialog"
        ref="uploadRef"
        v-model:current-items="formData.files"
        :rules="[validationUtil.requiredFile, validationUtil.maxFileSize]"
      ></FileUpload>

      <TextArea
        v-model:text="formData.description"
        label="商品説明"
        placeholder="商品説明"
        hint="1000文字以内で入力してください"
        :counter="1000"
        chip-label="必須"
        clearable
        :rules="[validationUtil.required]"
      ></TextArea>

      <TextField
        v-model:text="formData.price"
        label="価格"
        placeholder="500,000"
        chip-label="必須"
        clearable
        type="number"
        :rules="[
          validationUtil.required,
          (v) => validationUtil.max(+v, 10000000, '円以内にしてください'),
        ]"
      ></TextField>

      <TextField
        v-model:text="formData.userName"
        label="ユーザー名"
        placeholder="オルカー"
        chip-label="必須"
        clearable
        type="text"
        :counter="30"
        :rules="[validationUtil.required]"
      ></TextField>

      <TextField
        v-model:text="formData.link"
        label="掲載ページのリンク"
        placeholder="https://example.com"
        chip-label="必須"
        clearable
        type="text"
        :counter="1000"
        :rules="[validationUtil.required, validationUtil.url]"
      ></TextField>

      <TextField
        v-model:text="formData.email"
        label="メールアドレス"
        placeholder="support@ol-car.com"
        chip-label="必須"
        clearable
        type="text"
        :counter="256"
        :rules="[validationUtil.required, validationUtil.email]"
      ></TextField>

      <TextField
        v-model:text="formData.mileage"
        label="走行距離"
        placeholder="50,000"
        clearable
        type="number"
        :rules="[(v) => validationUtil.max(+v, 500000, 'km以内にしてください')]"
      ></TextField>

      <FromTo
        v-model:from="formData.vehicleInspection.year"
        v-model:to="formData.vehicleInspection.month"
        label="車検満了"
        :from-item="Constants.YEAR"
        :to-item="Constants.MONTH"
        is-from-label=""
        placeholder-from="年"
        placeholder-to="月"
      ></FromTo>

      <ListDialog
        :current-items="formData.prefectures"
        title="都道府県選択"
        label="都道府県"
        button-name="都道府県"
        :items="prefectureItems"
      ></ListDialog>

      <TextField
        v-model:text="formData.locality"
        label="市区町村"
        placeholder="横浜市"
        chip-label="必須"
        clearable
        type="text"
        :counter="30"
      ></TextField>

      <Recaptcha
        :id="elementIds.recaptchaDialog"
        ref="recaptchaRef"
        v-model:recaptcha="formData.recaptcha"
      ></Recaptcha>

      <v-btn
        size="large"
        prepend-icon="mdi-eye-outline"
        class="tw-mb-4 tw-w-full"
        @click="onClickPreview"
        >プレビュー</v-btn
      >
      <v-btn variant="elevated" size="large" class="tw-w-full" @click="onConfirm"
        >この内容で掲載依頼する</v-btn
      >
    </v-form>
  </div>
</template>
