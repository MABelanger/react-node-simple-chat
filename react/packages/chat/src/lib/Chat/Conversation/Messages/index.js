import React from 'react';

import styles from '../styles.module.css';
import Message from './Message';
import Audio from './Audio';

function Messages({ messages, username }) {
  return messages.map((message, index) => {
    const subjectClassName = (username == message.username) ? styles['me'] : styles['him'];

    if(message.audioUrl) {
      return (
        <li className={subjectClassName} key={index}>
          <Audio audioUrl={message.audioUrl} />
        </li>
      );
    }
    return (
      <li className={subjectClassName} key={index}>
        <Message content={message.content} />
      </li>
    );
  });
}

export default Messages;
