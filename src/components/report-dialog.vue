<script setup lang="ts">
import type { Recaptcha } from '#build/components'

const prop = defineProps({
  carId: {
    type: Number,
    required: true,
  },
})

type Report = (typeof Constants.REPORT)[keyof typeof Constants.REPORT]

const recaptchaRef = ref<InstanceType<typeof Recaptcha> | null>(null)
const response = ref()
const isVisible = ref(false)
const isComplete = ref(false)
const reason = ref('')

/**
 * レポートを報告する
 */
const onClick = async (type: Report) => {
  if (!(await recaptchaRef.value?.validate())) {
    return
  }
  await $fetch<KeywordsText>(`/api/v1/reports`, {
    method: 'POST',
    body: { problem: type, reason: reason.value, carId: prop.carId },
  })
  isComplete.value = true
  open()
}

/**
 * ダイアログを開く
 */
const open = () => {
  isVisible.value = !isVisible.value
}

defineExpose({
  open,
})
</script>

<template>
  <div>
    <v-dialog v-model="isVisible" width="400">
      <v-card>
        <div class="tw-my-4 tw-border-b tw-pb-3 tw-text-center tw-text-xl tw-font-bold">
          報告する
        </div>
        <Recaptcha ref="recaptchaRef" v-model:recaptcha="response"></Recaptcha>
        <v-textarea v-model="reason" class="tw-p-3" label="理由"></v-textarea>
        <div class="tw-mb-2 [&>button]:tw-w-full">
          <v-btn variant="text" @click="onClick(Constants.REPORT.UNPOST)">{{
            Constants.REPORT.UNPOST
          }}</v-btn>
          <v-btn variant="text" @click="onClick(Constants.REPORT.STOP)">{{
            Constants.REPORT.STOP
          }}</v-btn>
          <v-btn variant="text" @click="onClick(Constants.REPORT.DIFF)">{{
            Constants.REPORT.DIFF
          }}</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isComplete" width="400">
      <v-card class="!tw-p-4">
        <div class="tw-text-center">
          <div class="tw-m-4">
            <v-icon size="x-large" color="success">mdi-check-outline</v-icon>
          </div>
          <div class="tw-m-2 tw-font-bold">ご報告ありがとうございます</div>
        </div>
        <div class="tw-text-sm">
          いただいた情報は、olcar（オルカー）運営より対応をさせて頂きます。
          公開停止申請の場合は、確認後、公開を停止させて頂きますのでしばらくお待ちください。
        </div>
        <div class="tw-mt-3 tw-text-center tw-text-sm" @click="isComplete = false">閉じる</div>
      </v-card>
    </v-dialog>
  </div>
</template>
