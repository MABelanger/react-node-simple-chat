import React from 'react';
import * as utils from './utils';
import styles from './styles.module.css';

function renderSeen(seenDateIso) {
  var options = { weekday: 'long', month: 'long', day: 'numeric' };
  let day = new Date(seenDateIso).toLocaleDateString("fr-CA", options);
  let hours = new Date(seenDateIso).toLocaleTimeString();

  if(utils.isSameDay(new Date(seenDateIso), new Date())) {
    return hours;
  }

  return day + ' ' + hours;
}

function SeenDate({ seenDateIso, isShow }) {
  if(!isShow) {
    return null;
  }

  return (
    <div className={styles['info-date']}>
      vue: { renderSeen(seenDateIso) }
    </div>
  );
}

export default SeenDate;
