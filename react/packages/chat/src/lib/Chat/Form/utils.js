import linkifyHtml from 'linkifyjs/html';

export function getContentHtml(text) {
  let textWithBr =  text.replace(/(\r\n|\n|\r)/g,"<br />");
  let textWithLink = linkifyHtml(textWithBr, {
    defaultProtocol: 'https'
  });
  return textWithLink;
}

export function isSendChar(char) {
  if(char) {
    return char.charCodeAt(0) == 10;
  }
  return false;
}
