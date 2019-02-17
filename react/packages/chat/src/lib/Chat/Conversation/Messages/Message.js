import React from 'react';

function Message({ content }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: content }}></div>
  );
}

export default Message;
