FROM node:20 as build

COPY . /build
WORKDIR /build

RUN npm install -g json-refs \
    && mkdir -p dist \
    && json-refs resolve root.json -f > dist/swagger.template.json

FROM redocly/redoc:v2.0.0

ENV SPEC_URL="/dist/swagger.json"
ENV PAGE_FAVICON="favicon-16x16.png"

COPY --from=build /build/dist/swagger.template.json /usr/share/nginx/html/dist/swagger.template.json
COPY ./src/index.html /usr/share/nginx/html/index.html
COPY ./src/myparcelcom.css /usr/share/nginx/html/myparcelcom.css
COPY ./src/myparcelcom.js /usr/share/nginx/html/myparcelcom.js
COPY ./src/favicon-16x16.png /usr/share/nginx/html/favicon-16x16.png
COPY ./src/favicon-32x32.png /usr/share/nginx/html/favicon-32x32.png
COPY ./docker/build/entrypoint.sh /mp-entrypoint.sh

ENTRYPOINT ["/mp-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
