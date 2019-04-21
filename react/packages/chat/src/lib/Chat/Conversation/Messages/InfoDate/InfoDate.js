import React from 'react';

import MessageDate from './MessageDate';

function InfoDate({ messageDateIso }) {
  // let currentDate = new Date(new Date().getDate());
  let currentDate = new Date();
  return (
    <div>
      <MessageDate messageDateIso={messageDateIso} />
      .
    </div>
  );
}

export default InfoDate;
