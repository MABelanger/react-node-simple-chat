import React, { useState, useEffect } from 'react';

import Posts from './components/Posts';
import usePostState from './hooks/usePostState';

export const PostQueue = (props) => {

  const { posts, addPost, delPost } = usePostState([]);

  const { post } = props;
  useEffect(()=>{
    console.log('useEffect PostQueue')
    if(post && post.id) {
      addPost(post);
    }
  }, [ post ])


  function delPostAsync(postId) {
    console.log('delPostAsync');
    setTimeout(()=>{
      delPost(postId)
    },4000);
  }

  return (
    <>
      <Posts posts={posts} />
      <button onClick={()=>{delPostAsync(1)}}>del1</button>
      <button onClick={()=>{delPostAsync(2)}}>del2</button>
    </>
  )
}

export default PostQueue;
