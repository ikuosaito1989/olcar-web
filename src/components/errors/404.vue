<template>
  <div class="tw-my-3">
    <div class="tw-text-center">
      <nuxt-img class="tw-m-auto tw-h-20 tw-object-contain" src="/logo.webp" />
      <div class="tw-my-3 tw-text-3xl tw-font-bold">{{ $t('pageNotFound') }}</div>
    </div>
    <div>
      {{ $t('pageNotFoundDescription') }}
    </div>
  </div>
</template>
