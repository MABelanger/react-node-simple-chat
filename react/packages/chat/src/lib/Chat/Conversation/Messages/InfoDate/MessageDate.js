import React from 'react';
import * as utils from './utils';
import styles from './styles.module.css';

function MessageDate({ messageDate }) {
  // let currentDate = new Date(new Date().getDate());
  let currentDate = new Date();
  return (
    <div className={styles['info-date']}>
      {
        utils.timeDifference(currentDate, messageDate)
      }
    </div>
  );
}

export default MessageDate;
