'use strict';

const execSync = require('child_process').execSync;
const fs = require('fs');

function getPackageJsonPaths() {
  const PACKAGES_DIR = '../packages';
  const cmdFind = `find ${PACKAGES_DIR} -name 'node_modules' -prune -o  -name 'package.json'`;
  let outCmd = execSync(cmdFind);
  const outCmdStr = outCmd.toString();
  const lines = outCmdStr.split("\n");

  const packageJsonPaths = lines.filter((line)=>{
    // remove empty line and node_modules path
    return (line.length > 0 && !line.includes('node_modules'))
  });

  return packageJsonPaths;
}

function _getAllDepObj(packageJsonPaths, dependencyType) {
  let allDepObj = {};
  for(let i=0; i<packageJsonPaths.length; i++){
    let packageJsonPath = packageJsonPaths[i];
    let packageObj = JSON.parse(fs.readFileSync(packageJsonPath));

    let dependencies = packageObj[dependencyType];

    if(dependencies) {

      Object.keys(dependencies).forEach(function(name) {
        let version = dependencies[name];

        if(!allDepObj[name]) {
          allDepObj[name]=[];
        }
        allDepObj[name].push({
          packageJsonPath,
          version
        });
      });
    }
  }
  return allDepObj;
}

function _getNameDeps(allDepObj) {
  let nameDeps = [];
  Object.keys(allDepObj).forEach(function(name) {
    let obj={};
    obj[name] = allDepObj[name][0].version;
    nameDeps.push(obj);
  });
  return nameDeps;
}

function _getDiffDeps(allDepObj) {
  let diffDeps = [];
  Object.keys(allDepObj).forEach(function(name) {
    let packages = allDepObj[name];

    // init the first version
    let version = packages[0].version;
    for(let i=0; i<packages.length; i++){
      if(version != packages[i].version) {
        diffDeps.push({
          name,
          packages
        })
        return;
      } else {
        version = packages[i].version
      }
    }
  });
  return diffDeps;
}

function getDiffDeps(packageJsonPaths, dependencyType) {

  // console.log('packageJsonPaths', packageJsonPaths);

  // dependencyType = dependencies || devDependencies
  let allDepObj = _getAllDepObj(packageJsonPaths, dependencyType);
  // console.log('allDepObj', allDepObj);

  let diffDeps = _getDiffDeps(allDepObj);
  // console.log('diffDeps', JSON.stringify(diffDeps, null, 2));
  return diffDeps;
}

function getNameDeps (packageJsonPaths, dependencyType) {
  let allDepObj = _getAllDepObj(packageJsonPaths, dependencyType);
  let nameDeps = _getNameDeps(allDepObj);
  return nameDeps;
}


module.exports = {
  getPackageJsonPaths,
  getDiffDeps,
  getNameDeps
}
