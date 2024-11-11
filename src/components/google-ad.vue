<script setup lang="ts">
import { ref, onMounted } from 'vue'

const excludePaths = ['/managements', '/info', '/terms']
const adins = ref()
const adpush = ref()

onMounted(() => {
  if (excludePaths.some((path) => window.location.pathname.includes(path))) {
    return
  }

  const ins = document.createElement('ins') as HTMLElement
  ins.classList.value = 'adsbygoogle'
  ins.style.display = 'block'
  ins.setAttribute('data-ad-client', 'ca-pub-6167866428318160')
  ins.setAttribute('data-ad-slot', '2308227504')
  ins.setAttribute('data-ad-format', 'auto')
  ins.setAttribute('data-full-width-responsive', 'true')
  adins.value.appendChild(ins)

  const src = document.createElement('script') as HTMLScriptElement
  src.text = '(adsbygoogle = window.adsbygoogle || []).push({});'
  adpush.value.appendChild(src)
})
</script>

<template>
  <ClientOnly>
    <div class="adsbygoogle" ref="adins"></div>
    <div ref="adpush"></div>
  </ClientOnly>
</template>
