#!/usr/bin/env bash
set -eo pipefail

# init environment variables
set -o allexport
{
  ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
  ${ROOT_DIR}/mp/helpers/check-env
  export $(cat ${ROOT_DIR}/.env | xargs)
  RUNNING=$(docker compose ps -q)
}
set +o allexport

if [ "$(docker network ls -q -f name=proxynet)" = "" ]; then
  echo ""
  echo "Creating proxynet network"
  docker network create proxynet
fi

# run commands
if [ $# -gt 0 ]; then
  if [ -f "mp/$1" ]; then
    SCRIPT="$1"
    shift 1
    ${ROOT_DIR}/mp/${SCRIPT} "$@"
  else
    docker compose "$@"
  fi
else
  docker compose ps
fi
