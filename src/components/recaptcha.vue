<script setup lang="ts">
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
  <div class="tw-mb-2 tw-flex tw-flex-col tw-items-center">
    <RecaptchaCheckbox v-model="recaptcha"></RecaptchaCheckbox>
    <div class="tw-m-1 tw-text-xs tw-text-[#ff5252]">{{ errorMessage }}</div>
  </div>
</template>
