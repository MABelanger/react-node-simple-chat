# packages-manager

reinstall-all.sh :
- take all dependency from all package.json inside ../packages folder and build a node_modules
- Rebuild all dist
- do all symlink of node_modules for each packages to point to only to one node_modules inside the packages-manager

# usage
after the reinstall-all.sh you can do yarn start or yarn build inside each packages 
