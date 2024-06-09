<script setup lang="ts">
import { marked } from 'marked'

const route = useRoute()
const title = ref(Constants.INFO_TITLES[route.params.id as keyof typeof Constants.INFO_TITLES])
const { data: raw } = await useFetchi<string>(`/md/${route.params.id}`)
const markDown = ref(await marked(raw.value))
</script>

<template>
  <section class="tw-w-full tw-max-w-3xl">
    {{ title }}
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="markDown"></div>
  </section>
</template>

<style lang="scss" scoped>
:deep() {
  h2 {
    font-size: 20px;
    text-align: center;
    padding: 2rem 0;
    border-bottom: 1px solid #f67b01;
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
    border: 3px solid #00bcd4;
    padding: 1.2em 1em;
    border-radius: 4px;
    margin-bottom: 20px;

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
