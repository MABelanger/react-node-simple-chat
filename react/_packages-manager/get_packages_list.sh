# !/bin/bash
CURRENT_DIR=$(pwd)

function get_packages_list {
  # rebuild local package.json from all packages/*/package.json
  cd $CURRENT_DIR
  cd ../packages/
  PACKAGES=$(find . -maxdepth 1 -type d | sed 's/.*\///' | tr -d '.' )
  echo $PACKAGES
}

get_packages_list
