import React from 'react';

import AudioPreview from './AudioPreview';

import save from './svg/save.svg';
import upload from './svg/upload.svg';

export const PostError = (props) => {
  return (
    <div>
      {
        // <AudioPreview blob={this.state.blob} />
        // &nbsp;
        // &nbsp;
      }
      <img src={upload}
           style={{ width: '50px', cursor: 'pointer' }}
           onClick={props.onSend}
      />
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

export default PostError
