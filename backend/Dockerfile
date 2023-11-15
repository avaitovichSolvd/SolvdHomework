FROM node:18.14.0-alpine

ENV NODE_ENV production

WORKDIR /backend

COPY package*.json ./
RUN npm install

RUN apk update && \
    apk install -y mysql-server

USER node

COPY . .

EXPOSE 3000

CMD npm start

