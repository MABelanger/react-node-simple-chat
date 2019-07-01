import React, { useEffect } from 'react';
import AppPostQueue from './AppPostQueue';


export const App = (props) => {

  useEffect(()=>{
    console.log('useEffect App')
  }, [])

  return (
    <AppPostQueue />
  );
}

export default App;
