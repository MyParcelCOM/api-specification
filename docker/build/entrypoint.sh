#!/usr/bin/env sh

# call the original entrypoint
/docker-entrypoint.sh

# replace API host and auth server host with assigned env values
envsubst "\${API_HOST} \${AUTH_HOST}" < \
        /usr/share/nginx/html/dist/swagger.template.json > /usr/share/nginx/html/dist/swagger.json

rm /usr/share/nginx/html/dist/swagger.template.json

exec "$@"
