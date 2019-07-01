import React, { useState, useEffect } from 'react';

import Blobs from './components/Blobs';
import useBlobState from './hooks/useBlobState';

export const BlobQueue = (props) => {

  const { blobs, addBlob } = useBlobState([]);

  const { blob } = props;
  useEffect(()=>{
    console.log('useEffect BlobQueue');
    if(blob) {
      addBlob(blob);
    }
  }, [ blob ])

  return (
    <>
      <Blobs blobs={blobs}/>
    </>
  )
}

export default BlobQueue;
