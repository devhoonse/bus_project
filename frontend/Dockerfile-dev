FROM node:16.3.0-alpine

ADD . /app
WORKDIR /app

COPY package.json .
RUN yarn

CMD ["yarn", "start"]