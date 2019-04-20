import React from 'react';
import * as utils from './utils';
import styles from './styles.module.css';

function SeenDate({ seenDate }) {
  return (
    <div className={styles['info-date']}>
      seen { seenDate.toLocaleTimeString() }
    </div>
  );
}

export default SeenDate;
