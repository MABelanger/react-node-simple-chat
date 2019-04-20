import React from 'react';

import styles from '../styles.module.css';
import Message from './Message';
import Audio from './Audio';
import InfoDate from './InfoDate';

function Messages({ messages, username }) {
  return messages.map((message, index) => {
    const subjectClassName = (username == message.username) ? styles['me'] : styles['him'];
    const dateClassName = (username == message.username) ? styles['date-me'] : styles['date-him'];

    if(message.audioUrl) {
      return (
        <React.Fragment key={index}>
          <li className={subjectClassName} key={index}>
            <Audio audioUrl={message.audioUrl} />
          </li>
          <li className={`${styles['date']} ${dateClassName}`}>
            <InfoDate messageDate={message.date}
                      seenDate={message.date}
            />
          </li>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={index}>
        <li className={subjectClassName}>
          <Message content={message.content} />
        </li>
        <li className={`${styles['date']} ${dateClassName}`}>
          <InfoDate messageDate={message.date}
                    seenDate={message.date}
          />
        </li>
      </React.Fragment>
    );
  });
}

export default Messages;
