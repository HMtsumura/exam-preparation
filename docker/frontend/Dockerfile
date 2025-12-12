FROM node:20-bullseye

# lightningcss のネイティブビルドに必要
RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  python3-pip \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 依存だけ先にインストール
COPY ./frontend/package*.json ./
RUN npm install

# lightningcss を Linux 用に再ビルド
RUN npm rebuild lightningcss --force

# 残りのファイル
COPY ./frontend .

CMD ["npm", "run", "dev"]
