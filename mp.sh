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
    ${COMPOSE} run bundler ash -c \
    "mkdir -p dist && json-refs resolve schema.json -f > dist/swagger.json"

  # Rebuild the spec and validate it.
  elif [ "$1" == "validate" ]; then
    ./mp.sh bundle \
    && ${COMPOSE} ${DO} validator \
    curl -X POST -d @swagger.json \
    -H 'Content-Type:application/json' \
    http://localhost:8080/debug

  else
    ${COMPOSE} "$@"
  fi
else
  ${COMPOSE} ps
fi