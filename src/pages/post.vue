<script setup lang="ts">
import { useGoTo } from 'vuetify'
import type PostEdit from '~/components/post/edit.vue'

const goTo = useGoTo()
const mode = ref<'edit' | 'preview'>('edit')
const editRef = ref<InstanceType<typeof PostEdit> | null>(null)

const formData = ref<PostFrom>({
  carName: '',
  makers: [],
  prefectures: [],
  locality: '',
  files: [],
  description: '',
  price: '',
  userName: '',
  link: '',
  email: '',
  mileage: '',
  vehicleInspection: {},
})
const car = ref<Detail>({} as Detail)
const isComplete = ref(false)
const isConfirm = ref(false)

/**
 * プレビューモード
 */
const onClickPreview = async () => {
  convertCar(formData.value)
  goTo(0)
  mode.value = 'preview'
}

/**
 * この内容で掲載依頼する
 */
const onConfirm = async () => {
  isConfirm.value = false
  convertCar(formData.value)
  const data: Review = {
    name: car.value.name,
    makerId: car.value.makerId,
    files: formData.value.files,
    comment: car.value.comment,
    price: car.value.price,
    nickName: car.value.userName,
    referenceUrls: car.value.referenceUrls,
    email: formData.value.email,
    mileage: car.value.mileage,
    vehicleInspection: car.value.vehicleInspection,
    prefecture: car.value.prefecture,
    locality: car.value.locality,
  }

  const form = new FormData()
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value[0] instanceof File) {
      value.forEach((v) => form.append(key, v))
      continue
    }
    form.append(key, value)
  }

  await $fetch<Review>(`/api/v1/cars/review`, {
    method: 'POST',
    body: form,
  })

  isComplete.value = true
}

/**
 * 掲載ページへ遷移する
 */
const onComplete = () => {
  isComplete.value = false
  goTo(0)
  editRef.value?.reset()
}

/**
 * プレビューモードを終了する
 */
const onExitPreview = async () => {
  goTo(0)
  mode.value = 'edit'
}

/**
 *
 * @param formData
 */
const convertCar = (formData: PostFrom) => {
  const vehicleInspection =
    formData.vehicleInspection.year?.key && formData.vehicleInspection.month?.key
      ? formatUtil.toFirstDate(
          formData.vehicleInspection.year.key as number,
          formData.vehicleInspection.month.key as number,
        )
      : ''

  car.value = {
    id: 0,
    name: formData.carName,
    price: Number(formData.price),
    mileage: Number(formData.mileage),
    vehicleInspection: vehicleInspection,
    unknownVehicleInspection: !!formData.vehicleInspection.month?.key,
    posted: true,
    makerId: formData.makers[0].value as number,
    makerName: formData.makers[0].title,
    images: formData.files.map((v) => URL.createObjectURL(v)),
    createAt: '2024-05-01T00:00:00.404Z',
    comment: formData.description,
    prefecture: formData.prefectures.length ? formData.prefectures[0].title : '',
    locality: formData.locality,
    isSponsor: false,
    published: false,
    userName: formData.userName,
    nickName: formData.userName,
    userImageUrl: '/logo_small.jpg',
    socialType: Constants.SOCIAL_TYPE.JMTY,
    socialId: '9999999999',
    referenceUrls: [formData.link],
  }
}
useHead(headUtil.seo('掲載依頼する'))
</script>

<template>
  <section class="tw-m-2">
    <div v-if="mode === 'edit'">
      <PostEdit
        ref="editRef"
        v-model:form-data="formData"
        @click:preview="onClickPreview"
        @click:confirm="isConfirm = true"
      ></PostEdit>
    </div>
    <div v-if="mode === 'preview'">
      <div class="tw-sticky tw-top-4 tw-z-50">
        <v-btn size="large" class="tw-w-full !tw-bg-white" @click="onExitPreview">
          プレビューを終了する
        </v-btn>
      </div>
      <CarsDetail :car="car"></CarsDetail>
    </div>

    <v-dialog v-model="isConfirm" width="400">
      <v-card class="!tw-p-4">
        <div class="tw-text-center">
          <div class="tw-m-4">
            <v-icon size="x-large" color="success">mdi-check-outline</v-icon>
          </div>
          <div class="tw-m-2 tw-font-bold">この内容で掲載依頼しますか？</div>
        </div>
        <div class="tw-my-2 tw-text-sm">
          入力した内容を変更できませんが、この内容でよろしいですか？また、審査により入力内容が変更されることがあります。
        </div>
        <div class="tw-mt-2 tw-text-center">
          <v-btn class="tw-mr-2" @click="isConfirm = false">キャンセル</v-btn>
          <v-btn variant="elevated" @click="onConfirm">掲載依頼する</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isComplete" width="400">
      <v-card class="!tw-p-4">
        <div class="tw-text-center">
          <div class="tw-m-4">
            <v-icon size="x-large" color="success">mdi-check-outline</v-icon>
          </div>
          <div class="tw-m-2 tw-font-bold">掲載の申し込みを承りました</div>
        </div>
        <div class="tw-text-sm">
          olcar（オルカー）の審査を行います。審査結果については1~3営業日以内に審査結果をメールアドレスにお送りしますので今しばらくお待ち下さい
        </div>
        <div class="tw-mt-3 tw-text-center tw-text-sm" @click="onComplete">閉じる</div>
      </v-card>
    </v-dialog>
  </section>
</template>
