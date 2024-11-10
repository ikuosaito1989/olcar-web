<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const excludePaths = ['/managements', '/info', '/terms']

onMounted(() => {
  isVisible.value = !excludePaths.some((path) => window.location.pathname.includes(path))
  // @ts-ignore
  ;(window.adsbygoogle = window.adsbygoogle || []).push({})
})

useHead({
  script: [
    {
      async: true,
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6167866428318160',
      crossorigin: 'anonymous',
      tagPosition: 'bodyClose',
    },
  ],
})
</script>

<template>
  <div v-if="isVisible">
    <ClientOnly>
      <!-- eslint-disable tailwindcss/no-custom-classname -->
      <ins
        class="adsbygoogle"
        style="display: block"
        data-ad-client="ca-pub-6167866428318160"
        data-ad-slot="2308227504"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </ClientOnly>
  </div>
</template>
