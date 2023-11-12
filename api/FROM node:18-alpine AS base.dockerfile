FROM node:18-alpine AS base
WORKDIR /app

COPY package*.json .
COPY yarn.lock .
RUN yarn install

COPY . .
EXPOSE 4003
CMD [ "yarn", "app"]
