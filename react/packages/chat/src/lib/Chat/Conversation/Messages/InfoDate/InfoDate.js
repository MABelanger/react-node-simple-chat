import React from 'react';

import MessageDate from './MessageDate';

function InfoDate({ messageDate }) {
  // let currentDate = new Date(new Date().getDate());
  let currentDate = new Date();
  return (
    <div>
      <MessageDate messageDate={messageDate} />
      .
    </div>
  );
}

export default InfoDate;
