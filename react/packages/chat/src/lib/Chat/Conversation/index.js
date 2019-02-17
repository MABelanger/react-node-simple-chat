import React from 'react';
import Messages from './Messages';
import styles from './styles.module.css';

function Conversation({ messages, username }) {
  return(
    <div className={styles['conversation']}>
      <ul>
        <Messages messages={messages}
                  username={username} />
      </ul>
    </div>
  );
}

export default Conversation;
