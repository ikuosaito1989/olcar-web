<template>
  <div
    class="tw-m-auto tw-mb-8 tw-flex tw-max-w-screen-md tw-flex-wrap [&>div]:tw-w-64 [&>div]:tw-p-3"
  >
    <div class="">
      <div class="tw-border-b tw-pb-3 tw-text-base tw-font-bold">olcarについて</div>
      <ul class="[&>li]:tw-mt-3">
        <li><NuxtLink to="/info/about?ref=f">olcarについて</NuxtLink></li>
        <li>
          <NuxtLink to="/info/needs-help?ref=f"
            >作者のolcarに掛ける想いとみなさまへのお願い</NuxtLink
          >
        </li>
        <li><NuxtLink to="/info/purchase-process?ref=f">個人売買の車購入ガイド</NuxtLink></li>
        <li><NuxtLink to="/info/caution">個人売買における詐欺について</NuxtLink></li>
        <li><NuxtLink to="/info/browser">推奨環境</NuxtLink></li>
        <li><NuxtLink to="/terms/tos">利用規約</NuxtLink></li>
        <li><NuxtLink to="/terms/privacy">プライバシーポリシー</NuxtLink></li>
        <li><NuxtLink to="/terms/transaction-law">特定商取引法に基づく表示</NuxtLink></li>
        <li>
          <NuxtLink to="https://forms.gle/Q2hQvMqLP9Jw2bea6" target="_blank">お問い合わせ</NuxtLink>
        </li>
        <li>
          <NuxtLink to="https://festive-yonath-a04e1e.netlify.app" target="_blank"
            >運営者情報</NuxtLink
          >
        </li>
      </ul>
    </div>
    <div>
      <div class="tw-border-b-2 tw-pb-3 tw-text-base tw-font-bold">サービス</div>
      <ul class="[&>li]:tw-mt-3">
        <li><NuxtLink to="/info/omakase-agent?ref=f">おまかせ代行サービス</NuxtLink></li>
        <li><NuxtLink to="/post">無料掲載</NuxtLink></li>
        <li><NuxtLink to="/info/exhibit">閲覧数が増える掲載オプション</NuxtLink></li>
      </ul>
    </div>
    <div>
      <div class="tw-border-b-2 tw-pb-3 tw-text-base tw-font-bold">メーカー</div>
      <ul class="tw-flex tw-flex-wrap">
        <li
          v-for="(maker, i) in Constants.MAKERS"
          :key="i"
          class="tw-mr-2 tw-mt-3 tw-border-r tw-border-[#f67b01] tw-pr-2"
        >
          <NuxtLink :to="`/${maker.key}`">{{ maker.value }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div>
      <div class="tw-border-b-2 tw-pb-3 tw-text-base tw-font-bold">特集</div>
      <ul class="[&>li]:tw-mt-3">
        <li><NuxtLink to="/?priceTo=100000">10万円以下の車</NuxtLink></li>
        <li>
          <NuxtLink
            to="/?makerIds%5B%5D=1&makerIds%5B%5D=2&makerIds%5B%5D=3&makerIds%5B%5D=4&carNames%5B%5D=AE86&carNames%5B%5D=%E3%83%81%E3%82%A7%E3%82%A4%E3%82%B5%E3%83%BC&carNames%5B%5D=%E3%83%9E%E3%83%BC%E3%82%AF%E2%85%A1&carNames%5B%5D=%E3%82%B7%E3%83%93%E3%83%83%E3%82%AF&carNames%5B%5D=%E3%82%B7%E3%83%A3%E3%83%88%E3%83%AB&carNames%5B%5D=%E3%82%B7%E3%83%93%E3%83%83%E3%82%AF%E3%82%AF%E3%83%BC%E3%83%9A&carNames%5B%5D=180sx&carNames%5B%5D=%E3%82%B7%E3%83%AB%E3%83%93%E3%82%A2&carNames%5B%5D=%E3%82%B7%E3%83%AB%E3%83%93%E3%82%A2%E3%83%B4%E3%82%A1%E3%83%AA%E3%82%A8%E3%83%83%E3%82%BF&carNames%5B%5D=RX-7"
            >希少車特集</NuxtLink
          >
        </li>
        <li><NuxtLink to="/?isSponsor=true">olcarオススメ車</NuxtLink></li>
      </ul>
    </div>
    <div>
      <div class="tw-border-b-2 tw-pb-3 tw-text-base tw-font-bold">SNS</div>
      <ul class="[&>li]:tw-mt-3">
        <li><NuxtLink target="_blank" to="https://lin.ee/80JiY1r">LINE</NuxtLink></li>
        <li>
          <NuxtLink target="_blank" to="https://twitter.com/byebye20201">X（旧Twitter）</NuxtLink>
        </li>
        <li>
          <NuxtLink target="_blank" to="https://www.youtube.com/channel/UCPONUTjMWhfzaDcM3fzUk4Q"
            >Youtube</NuxtLink
          >
        </li>
        <li><NuxtLink target="_blank" to="https://www.tiktok.com/@olcar2021">Tiktok</NuxtLink></li>
      </ul>
    </div>
  </div>
  <div class="tw-bg-[#ffac42]">
    <div class="tw-p-5 tw-text-center">
      <div>Copyright © 2024 olcar All Rights Reserved.</div>
    </div>
  </div>
</template>
