import React from 'react';

import styles from '../styles.module.css';
import Message from './Message';
import Audio from './Audio';
import { InfoDate, SeenDate } from './InfoDate';

function Messages({ messages, username }) {
  let totalMessageNumber = messages.length;

  return messages.map((message, index) => {
    const subjectClassName = (username == message.username) ? styles['me'] : styles['him'];
    const dateClassName = (username == message.username) ? styles['date-me'] : styles['date-him'];
    const seenDateIsoClassName = styles['date-me'];

    const isShowSeenDate = totalMessageNumber -1 == index;
    if(message.audioUrl) {
      return (
        <React.Fragment key={index}>
          <li className={subjectClassName} key={index}>
            <Audio audioUrl={message.audioUrl} />
          </li>
          <li className={`${styles['date']} ${dateClassName}`}>
            <InfoDate messageDateIso={message.sendDateIso} />
          </li>
        </React.Fragment>
      );
    }
    if(message.content){
      return (
        <React.Fragment key={index}>
          <li className={subjectClassName}>
            <Message content={message.content} />
          </li>
          <li className={`${styles['date']} ${dateClassName}`}>
            <InfoDate messageDateIso={message.sendDateIso} />
          </li>
        </React.Fragment>
      );
    }
    if(message.seenDateIso){
      return (
        <React.Fragment key={index}>
          <li className={`${styles['date']} ${seenDateIsoClassName}`}>
            <SeenDate seenDateIso={message.seenDateIso}
                      isShow={isShowSeenDate} />
          </li>
        </React.Fragment>
      );
    }
  });
}

export default Messages;
