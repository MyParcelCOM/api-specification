#!/usr/bin/env bash
set -eo pipefail

cd ~/staging-docs.myparcel.com

echo "Unpacking files"
tar -xzvf api-spec-export.tar.gz --directory public/api-specification/
cp -r public/api-specification/dist/* public/api-specification/
rm -rf public/api-specification/dist

echo "Removing uploaded bundle"
rm ./api-spec-export.tar.gz
