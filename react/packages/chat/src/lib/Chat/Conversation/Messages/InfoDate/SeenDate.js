import React from 'react';
import * as utils from './utils';
import styles from './styles.module.css';

function SeenDate({ seenDate, isShow }) {
  if(!isShow) {
    return null;
  }
  return (
    <div className={styles['info-date']}>
      seen { new Date(seenDate).toLocaleTimeString() }
    </div>
  );
}

export default SeenDate;
