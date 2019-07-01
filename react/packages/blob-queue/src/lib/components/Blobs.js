import React, { useEffect } from 'react';

export const Blobs = (props) => {

  return (
    props.blobs && props.blobs.map((blob, index)=>{
      return (
        <div key={index}>
          {blob}
        </div>
      );
    })
  )
}

export default Blobs;
