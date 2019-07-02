import React from 'react';

import save from './svg/save.svg';

export const PostSending = (props) => {
  return (
    <div>
      {props.percentProgress} %
      &nbsp;
      &nbsp;
      &nbsp;
      <img src={save}
           style={{ width: '30px', cursor: 'pointer' }}
           onClick={props.onSave}
      />
    </div>
  )
}

export default PostSending
