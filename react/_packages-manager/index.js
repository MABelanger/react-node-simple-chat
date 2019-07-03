'use strict';

const fs = require('fs');
const diffDepdencies = require('./diff-depdencies.js')

let packageObj = JSON.parse(fs.readFileSync('./package.json'));

const EXCLUDE_PACKAGE_NAME = '@xms-pro';

function _getNamesDepsObj(packageJsonPaths, dependencyType) {
  let diffDeps = diffDepdencies.getDiffDeps(packageJsonPaths, dependencyType);

  if(diffDeps.length > 0) {
    console.log('Warning !!! you have packages that differ, please fix them');
    console.log(JSON.stringify(diffDeps, null, 2));
  }

  let nameDeps = diffDepdencies.getNameDeps(packageJsonPaths, dependencyType);
  let namesDepsObj = {};
  for(let i=0; nameDeps.length > i; i++) {
    Object.keys(nameDeps[i]).forEach(function(name) {
      if(!name.includes(EXCLUDE_PACKAGE_NAME)){
        namesDepsObj = {
          ...namesDepsObj,
          ...nameDeps[i]
        }
      }
    });
  }
  return namesDepsObj
}


function _writeNewJson(content) {
  fs.writeFileSync('./package.json', content, 'utf8');
}

const packageJsonPaths = diffDepdencies.getPackageJsonPaths();
let namesDependenciesObj = _getNamesDepsObj(packageJsonPaths, 'dependencies');
let namesDevDependenciesObj = _getNamesDepsObj(packageJsonPaths, 'devDependencies');

packageObj.dependencies = namesDependenciesObj;
packageObj.devDependencies = namesDevDependenciesObj;

console.log(JSON.stringify(packageObj, null, 2));

_writeNewJson(JSON.stringify(packageObj, null, 2))
// console.log('namesDepsObj', namesDepsObj)
