#!/usr/bin/env bash

mkdir -p yaml

# find all json files inside the specification/ folder recursively
for file in $(find specification -type f -name "*.json"); do
  # create the output directory structure
  mkdir -p yaml/$(dirname "${file}")
  # convert the json file to yaml
  yq r -P "${file}" > "yaml/${file%.json}.yaml"
  # replace all instances of ".json" with ".yaml" in the output file
  sed -i 's/\.json/\.yaml/g' "yaml/${file%.json}.yaml"
done

yq r -P root.json > "yaml/root.yaml"
sed -i 's/\.json/\.yaml/g' "yaml/root.yaml"

# bundle using redoc-cli
cd yaml || exit
docker run --rm -v $PWD:/spec redocly/cli bundle root.yaml --force -o dist
