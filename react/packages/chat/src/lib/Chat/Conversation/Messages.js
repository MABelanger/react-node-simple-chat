import React from 'react';

import styles from './styles.module.css';

function Messages({ messages, username }) {
  return messages.map((message, index) => {
    const subjectClassName = (username == message.username) ? styles['me'] : styles['him'];

    if(message.audioUrl) {
      return (
        <li className={subjectClassName} key={index}>
          <audio
            src={message.audioUrl}
            playsInline
            controls={true}
          />
        </li>
      );
    }
    return (
      <li className={subjectClassName} key={index}>
        <div dangerouslySetInnerHTML={{ __html: message.content }}></div>
      </li>
    );
  });
}

export default Messages;
