FROM node:18.14.0-alpine

ENV NODE_ENV production

WORKDIR /backend

COPY package*.json ./
RUN npm install

RUN apt-get update && \
    apt-get install -y mysql-server

USER node

COPY . .

EXPOSE 3000

CMD npm start

