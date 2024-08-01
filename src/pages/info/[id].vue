<script setup lang="ts">
import { marked } from 'marked'

const route = useRoute()
const { data: raw } = await useFetchi<string>(`/md/${route.params.id}`)
if (!raw.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
const title = ref(Constants.INFO_TITLES[route.params.id as keyof typeof Constants.INFO_TITLES])
const markDown = ref(await marked(raw.value))
useHead(headUtil.seo(title.value))
</script>

<template>
  <section class="tw-my-4 tw-w-full tw-rounded-2xl tw-bg-[#f5f5f6] tw-p-4 tw-text-base">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="markDown"></div>
  </section>
</template>

<style lang="scss" scoped>
:deep() {
  ul {
    margin-bottom: 12px;
  }
  p {
    margin-bottom: 16px;
  }
  h2 {
    font-size: 20px;
    text-align: center;
    padding: 2rem 0;
    border-bottom: 1px solid #f67b01;
    font-weight: bold;
  }

  h3 {
    font-weight: bold;
    font-size: 1.17em;
  }

  h4 {
    font-weight: bold;
  }

  a {
    color: #1976d2;

    &:hover {
      text-decoration-line: underline;
    }
  }

  ol,
  ul,
  menu {
    list-style: disc;
    padding-left: 24px;
  }
  h2,
  h3,
  h4,
  ul,
  ol,
  small {
    margin-bottom: 12px;
  }

  img {
    border-radius: 4px;
    width: 100%;
    max-width: 600px;
    display: flex;
    margin: 16px auto;
  }

  table {
    border: '1';
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    background: white;
    line-height: 2;
    margin-bottom: 32px;
  }

  td {
    padding: 4px 12px;
  }

  .border {
    border: 3px solid #00bcd4 !important;
    padding: 0.5em !important;
    border-radius: 4px !important;
    margin-bottom: 20px !important;

    h3 {
      text-align: center;
    }
  }

  b,
  strong {
    color: #fc6a52;
  }

  .todo {
    color: green;
    font-weight: bold;
  }
}
</style>
