import React, { useState, useEffect } from 'react';

import BlobQueue from '../lib';

export const AppBlobQueue = (props) => {
  const [blob, setBlob] = useState('1');

  function addBlob(){
    setBlob(blob + '1');
  }

  return (
    <>
      <button onClick={addBlob}> add </button>
      <BlobQueue blob={blob}/>
    </>
  )
}

export default AppBlobQueue;
