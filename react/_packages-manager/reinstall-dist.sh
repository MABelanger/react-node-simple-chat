# !/bin/bash
CURRENT_DIR=$(pwd)

PACKAGES=$(./get_packages_list.sh)

echo "--reinstall dist from list : $PACKAGES"

for package in $PACKAGES
do
  cd $CURRENT_DIR
  cd ../packages/"$package"
  yarn build
  # mkdir -p "$CURRENT_DIR/dist/"
  # mv dist "$CURRENT_DIR/dist/$package"
done
