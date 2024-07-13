<script setup lang="ts">
import { useRecaptchaProvider } from 'vue-recaptcha'

useRecaptchaProvider()

const recaptcha = defineModel<string>('recaptcha')
const errorMessage = ref('')

watch(recaptcha, (v) => {
  if (v) {
    errorMessage.value = ''
  }
})

/**
 * バリデーション
 */
const validate = async () => {
  if (!recaptcha.value) {
    errorMessage.value = 'あなたがロボットでないことを証明してください'
  }
  return !!recaptcha.value
}

defineExpose({
  validate,
})
</script>

<template>
  <div class="tw-flex tw-flex-col tw-items-center">
    <RecaptchaCheckbox v-model="recaptcha"></RecaptchaCheckbox>
    <!-- eslint-disable tailwindcss/no-custom-classname -->
    <div class="v-messages__message v-messages">{{ errorMessage }}</div>
  </div>
</template>
