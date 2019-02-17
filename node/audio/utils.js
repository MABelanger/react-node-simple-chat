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

function _getFileName (extention, fileNumber) {
  return 'img-' + fileNumber + '.' + extention;
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

function getDataAndFileName (dataUri, fileNumber) {
  let {type, codec, data} = _decodeBase64(dataUri);
  let extention = _getExtention(type);
  let fileName = _getFileName(extention, fileNumber);

  return {
    data,
    fileName
  };
}

function saveImage (dataUri) {
  let fileNumber = 1;
  let {data, fileName} = getDataAndFileName(dataUri, fileNumber);

  let promise = new Promise((resolve, reject) => {
    if (!data) {
      reject(new Error('No image or wrong format'));
      return;
    }

    let relativeFilePath = path.join(__dirname, '../media', fileName);
    console.log('relativeFilePath', relativeFilePath);
    fs.writeFile(relativeFilePath, data, function (err) {
      if (err) {
        reject(err);
        return;
      }
      // let imageInfo = fileInfo.update(relativeFilePath);
      const audioUrl = '/media/' + fileName;
      resolve(audioUrl);
    });
  });

  return promise;
}




module.exports = {
  saveImage
};
