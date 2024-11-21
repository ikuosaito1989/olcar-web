<template>
  <div class="tw-my-3">
    <div class="tw-text-center">
      <v-img height="80" contain src="/logo.webp" lazy-src="/datachef_unicolor.webp" />
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
