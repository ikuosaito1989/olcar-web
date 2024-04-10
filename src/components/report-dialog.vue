<script setup lang="ts">
import { useRecaptchaProvider } from 'vue-recaptcha'

const prop = defineProps({
  carId: {
    type: Number,
    required: true,
  },
})

useRecaptchaProvider()

type Report = (typeof Constants.REPORT)[keyof typeof Constants.REPORT]
const response = ref()
const isVisible = ref(false)
const isComplete = ref(false)

const reason = ref('')
const errorMessage = ref('')

watch(response, () => {
  errorMessage.value = ''
})

/**
 * レポートを報告する
 */
const onClick = async (type: Report) => {
  if (!response.value) {
    errorMessage.value = 'あなたがロボットでないことを証明してください'
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
    <v-dialog v-model="isVisible">
      <v-card>
        <RecaptchaCheckbox v-model="response"></RecaptchaCheckbox>
        <div>{{ errorMessage }}</div>
        <v-textarea v-model="reason" label="理由"></v-textarea>
        <v-btn @click="onClick(Constants.REPORT.UNPOST)">{{ Constants.REPORT.UNPOST }}</v-btn>
        <v-btn @click="onClick(Constants.REPORT.STOP)">{{ Constants.REPORT.STOP }}</v-btn>
        <v-btn @click="onClick(Constants.REPORT.DIFF)">{{ Constants.REPORT.DIFF }}</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isComplete" width="400">
      <v-card>
        <v-icon>mdi-check-outline</v-icon>
        <div>ご報告ありがとうございます</div>
        <div>
          いただいた情報は、olcar（オルカー）運営より対応をさせて頂きます。
          公開停止申請の場合は、確認後、公開を停止させて頂きますのでしばらくお待ちください。
        </div>
        <a @click="isComplete = false">閉じる</a>
      </v-card>
    </v-dialog>
  </div>
</template>
