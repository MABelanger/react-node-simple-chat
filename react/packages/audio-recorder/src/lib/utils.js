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

export function saveAudioFileFomBlob (number, blob) {
  window.URL = window.webkitURL || window.URL;

  let anchor = document.createElement('a');
  anchor.download = getFileName(number, blob.type);
  anchor.href = window.URL.createObjectURL(blob);
  let mouseEvent = document.createEvent('MouseEvents');
  mouseEvent.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  anchor.dispatchEvent(mouseEvent);
}
