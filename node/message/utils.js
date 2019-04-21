var fs = require('fs');
var path = require('path');

function _updateFile(message, cb, filePath) {
  fs.readFile(filePath, 'utf8', function readFileCallback(err, data){
      if (err){
        throw err;
      } else {
      let obj = null;
      let json = null;

      // try to parse the file, if error, create an empty array.
      try {
        obj = JSON.parse(data); //now it an object
      } catch(e) {
        obj = [];
      }

      // update the new message cant convert back to json.
      obj.push(message); //add some data
      json = JSON.stringify(obj);

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
