# !/bin/bash
CURRENT_DIR=$(pwd)

PACKAGES=$(./get_packages_list.sh)

echo "--reinstall modules from list : $PACKAGES"

function rebuild_package_json {
  # rebuild local package.json from all packages/*/package.json
  cd $CURRENT_DIR
  node index.js
}

function install_all_dependency {
  # rebuild all dependency for all modules inside the packages directory
  cd $CURRENT_DIR
  yarn
}

function make_symlink_dist_packages {
  # Make symlink of dist for all packages
  cd $CURRENT_DIR
  mkdir -p node_modules/@xms-pro
  cd node_modules/@xms-pro

  for package in $PACKAGES
  do
    # ln -s ../../../packages/"$package"/dist "$package"
    ln -s ../../dist/"$package" "$package"
  done
}

function make_symlink_node_modules {
  # Make symlink of node_modules to point to _packages-manager/node_modules for all packages
  for package in $PACKAGES
  do
    cd $CURRENT_DIR
    cd ../packages/"$package"
    ln -s ../../_packages-manager/node_modules node_modules
  done
}

rebuild_package_json
install_all_dependency
make_symlink_dist_packages
make_symlink_node_modules
