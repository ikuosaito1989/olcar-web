# oven/bun のイメージには Node.js が入っておらず、node は bun への symlink になっている。
# そのため `bun nbuild` から起動される Vite が Bun ランタイムで動いてしまい、
# JS チャンクが NUL 埋めで出力されることがある（ローカルは Node なので再現しない）。
# 依存解決だけ bun に任せ、ビルドと実行は Node で行う。
FROM node:22-slim

# 依存解決に bun を使う（bun.lockb をそのまま利用するためバージョンを固定する）
RUN npm install -g bun@1.1.42

# コンテナ内のwork dirを設定
WORKDIR /src

# 環境変数を設定し、ポートとホストを指定
ARG API_URL
ARG SITE_URL
ARG PROXY_URL
ARG GTAG
ARG SLACK_HOOK_URL
ARG BASIC_USER
ARG BASIC_PASS
ARG API_KEY
ARG TURNSTILE_SITE_KEY
ARG TURNSTILE_SECRET_KEY

ENV PORT=8080
ENV HOST=0.0.0.0
ENV API_URL=${API_URL}
ENV SITE_URL=${SITE_URL}
ENV PROXY_URL=${PROXY_URL}
ENV GTAG=${GTAG}
ENV SLACK_HOOK_URL=${SLACK_HOOK_URL}
ENV BASIC_USER=${BASIC_USER}
ENV BASIC_PASS=${BASIC_PASS}
ENV API_KEY=${API_KEY}
ENV TURNSTILE_SITE_KEY=${TURNSTILE_SITE_KEY}
ENV TURNSTILE_SECRET_KEY=${TURNSTILE_SECRET_KEY}

# package.jsonをコピーして、パッケージのインストール
COPY package.json ./
COPY bun.lockb ./
RUN bun install

# ソースをコピーして、ビルド
COPY . .
RUN bun run nbuild

# 壊れたアセットが混ざったまま deploy されないよう検証する
RUN node scripts/verify-assets.mjs

# コンテナが起動したら、nuxtを起動するよう指定
CMD [ "node", ".output/server/index.mjs"]
