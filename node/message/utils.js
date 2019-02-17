var fs = require('fs');
var path = require('path');

function _updateFile(message, cb, filePath) {
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

function appendNewMessage(message, cb) {
  let relativeFilePath = path.join(__dirname, '../db', '/messages.json');
  fs.access(relativeFilePath, fs.constants.F_OK, (err) => {
    if(err) {
      console.log('fs.access() error!: File do not exist', err);
      let newContentFile = '[]';
      // create the file
      fs.writeFile(relativeFilePath, newContentFile, function(err) {
        if(err) {
          throw err;
        } else {
          _updateFile(message, cb, relativeFilePath);
        }

      });
    } else {
      _updateFile(message, cb, relativeFilePath);
    }
  });
}

module.exports = {
  appendNewMessage
};
