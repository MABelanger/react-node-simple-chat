import React from 'react';
import * as utils from './utils';
import styles from './styles.module.css';

function SeenDate({ seenDateIso, isShow }) {
  if(!isShow) {
    return null;
  }
  return (
    <div className={styles['info-date']}>
      seen { new Date(seenDateIso).toLocaleTimeString() }
    </div>
  );
}

export default SeenDate;
