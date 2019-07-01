import React, { useEffect } from 'react';
import AppBlobQueue from './AppBlobQueue';


export const App = (props) => {

  useEffect(()=>{
    console.log('useEffect App')
  }, [])

  return (
    <AppBlobQueue />
  );
}

export default App;
