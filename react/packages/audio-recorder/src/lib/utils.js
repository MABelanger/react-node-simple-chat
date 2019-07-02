import axios from 'axios';

export function handleErrorMediaDevices(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function padWithZeroNumber (number, width) {
  number = number + '';
  return number.length >= width
    ? number
    : new Array(width - number.length + 1).join('0') + number;
}

function getFileName (number, blobType) {
  const prefix = 'mquartier-audio';
  const photoNumber = padWithZeroNumber(number, 4);
  const extention = 'webm';

  return `${prefix}-${photoNumber}.${extention}`;
}

function postDataAxios(url = ``, data = {}, cbProgress) {
  return axios.request( {
    method: "post",
    url: url,
    data: data,
    onUploadProgress: cbProgress
  })
}

function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        credentials: 'include'
    })
    .then(response => response.json()); // parses response to JSON
}

export function getPercentProgress(loaded, total) {
  const percentProgress = ((loaded / total) * 100).toFixed(2);
  return percentProgress;
}

export function sendAudio(blob, username, cbProgress){
  let promise = new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
        let base64data = reader.result;
        let message = {
          username: username,
          dataUri: base64data,
          sendDateIso: new Date().toISOString()
        }

        //postData('/audio', message)
        postDataAxios('/audio', message, cbProgress)
          .then((response) => {
            console.log('response', response)
            resolve(response);
          }) // JSON-string from `response.json()` call
          .catch((error) => {
            reject(error)
            console.error(error)
          });
    }
  });
  return promise;
}

export function saveAudioFileFomBlob (number, blob) {
  window.URL = window.webkitURL || window.URL;

  let anchor = document.createElement('a');
  anchor.download = getFileName(number, blob.type);
  anchor.href = window.URL.createObjectURL(blob);
  let mouseEvent = document.createEvent('MouseEvents');
  mouseEvent.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  anchor.dispatchEvent(mouseEvent);
}
