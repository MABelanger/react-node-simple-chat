import React from 'react';
import * as utils from './utils';

function InfoDate({ messageDate }) {
  // let currentDate = new Date(new Date().getDate());
  let currentDate = new Date();
  return (
    <div>
      {
        utils.timeDifference(currentDate, messageDate)
      }
    </div>
  );
}

export default InfoDate;
