FROM node:14 as build

ARG API_HOST
ARG AUTH_HOST

COPY . /build
WORKDIR /build

RUN apt-get update \
    && apt-get install -y gettext-base \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g json-refs \
    && mkdir -p dist \
    && json-refs resolve root.json -f > dist/swagger.template.json \
    && API_HOST=${API_HOST} AUTH_HOST=${AUTH_HOST} envsubst "\${API_HOST} \${AUTH_HOST}" < \
        dist/swagger.template.json > dist/swagger.json

FROM redocly/redoc:v2.0.0-rc.50

ENV SPEC_URL="/dist/swagger.json"
ENV PAGE_FAVICON="favicon-16x16.png"

COPY --from=build /build/dist/swagger.json /usr/share/nginx/html/dist/swagger.json
COPY ./src/index.html /usr/share/nginx/html/index.html
COPY ./src/myparcelcom.css /usr/share/nginx/html/myparcelcom.css
COPY ./src/myparcelcom.js /usr/share/nginx/html/myparcelcom.js
COPY ./src/favicon-16x16.png /usr/share/nginx/html/favicon-16x16.png
COPY ./src/favicon-32x32.png /usr/share/nginx/html/favicon-32x32.png

CMD ["nginx", "-g", "daemon off;"]
