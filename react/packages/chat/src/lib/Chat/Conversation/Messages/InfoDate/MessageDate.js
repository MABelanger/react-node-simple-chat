import React from 'react';
import * as utils from './utils';
import styles from './styles.module.css';

function MessageDate({ messageDateIso }) {
  // let currentDate = new Date(new Date().getDate());
  let currentDate = new Date();
  return (
    <div className={styles['info-date']}>
      {
        utils.timeDifference(currentDate, new Date(messageDateIso))
      }
    </div>
  );
}

export default MessageDate;
