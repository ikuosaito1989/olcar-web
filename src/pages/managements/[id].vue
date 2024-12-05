<script setup lang="ts">
import { mdiCheckOutline } from '@mdi/js'
/**
 * Modalのメッセージ
 */
const MODAL = {
  pass: {
    title: '合格させますか？',
    message: '合格通知を送信しました。掲載されているか確認してください',
  },
  reject: { title: '不合格にしますか？', message: '不合格通知を送信しました。' },
  unPublish: { title: '公開停止しますか？', message: '公開停止しました。' },
  unPost: { title: '掲載停止しますか？', message: '掲載停止しました。' },
}

const { makerItems } = await useFetchMaster()
const route = useRoute()
const { data: car } = await useFetchi<Detail>(`/api/v1/cars/${route.params.id}`, {
  query: {
    withUser: true,
    isAll: true,
  },
})

const formData = ref<ManagementsEdit>({
  carName: car.value.name,
  makers: [{ title: car.value.makerName, value: car.value.makerId }],
  description: car.value.comment,
  price: car.value.price?.toString() as string,
  link: car.value.referenceUrls[0],
  mileage: car.value.mileage?.toString() as string,
  isSponsor: car.value.isSponsor,
  vehicleInspection: car.value.vehicleInspection as string,
})

const isVisible = ref<boolean>(false)
const label = ref<string>('')
const message = ref<string>('')
const isComplete = ref<boolean>(false)

/**
 * 更新
 */
const onClickUpdate = async () => {
  const data: Update = {
    id: car.value.id,
    name: formData.value.carName,
    price: formData.value.price,
    mileage: formData.value.mileage,
    vehicleInspection: formatUtil.toIso8601(formData.value.vehicleInspection),
    unknownVehicleInspection: car.value.unknownVehicleInspection,
    comment: formData.value.description,
    makerName: formData.value.makers[0].title,
    published: car.value.published,
    isSponsor: formData.value.isSponsor,
  }

  await $fetchByApiKey<Update>(`/api/v1/cars`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * ステータスを更新する
 */
const onClickStatus = async (key: keyof typeof MODAL) => {
  label.value = MODAL[key].title
  isVisible.value = true
}

/**
 * 許可する
 */
const onClickAction = async (action: boolean) => {
  isVisible.value = false
  if (!action) {
    return
  }

  switch (label.value) {
    case MODAL.pass.title: {
      const data: Passed = { accessKey: route.params.id as string }
      await $fetchByApiKey<Passed>(`/api/v1/cars/passed`, {
        method: 'POST',
        body: data,
      })
      message.value = MODAL.pass.message
      break
    }
    case MODAL.reject.title: {
      const data: Reject = { accessKey: route.params.id as string }
      await $fetchByApiKey<Reject>(`/api/v1/cars/reject`, {
        method: 'POST',
        body: data,
      })
      message.value = MODAL.reject.message
      break
    }
    case MODAL.unPublish.title: {
      const data: UnPublish = { carId: +route.params.id }
      await $fetchByApiKey<UnPublish>(`/api/v1/cars/unpublish`, {
        method: 'POST',
        body: data,
      })
      message.value = MODAL.unPublish.message
      break
    }
    case MODAL.unPost.title: {
      const data: UnPost = { carId: +route.params.id }
      await $fetchByApiKey<UnPost>(`/api/v1/cars/unpost`, {
        method: 'POST',
        body: data,
      })
      message.value = MODAL.unPost.message
    }
  }

  isComplete.value = true
}
</script>

<template>
  <section>
    <CarsDetail :car="car"></CarsDetail>

    <v-form ref="formRef">
      <TextField
        v-model:text="formData.carName"
        label="車種名"
        placeholder="プリウス"
        :counter="30"
        :rules="[(v) => validationUtil.required(v, $t('required_field'))]"
        required
        clearable
        type="text"
      ></TextField>

      <ListDialog
        ref="makerRef"
        v-model:current-items="formData.makers"
        title="メーカー選択"
        label="メーカー・車名"
        button-name="メーカー・車名"
        :items="makerItems"
        chip-label="必須"
        :rules="[(v) => validationUtil.required(v, $t('required_field'))]"
      ></ListDialog>

      <TextArea
        v-model:text="formData.description"
        label="商品説明"
        placeholder="商品説明"
        hint="1000文字以内で入力してください"
        :counter="1000"
        required
        clearable
        :rules="[(v) => validationUtil.required(v, $t('required_field'))]"
      ></TextArea>

      <TextField
        v-model:text="formData.vehicleInspection"
        label="車検"
        placeholder="2024/09/04"
        clearable
      ></TextField>

      {{ formData.vehicleInspection }}
      <TextField
        v-model:text="formData.price"
        label="価格"
        placeholder="500,000"
        required
        clearable
        type="number"
        :rules="[
          (v) => validationUtil.required(v, $t('required_field')),
          (v: string | number) => validationUtil.max(+v, 10000000, '円以内にしてください'),
        ]"
      ></TextField>

      <TextField
        v-model:text="formData.link"
        label="掲載ページのリンク"
        placeholder="https://example.com"
        required
        clearable
        type="text"
        :counter="1000"
        :rules="[
          (v) => validationUtil.required(v, $t('required_field')),
          (v) => validationUtil.url(v, $t('enter_valid_url')),
        ]"
      ></TextField>

      <TextField
        v-model:text="formData.mileage"
        label="走行距離"
        placeholder="50,000"
        clearable
        type="number"
        :rules="[
          (v: string | number) => validationUtil.max(+v, 10000000, $t('within_currency_limit')),
        ]"
      ></TextField>

      <v-checkbox v-model="formData.isSponsor" label="オススメ"></v-checkbox>

      <v-btn @click="onClickUpdate">更新</v-btn>

      <v-btn @click="onClickStatus('unPost')">掲載停止する</v-btn>
      <v-btn @click="onClickStatus('unPublish')">公開停止する</v-btn>
      <v-btn @click="onClickStatus('reject')">却下する</v-btn>
      <v-btn @click="onClickStatus('pass')">許可する</v-btn>

      <v-dialog v-model="isVisible" width="400">
        <v-card>
          <div>
            {{ label }}
          </div>
          <template #actions>
            <v-spacer></v-spacer>
            <v-btn @click="onClickAction(false)">キャンセル</v-btn>
            <v-btn @click="onClickAction(true)">OK</v-btn>
          </template>
        </v-card>
      </v-dialog>

      <v-dialog v-model="isComplete" width="400">
        <v-card>
          <v-icon>{{ mdiCheckOutline }}</v-icon>
          <div>
            {{ message }}
          </div>
          <div @click="isComplete = false">閉じる</div>
        </v-card>
      </v-dialog>
    </v-form>
  </section>
</template>
