FROM node:20-bullseye

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend .

CMD ["npm", "run", "dev"]
