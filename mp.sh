#!/usr/bin/env bash

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
COMPOSE="docker-compose"

# Check if the file with environment variables exists, otherwise copy the default file.
if [ ! -f ${ROOT_DIR}/.env ]; then
  if [ ! -f ${ROOT_DIR}/docker/.env.dist ]; then
    >&2 echo 'Unable to locate .env or .env.dist file'
    exit 1
  fi

  cp ${ROOT_DIR}/docker/.env.dist ${ROOT_DIR}/.env

  # Add current user and group to .env file, with root as fallback.
  echo "USER_ID=${UID-0}" >> ${ROOT_DIR}/.env
  echo "GROUP_ID=${GROUPS-0}" >> ${ROOT_DIR}/.env
fi
export $(cat ${ROOT_DIR}/.env | xargs)

if [ $# -gt 0 ]; then
  # Check if services are running.
  RUNNING=$(${COMPOSE} ps -q)

  # Either run or exec based on RUNNING var.
  DO="run --rm"
  if [ "${RUNNING}" != "" ]; then
    DO="exec"
  fi

  # Start services.
  if [ "$1" == "up" ]; then
    ${COMPOSE} up -d

  # Bundle the json spec into a single file.
  elif [ "$1" == "bundle" ]; then
    echo "Bundling spec into a single file..."

    ${COMPOSE} run --rm bundler ash -c \
    "mkdir -p /opt/dist && json-refs resolve schema.json -f > /opt/spec/dist/swagger.json"

    # On Linux fix permissions for the dist folder.
    if [ "$(uname -s)" == "Linux" ]; then
      ${COMPOSE} run --rm bundler chown -R ${USER_ID}:${GROUP_ID} /opt/spec/dist

      # Replace $SANDBOX_HOST and $SANDBOX_SCHEMA with values from environment variables.
      sed -i "s/\\\$SANDBOX_HOST/${SANDBOX_HOST}/" ./dist/swagger.json
      sed -i "s/\\\$SANDBOX_SCHEMA/${SANDBOX_SCHEMA}/" ./dist/swagger.json

      # Replace the base url variable with the actual base url
      sed -i "s/\\\$base_url/${SANDBOX_SCHEMA}:\/\/${SANDBOX_HOST}\/v1/" ./dist/swagger.json
    else
      # Different sed syntax for Mac.
      sed -i '' "s/\\\$SANDBOX_HOST/${SANDBOX_HOST}/" ./dist/swagger.json
      sed -i '' "s/\\\$SANDBOX_SCHEMA/${SANDBOX_SCHEMA}/" ./dist/swagger.json

      sed -i '' "s/\\\$base_url/${SANDBOX_SCHEMA}:\/\/${SANDBOX_HOST}\/v1/" ./dist/swagger.json
    fi

  # Rebuild the spec and validate it.
  elif [ "$1" == "validate" ]; then
    ./mp.sh bundle

    echo "Validating spec..."

    MESSAGES=$(${COMPOSE} ${DO} validator \
    curl -X POST -d @swagger.json \
    -H 'Content-Type:application/json' \
    http://localhost:8080/debug)

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
