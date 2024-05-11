<script setup lang="ts">
const mode = ref<'edit' | 'preview'>('edit')
const car = ref<Detail>({} as Detail)

/**
 * プレビューモード
 */
const onClickPreview = async (formData: PostEdit) => {
  convertCar(formData)
  mode.value = 'preview'
}

/**
 * dafd
 */
const onSubmit = async (formData: PostEdit) => {
  convertCar(formData)
  const request: Review = {
    name: car.value.name,
    makerId: car.value.makerId,
    files: formData.files,
    comment: car.value.comment,
    price: car.value.price,
    nickName: car.value.userName,
    referenceUrls: car.value.referenceUrls,
    email: this.form.email,
    mileage: this.form.mileages,
    vehicleInspection: this.form.vehicleInspection.value,
    prefecture: this.form.prefecture.key ? this.form.prefecture.value : '',
    locality: this.form.locality,
  }
  await WaitHelper.wait(async () => {
    if (await CarsRepository.review(request)) {
      ;(this.$refs.info as any).isVisible = true
    }
  })
}

/**
 * 掲載ページへ遷移する
 */
const onGotoPage = () => {
  window.open(car.value.referenceUrls[0], '_blank', 'noreferrer')
}

/**
 * プレビューモードを終了する
 */
const onExitPreview = async () => {
  mode.value = 'edit'
}

/**
 *
 * @param formData
 */
const convertCar = (formData: PostEdit) => {
  const vehicleInspection =
    formData.vehicleInspection.year?.key && formData.vehicleInspection.month?.key
      ? formData.vehicleInspection.year.key.toString() +
        formData.vehicleInspection.month.key.toString()
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
    createAt: '2023-01-01T00:00:00.404Z',
    comment: formData.description,
    prefecture: formData.prefectures.length ? formData.prefectures[0].title : '',
    locality: formData.locality,
    isSponsor: false,
    published: false,
    userName: '',
    nickName: formData.userName,
    userImageUrl: '/logo_small.jpg',
    socialType: Constants.SOCIAL_TYPE.JMTY,
    socialId: '9999999999',
    referenceUrls: [formData.link],
  }
}
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    <div v-if="mode === 'edit'">
      <PostEdit @click:preview="onClickPreview"></PostEdit>
    </div>
    <div v-if="mode === 'preview'">
      <v-btn @click="onExitPreview">プレビューを終了する</v-btn>
      <CarsDetail :car="car" @click:goto="onGotoPage"></CarsDetail>
    </div>
  </section>
</template>
