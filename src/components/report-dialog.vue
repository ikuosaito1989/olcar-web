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
  reason.value = ''
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
          {{ $t('reportTitle') }}
        </div>
        <Recaptcha ref="recaptchaRef" v-model:recaptcha="response"></Recaptcha>
        <TextArea
          v-model:text="reason"
          class="tw-p-3"
          :placeholder="$t('reasonPlaceholder')"
          :hint="$t('reasonHint')"
          :counter="100"
          clearable
          :rules="[(v) => validationUtil.required(v, $t('required_field'))]"
        ></TextArea>
        <div class="tw-mb-2 [&>button]:tw-w-full">
          <v-btn variant="text" size="large" @click="onClick(Constants.REPORT.UNPOST)">
            {{ $t('reportUnpost') }}
          </v-btn>
          <v-btn variant="text" size="large" @click="onClick(Constants.REPORT.STOP)">
            {{ $t('reportStop') }}
          </v-btn>
          <v-btn variant="text" size="large" @click="onClick(Constants.REPORT.DIFF)">
            {{ $t('reportDiff') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isComplete" width="400">
      <v-card class="!tw-p-4">
        <div class="tw-text-center">
          <div class="tw-m-4">
            <v-icon size="x-large" color="success">mdi-check-outline</v-icon>
          </div>
          <div class="tw-m-2 tw-font-bold">{{ $t('thankYouTitle') }}</div>
        </div>
        <div class="tw-text-sm">
          {{ $t('thankYouMessage') }}
        </div>
        <div class="tw-mt-3 tw-text-center tw-text-sm" @click="isComplete = false">
          {{ $t('closeButton') }}
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
