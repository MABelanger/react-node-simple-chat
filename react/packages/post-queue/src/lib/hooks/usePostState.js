import { useState } from 'react';

export default (initBlobs) => {
  const [blobs, setBlobs] = useState(initBlobs);

  function addBlob(blob) {
    setBlobs([...blobs, blob]);
  }

  function delBlob(blobId) {
    console.log('blobs', blobs);
    const newBlobs = blobs.filter((blob, index) => blob.id !== blobId);
    setBlobs(newBlobs);
  }
  return {
    blobs,
    addBlob,
    delBlob
  };
};
