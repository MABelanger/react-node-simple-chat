import React, { useEffect } from 'react';
import * as utils from './utils';

export const Posts = (props) => {

  return (
    props.posts && props.posts.map((post, index)=>{
      return (
        <div key={index}>
          {post.id} in progress...
        </div>
      );
    })
  )
}

export default Posts;
