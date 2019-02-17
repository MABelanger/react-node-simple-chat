MVP : channel
MVP : get the messages.json when client connect into socket.io

MVP: test local chat
MVP: listen enter key, not the input char
MVP:
MVP: Add logout

MVP: use module.css
MVP: record sound.
MVP: add date
MVP: Add emoicons

* Read the jpg link and display them in the chat.
* Faire des backup automatique (cp current.json -> back01.json) a tout les jours.
* Envoyer un notification dans facebook.
* sauvegarder dans localStorage le current message.
  - clearer le localstorage quand le send is success.
* Faire serviceWorker avec un app que va fetcher toujours le message et met en rouge (1) sur l'icone.
* serviceWorker qui peut lire les messages offlines.
* Avoir plusieur user.
* Faire https
* 3 petit dot quand ecris message.

Refactor :
* Put the check if is login outside Chat, put it inside APP.
  - Get user, hello user xyz
  - Way to verify at the init if the user is logged, right now is messages.json that notify.
