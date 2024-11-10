<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const excludePaths = ['/managements', '/info', '/terms']

onMounted(() => {
  // @ts-ignore
  ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  isVisible.value = !excludePaths.some((path) => window.location.pathname.includes(path))
})

useHead({
  script: [
    {
      async: true,
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6167866428318160',
      crossorigin: 'anonymous',
    },
  ],
})
</script>

<template>
  <ClientOnly>
    <div>
      <div v-if="isVisible">
        <!-- eslint-disable tailwindcss/no-custom-classname -->
        <ins
          class="adsbygoogle"
          style="display: block"
          data-ad-client="ca-pub-6167866428318160"
          data-ad-slot="2308227504"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  </ClientOnly>
</template>
