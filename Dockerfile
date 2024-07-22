FROM oven/bun:latest

# コンテナ内のwork dirを設定
WORKDIR /src

# 環境変数を設定し、ポートとホストを指定
ENV PORT 8080
ENV HOST 0.0.0.0
ENV API_URL https://ol-car.com/api

# package.jsonをコピーして、パッケージのインストール
COPY package.json ./
COPY bun.lockb ./
RUN bun install

# ソースをコピーして、ビルド
COPY . .
RUN bun nbuild

# コンテナが起動したら、nuxtを起動するよう指定
CMD [ "bun", "start"]