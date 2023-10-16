FROM node:18.16.1 as builder
COPY . /code
WORKDIR /code
RUN npm ci
RUN npm run lint
RUN npm run typecheck
RUN npm run build
