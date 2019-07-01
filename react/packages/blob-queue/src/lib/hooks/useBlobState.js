import { useState } from 'react';

export default (initBlobs) => {
  const [blobs, setBlobs] = useState(initBlobs);

  return {
    blobs,
    addBlob: (blob) => {
      setBlobs([...blobs, blob]);
    },
  };
};
