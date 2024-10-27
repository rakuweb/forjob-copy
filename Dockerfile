# nextjs/Dockerfile
FROM node:20.11.0 AS base

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock


RUN yarn install


COPY . /app

