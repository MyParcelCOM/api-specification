FROM node:11.12 as build

ARG API_HOST
ARG AUTH_HOST

COPY . /build
WORKDIR /build

RUN apt update \
    && apt install -y gettext-base \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g json-refs \
    && npm install --quiet \
    && mkdir -p dist \
    && json-refs resolve root.json -f > dist/swagger.template.json \
    && API_HOST=${API_HOST} AUTH_HOST=${AUTH_HOST} envsubst "\${API_HOST} \${AUTH_HOST}" < \
        dist/swagger.template.json > dist/swagger.json \
    && ./node_modules/.bin/gulp src \
    && ./node_modules/.bin/gulp html \
    && ./node_modules/.bin/gulp swagger-ui

FROM nginx:1.15-alpine

COPY --from=build /build/dist /usr/share/nginx/html/api-specification

ADD ./docker/build/default.conf /etc/nginx/conf.d/default.conf
