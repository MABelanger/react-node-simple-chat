'use strict';
const fs = require('fs');
const path = require('path');

function _getCodec (codecMatch) {
  if(codecMatch){
    let codecArray = codecMatch.split("=");
    if (codecArray.length == 2) {
      return codecArray[1];
    }
  }
  return null;
}

function _decodeBase64 (dataUri) {

  // data:audio/ogg; codecs=opus;base64,GkX...
  // eslint-disable-next-line no-useless-escape
  let matches = dataUri.match(/^data:([A-Za-z-+\/]+);\s*(.+)?\s*base64,(.+)$/);
  let file = {
    type: null,
    codec: null,
    data: null
  };

  if (matches && matches.length === 4) {
    // get the type and convert the data base64 to binary
    file.type = matches[1];
    file.codec = _getCodec (matches[2]);
    file.data = Buffer.from(matches[3], 'base64');
  }
  return file;
}
// fileNumber, username, extention
function _getFileName (fileNumber, username, extention) {
  return 'audio-' + fileNumber + '-' + username + '.' + extention;
}

function _getExtention (fileType) {
  if (fileType) {
    let typeArr = fileType.split('/');
    if (typeArr.length === 2 && typeArr[1]) {
      return typeArr[1];
    }
  }
  // return bin by default
  return 'bin';
}

function _getDataAndFileName (dataUri, fileNumber, username) {
  let {type, codec, data} = _decodeBase64(dataUri);
  let extention = _getExtention(type);
  let fileName = _getFileName(fileNumber, username, extention);

  return {
    data,
    fileName
  };
}

function saveAudio (dataUri, username) {
  let promise = new Promise((resolve, reject) => {
    let mediaDir = path.join(__dirname, '../media');

    fs.readdir(mediaDir, (err, files) => {
      let {data, fileName} = _getDataAndFileName(dataUri, files.length, username);

      if (!data) {
        reject(new Error('No audio or wrong format'));
        return;
      }

      let relativeFilePath = path.join(mediaDir, fileName);
      fs.writeFile(relativeFilePath, data, function (err) {
        if (err) {
          reject(err);
          return;
        }
        // let audioInfo = fileInfo.update(relativeFilePath);
        const audioUrl = '/media/' + fileName;
        resolve(audioUrl);
      });
    });
  });

  return promise;
}

module.exports = {
  saveAudio
};
