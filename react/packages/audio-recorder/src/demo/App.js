import React, { Component } from 'react';
import AudioRecorder from '../lib';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <AudioRecorder username={'devAudioRecorder'} />
    );
  }
}

export default App;
