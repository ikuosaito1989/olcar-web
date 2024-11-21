<template>
  <div class="tw-bg-[#f5f5f6] tw-px-4 tw-py-8">
    <div
      class="tw-m-auto tw-flex tw-max-w-screen-md tw-flex-wrap tw-items-center tw-justify-center"
    >
      <v-img class="!tw-flex-[0_0_200px]" height="80" contain position="left" src="/logo.webp" />
      <div class="!tw-flex-[1_1_300px]">
        <div class="tw-border-b tw-border-[#f67b01] tw-text-xl">{{ $t('aboutOlcar') }}</div>
        <div class="tw-my-3 tw-text-sm">
          {{ $t('concept') }}
          <strong>{{ $t('closeToCars') }}</strong>
          {{ $t('shortDescription') }}
          <Anchor class="tw-mt-4 tw-block tw-font-bold tw-text-[#1976d2]" to="/info/about">
            {{ $t('learnMore') }}
          </Anchor>
        </div>
      </div>
    </div>
  </div>
</template>
