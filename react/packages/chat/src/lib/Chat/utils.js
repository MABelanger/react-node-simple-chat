export function isEnableSendSeen(messages, currentUsername) {
  if(messages.length < 1){
    return false;
  }
  let indexLast = messages.length - 1;
  let lastUsername = messages[indexLast].username;
  let isSeenDate = !!messages[indexLast].seenDate;

  return (!isSeenDate && (currentUsername != lastUsername));
}
