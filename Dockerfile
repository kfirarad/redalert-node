FROM node:lts-stretch-slim

ADD . /app
WORKDIR /app
RUN yarn

CMD yarn start