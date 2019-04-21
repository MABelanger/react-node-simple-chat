import React from 'react';
import styles from './message.styles.module.css';

function Message({ content }) {
  return (
    <div className={styles['linkified']} dangerouslySetInnerHTML={{ __html: content }}></div>
  );
}

export default Message;
