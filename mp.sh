#!/usr/bin/env bash
set -eo pipefail

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
COMPOSE="docker-compose"

# Check if the file with environment variables exists, otherwise copy the default file.
if [ ! -f ${ROOT_DIR}/.env ]; then
  if [ ! -f ${ROOT_DIR}/.env.dist ]; then
    >&2 echo "Unable to locate .env or .env.dist file"
    exit 1
  fi
  cp ${ROOT_DIR}/.env.dist ${ROOT_DIR}/.env

  # Add current user and group to .env file, with root as fallback.
  echo "USER_ID=${UID-0}" >> ${ROOT_DIR}/.env
  echo "GROUP_ID=${GROUPS-0}" >> ${ROOT_DIR}/.env
fi
export $(cat ${ROOT_DIR}/.env | xargs)

if [ $# -gt 0 ]; then
  # Start services.
  if [ "$1" == "up" ]; then
    ${COMPOSE} up -d

  # Bundle the json spec into a single file.
  elif [ "$1" == "bundle" ]; then
    echo "Bundling spec into a single file..."

    ${COMPOSE} run --rm bundler ash -c "mkdir -p /opt/dist && json-refs resolve schema.json -f > /opt/spec/dist/swagger.json"

    # On Linux fix permissions for the dist folder.
    if [ "$(uname -s)" == "Linux" ]; then
      ${COMPOSE} run --rm bundler chown -R ${USER_ID}:${GROUP_ID} /opt/spec/dist
    fi

    # Replace environment variables.
    ${COMPOSE} run --rm bundler sed -i "s/\\\$SANDBOX_HOST/${SANDBOX_HOST}/" //opt/spec/dist/swagger.json
    ${COMPOSE} run --rm bundler sed -i "s/\\\$SANDBOX_SCHEMA/${SANDBOX_SCHEMA}/" //opt/spec/dist/swagger.json
    ${COMPOSE} run --rm bundler sed -i "s/\\\$OAUTH_HOST/${OAUTH_HOST}/" //opt/spec/dist/swagger.json
    ${COMPOSE} run --rm bundler sed -i "s/\\\$base_url/${SANDBOX_SCHEMA}:\/\/${SANDBOX_HOST}\/v1/" //opt/spec/dist/swagger.json

  # Rebuild the spec and validate it.
  elif [ "$1" == "validate" ]; then
    ./mp.sh bundle
    echo "Validating spec..."

    MESSAGES=$(${COMPOSE} exec validator curl -X POST -d @swagger.json -H 'Content-Type:application/json' http://localhost:8080/debug)

    if [ "${MESSAGES}" == "{}" ]; then
        echo -e "\033[0;32mValid!\033[0m"
    else
        echo -e "\033[0;31mInvalid!\033[0m"

        if hash jq 2>/dev/null; then
          echo -e ${MESSAGES} | jq '.'
        else
          echo -e ${MESSAGES}
        fi
    fi

  else
    ${COMPOSE} "$@"
  fi
else
  ${COMPOSE} ps
fi
