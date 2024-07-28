<template>
  <div
    class="tw-m-auto tw-mb-8 tw-flex tw-max-w-screen-md tw-flex-wrap [&>div]:tw-w-64 [&>div]:tw-p-3"
  >
    <div>
      <div class="tw-border-b tw-pb-3 tw-text-base tw-font-bold">olcarについて</div>
      <ul class="[&>li]:tw-mt-3">
        <li><Anchor to="/info/about">olcarについて</Anchor></li>
        <li>
          <Anchor to="/info/needs-help">作者のolcarに掛ける想いとみなさまへのお願い</Anchor>
        </li>
        <li><Anchor to="/info/purchase-process">個人売買の車購入ガイド</Anchor></li>
        <li><Anchor to="/info/caution">個人売買における詐欺について</Anchor></li>
        <li><Anchor to="/info/browser">推奨環境</Anchor></li>
        <li><Anchor to="/terms/tos">利用規約</Anchor></li>
        <li><Anchor to="/terms/privacy">プライバシーポリシー</Anchor></li>
        <li><Anchor to="/terms/transaction-law">特定商取引法に基づく表示</Anchor></li>
        <li>
          <Anchor to="https://forms.gle/Q2hQvMqLP9Jw2bea6" target="_blank">お問い合わせ</Anchor>
        </li>
        <li>
          <Anchor to="https://festive-yonath-a04e1e.netlify.app" target="_blank">運営者情報</Anchor>
        </li>
      </ul>
    </div>
    <div>
      <div class="tw-border-b-2 tw-pb-3 tw-text-base tw-font-bold">サービス</div>
      <ul class="[&>li]:tw-mt-3">
        <li><Anchor to="/info/omakase-agent">おまかせ代行サービス</Anchor></li>
        <li><Anchor to="/post">無料掲載</Anchor></li>
        <li><Anchor to="/info/exhibit">閲覧数が増える掲載オプション</Anchor></li>
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
          <Anchor :to="`/${maker.key}`">{{ maker.value }}</Anchor>
        </li>
      </ul>
    </div>
    <div>
      <div class="tw-border-b-2 tw-pb-3 tw-text-base tw-font-bold">特集</div>
      <ul class="[&>li]:tw-mt-3">
        <li>
          <Anchor to="/?priceTo=100000">10万円以下の車</Anchor>
        </li>
        <li>
          <Anchor
            to="/?makerIds%5B%5D=1&makerIds%5B%5D=2&makerIds%5B%5D=3&makerIds%5B%5D=4&carNames%5B%5D=AE86&carNames%5B%5D=%E3%83%81%E3%82%A7%E3%82%A4%E3%82%B5%E3%83%BC&carNames%5B%5D=%E3%83%9E%E3%83%BC%E3%82%AF%E2%85%A1&carNames%5B%5D=%E3%82%B7%E3%83%93%E3%83%83%E3%82%AF&carNames%5B%5D=%E3%82%B7%E3%83%A3%E3%83%88%E3%83%AB&carNames%5B%5D=%E3%82%B7%E3%83%93%E3%83%83%E3%82%AF%E3%82%AF%E3%83%BC%E3%83%9A&carNames%5B%5D=180sx&carNames%5B%5D=%E3%82%B7%E3%83%AB%E3%83%93%E3%82%A2&carNames%5B%5D=%E3%82%B7%E3%83%AB%E3%83%93%E3%82%A2%E3%83%B4%E3%82%A1%E3%83%AA%E3%82%A8%E3%83%83%E3%82%BF&carNames%5B%5D=RX-7"
          >
            希少車特集
          </Anchor>
        </li>
        <li><Anchor to="/?isSponsor=true">olcarオススメ車</Anchor></li>
      </ul>
    </div>
    <div>
      <div class="tw-border-b-2 tw-pb-3 tw-text-base tw-font-bold">SNS</div>
      <ul class="[&>li]:tw-mt-3">
        <li><Anchor target="_blank" to="https://lin.ee/80JiY1r">LINE</Anchor></li>
        <li>
          <Anchor target="_blank" to="https://twitter.com/byebye20201">X（旧Twitter）</Anchor>
        </li>
        <li>
          <Anchor target="_blank" to="https://www.youtube.com/channel/UCPONUTjMWhfzaDcM3fzUk4Q">
            Youtube
          </Anchor>
        </li>
        <li><Anchor target="_blank" to="https://www.tiktok.com/@olcar2021">Tiktok</Anchor></li>
      </ul>
    </div>
  </div>
  <div class="tw-bg-[#ffac42]">
    <div class="tw-p-5 tw-text-center">
      <div>Copyright © 2024 olcar All Rights Reserved.</div>
    </div>
  </div>
</template>
