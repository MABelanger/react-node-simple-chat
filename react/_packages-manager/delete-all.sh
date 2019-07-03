# !/bin/bash
CURRENT_DIR=$(pwd)

# remove all symlink of node_modules and directory of dist
function delete_all {
  find . -name "node_modules" -exec rm -rf {} \;
  find . -name "dist" -type d -exec rm -rf {} \;
  find . -name "build" -type d -exec rm -rf {} \;
  find . -name "yarn.lock" -exec rm -rf {} \;
  find . -name "package-lock.json" -exec rm -rf {} \;
  find . -name "lerna-debug.log" -exec rm -rf {} \;
}

cd $CURRENT_DIR
cd ../
delete_all
