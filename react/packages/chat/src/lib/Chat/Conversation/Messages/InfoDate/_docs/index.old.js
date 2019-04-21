import React from 'react';

import MessageDate from './MessageDate';
import SeenDate from './SeenDate';

function InfoDate({ messageDateIso, seenDateIso, isShowSeenDate }) {
  // let currentDate = new Date(new Date().getDate());
  let currentDate = new Date();
  return (
    <div>
      <MessageDate messageDateIso={messageDateIso} />
      .
      &nbsp;
      <SeenDate seenDateIso={seenDateIso}
                isShow={isShowSeenDate}
      />
    </div>
  );
}

export default InfoDate;
