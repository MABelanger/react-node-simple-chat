import React, { useState, useEffect } from 'react';

import PostQueue from '../lib';

let counter = 0;

export const AppPostQueue = (props) => {

  let [post, setPost] = useState({id:0});

  function addPost(){
    counter += 1;
    setPost({
      id: counter
    });
  }

  return (
    <>
      <button onClick={addPost}> add </button>
      <PostQueue post={post}/>
    </>
  )
}

export default AppPostQueue;
