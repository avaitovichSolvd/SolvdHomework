FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /backend

COPY package*.json ./
RUN npm install --production

USER node

COPY db ./db
COPY src ./src
COPY server.js ./
COPY jwt.js ./

EXPOSE 3000

CMD npm start

