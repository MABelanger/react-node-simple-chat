import React from 'react';

import styles from '../styles.module.css';
import Message from './Message';
import Audio from './Audio';
import { InfoDate, SeenDate } from './InfoDate';

function Messages({ messages, username }) {
  let totalMessageNumber = messages.length;
  console.log('totalMessageNumber', totalMessageNumber);
  return messages.map((message, index) => {
    const subjectClassName = (username == message.username) ? styles['me'] : styles['him'];
    const dateClassName = (username == message.username) ? styles['date-me'] : styles['date-him'];

    const isShowSeenDate = totalMessageNumber -1 == index;
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
    if(message.content){
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
    }
    if(message.seenDate){
      return (
        <React.Fragment key={index}>
          <li className={`${styles['date']} ${dateClassName}`}>
            <SeenDate seenDate={message.seenDate}
                      isShow={isShowSeenDate} />
          </li>
        </React.Fragment>
      );
    }
  });
}

export default Messages;
