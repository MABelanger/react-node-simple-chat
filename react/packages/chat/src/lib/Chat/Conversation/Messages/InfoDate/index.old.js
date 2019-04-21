import React from 'react';

import MessageDate from './MessageDate';
import SeenDate from './SeenDate';

function InfoDate({ messageDate, seenDate, isShowSeenDate }) {
  // let currentDate = new Date(new Date().getDate());
  let currentDate = new Date();
  return (
    <div>
      <MessageDate messageDate={messageDate} />
      .
      &nbsp;
      <SeenDate seenDate={seenDate}
                isShow={isShowSeenDate}
      />
    </div>
  );
}

export default InfoDate;
