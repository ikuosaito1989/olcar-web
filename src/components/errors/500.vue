<template>
  <div class="tw-my-3">
    <div class="tw-text-center">
      <nuxt-img class="tw-h-20 tw-object-contain" src="/logo.webp" />
      <div class="tw-my-3 tw-text-3xl tw-font-bold">{{ $t('errorOccurred') }}</div>
    </div>
    <div>
      {{ $t('errorDescription') }}
    </div>
    <div class="tw-my-3 tw-text-center">
      <Anchor to="/info/needs-help">{{ $t('donationLinkText') }}</Anchor>
    </div>
  </div>
</template>
