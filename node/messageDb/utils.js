var fs = require('fs');
var path = require('path');


function updateFile(message, cb, filePath) {
  fs.readFile(filePath, 'utf8', function readFileCallback(err, data){
      if (err){
        throw err;
      } else {
      obj = JSON.parse(data); //now it an object
      obj.push(message); //add some data
      json = JSON.stringify(obj); //convert it back to json

      fs.writeFile(filePath, json, 'utf8', function (err) {
        if (err) {
          throw err;
        }
        console.log('Saved!');
        cb();
      }); // write it back
  }});
}

module.exports = function () {
  let module = {};

  module.appendNewMessage = function(message, cb) {
    let relativeFilePath = path.join(__dirname, '../db', '/messages.json');
    fs.access(relativeFilePath, fs.constants.F_OK, (err) => {
      if(err) {
        console.log('fs.access() error!: ', err);
        fs.writeFile(filePath, '[]', function(err) {
          if(err) {
            throw err;
          } else {
            updateFile(message, cb, filePath);
          }

        });
      } else {
        updateFile(message, cb, filePath);
      }
    });
  }

  return module;
};
