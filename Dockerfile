FROM node:lts-stretch-slim

ADD . /app
WORKDIR /app

ENV NODE_ENV=production

RUN yarn install --prod

CMD yarn start