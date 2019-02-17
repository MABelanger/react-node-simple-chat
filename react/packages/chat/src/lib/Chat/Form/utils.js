export function getContentHtml(text) {
  return text.replace(/(\r\n|\n|\r)/g,"<br />");
}

export function isSendChar(char) {
  if(char) {
    return char.charCodeAt(0) == 10;
  }
  return false;
}
