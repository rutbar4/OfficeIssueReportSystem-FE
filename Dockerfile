FROM node:18.14.2 as builder

COPY . /code
WORKDIR /code
RUN npm ci
RUN npm run build

FROM nginx:1.25.1-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/cache-headers.conf /etc/nginx/conf.d/cache-headers.conf
COPY nginx/nocache-headers.conf /etc/nginx/conf.d/nocache-headers.conf
COPY nginx/security-headers.conf /etc/nginx/conf.d/security-headers.conf

COPY --from=builder /code/build /usr/share/nginx/html
