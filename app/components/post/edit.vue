<script setup lang="ts">
const emit = defineEmits(['click:confirm', 'click:preview'])
const { prefectureItems, makerItems } = await useFetchMaster()
import type { FileUpload, ListDialog, Recaptcha } from '#build/components'
import { useGoTo } from 'vuetify'
import type { VForm } from 'vuetify/components'
import { mdiEyeOutline } from '@mdi/js'

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
const formData = defineModel<PostFrom>('formData', { required: true })

/**
 * この内容で掲載依頼する押下
 */
const onConfirm = async () => {
  if (!(await validate())) {
    return
  }

  if (!(await recaptchaRef.value?.validate())) {
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

/**
 *
 */
const reset = () => {
  formRef.value?.reset()
  formData.value.files = []
  formData.value.makers = []
  formData.value.prefectures = []
  formData.value.recaptcha = undefined
}

// eslint-disable-next-line vue/no-expose-after-await
defineExpose({
  reset,
})
</script>

<template>
  <div>
    <div class="tw-my-4 tw-border-b tw-pb-3 tw-text-center tw-text-xl tw-font-bold">
      {{ $t('submitRequest') }}
    </div>
    <div class="tw-rounded tw-bg-[#f5f5f6] tw-p-4">
      <Banner href="/info/exhibit" src="/banner/exhibit.webp"></Banner>
      <br />
      {{ $t('inputInfo') }}
      {{ $t('reviewProcess') }}
      {{ $t('additionalOptions') }}
    </div>
    <v-form ref="formRef" class="tw-w-full">
      <TextField
        v-model:text="formData.carName"
        :label="$t('carModel')"
        :placeholder="$t('exampleModel')"
        :counter="30"
        :rules="[(v) => validationUtil.required(v, $t('required_field'))]"
        :chip-label="$t('required')"
        clearable
        type="text"
        :hint="$t('hintCarModel')"
      ></TextField>

      <ListDialog
        :id="elementIds.makerDialog"
        ref="makerRef"
        v-model:current-items="formData.makers"
        :title="$t('makerSelection')"
        :label="$t('makerOrModel')"
        :button-name="$t('manufacturerOrCarName')"
        :items="makerItems"
        :chip-label="$t('required')"
        :rules="[(v) => validationUtil.required(v, $t('required_field'))]"
      ></ListDialog>

      <FileUpload
        :id="elementIds.uploadDialog"
        ref="uploadRef"
        v-model:current-items="formData.files"
        :rules="[
          (v: File[]) => validationUtil.requiredFile(v, $t('required_field')),
          (v: File[]) => validationUtil.maxFileSize(v, 10000000, $t('input_image_within_limit')),
        ]"
      ></FileUpload>

      <TextArea
        v-model:text="formData.description"
        :label="$t('productDescription')"
        :placeholder="$t('productDescriptionExample')"
        :hint="$t('hintDescription')"
        :counter="1000"
        :chip-label="$t('required')"
        clearable
        :rules="[(v) => validationUtil.required(v, $t('required_field'))]"
      ></TextArea>

      <TextField
        v-model:text="formData.price"
        :label="$t('price')"
        :placeholder="$t('examplePrice')"
        :chip-label="$t('required')"
        clearable
        type="tel"
        :rules="[
          (v) => validationUtil.required(v, $t('required_field')),
          (v: string | number) => validationUtil.max(+v, 10000000, $t('within_currency_limit')),
        ]"
      ></TextField>

      <TextField
        v-model:text="formData.userName"
        :label="$t('userName')"
        :placeholder="$t('exampleUserName')"
        :chip-label="$t('required')"
        :hint="$t('hintUserName')"
        clearable
        type="text"
        :counter="30"
        :rules="[(v) => validationUtil.required(v, $t('required_field'))]"
      ></TextField>

      <TextField
        v-model:text="formData.link"
        :label="$t('listingPageLink')"
        :placeholder="$t('exampleUrl')"
        :chip-label="$t('required')"
        clearable
        type="text"
        :hint="$t('hintUrl')"
        :counter="1000"
        :rules="[
          (v) => validationUtil.required(v, $t('required_field')),
          (v) => validationUtil.url(v, $t('enter_valid_url')),
        ]"
      ></TextField>

      <TextField
        v-model:text="formData.email"
        :label="$t('emailAddress')"
        placeholder="support@ol-car.com"
        :chip-label="$t('required')"
        clearable
        type="email"
        :hint="$t('hintEmail')"
        :counter="256"
        :rules="[
          (v) => validationUtil.required(v, $t('required_field')),
          (v) => validationUtil.email(v, $t('enter_valid_email')),
        ]"
      ></TextField>

      <TextField
        v-model:text="formData.mileage"
        :label="$t('mileage')"
        :placeholder="$t('exampleMileage')"
        clearable
        type="tel"
        :rules="[(v: string | number) => validationUtil.max(+v, 500000, $t('within_km_limit'))]"
      ></TextField>

      <FromTo
        v-model:from="formData.vehicleInspection.year"
        v-model:to="formData.vehicleInspection.month"
        :label="$t('vehicleInspectionExpiry')"
        :from-item="Constants.YEAR"
        :to-item="Constants.MONTH"
        is-from-label=""
        :placeholder-from="$t('year')"
        :placeholder-to="$t('month')"
      ></FromTo>

      <ListDialog
        :current-items="formData.prefectures"
        :title="$t('prefectureSelection')"
        :label="$t('prefecture')"
        :button-name="$t('prefecture')"
        :items="prefectureItems"
      ></ListDialog>

      <TextField
        v-model:text="formData.locality"
        :label="$t('locality')"
        :placeholder="$t('exampleLocality')"
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
        :prepend-icon="mdiEyeOutline"
        class="tw-mb-4 tw-w-full"
        @click="onClickPreview"
      >
        {{ $t('preview') }}
      </v-btn>
      <v-btn variant="elevated" size="large" class="tw-w-full" @click="onConfirm">
        {{ $t('submitListingRequest') }}
      </v-btn>
    </v-form>
  </div>
</template>
