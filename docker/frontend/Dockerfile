FROM node:20-bullseye

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install

RUN npm rebuild lightningcss --force

COPY ./frontend .

CMD ["npm", "run", "dev"]
