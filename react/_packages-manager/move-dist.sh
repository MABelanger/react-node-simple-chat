# !/bin/bash
CURRENT_DIR=$(pwd)

PACKAGES=$(./get_packages_list.sh)

echo "--move dist from list : $PACKAGES"

mkdir dist/

for package in $PACKAGES
do
  cd $CURRENT_DIR
  cd ../packages/"$package"
  mv dist ../../_packages-manager/dist/"$package"
done
