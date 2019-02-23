import React from 'react';


import OpusMediaRecorder from 'opus-media-recorder';
// Use worker-loader
import Worker from 'opus-media-recorder/encoderWorker.js';
// Use file-loader that returns URL path
import OggOpusWasm from 'opus-media-recorder/OggOpusEncoder.wasm';
import WebMOpusWasm from 'opus-media-recorder/WebMOpusEncoder.wasm';


import AudioRecord from './AudioRecord';
import AudioPreview from './AudioPreview';
import microphone from './microphone.svg';

import styles from './styles.module.css';

//  add bootstrap
//  https://github.com/facebook/create-react-app/issues/301
import 'bootstrap/dist/css/bootstrap.css';

function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        credentials: 'include'
    })
    .then(response => response.json()); // parses response to JSON
}

function sendAudio(blob, username){
  let promise = new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
        let base64data = reader.result;
        let message = {
          username: username,
          dataUri: base64data
        }
        postData('/audio', message)
          .then((response) => {
            resolve(response);
          }) // JSON-string from `response.json()` call
          .catch((error) => {
            reject(error)
            console.error(error)
          });
    }
  });
  return promise;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function EnableOpusMediaRecorder() {
  // Check if MediaRecorder available.
  if (!window.MediaRecorder) {
    window.MediaRecorder = OpusMediaRecorder;
  }
  window.MediaRecorder = OpusMediaRecorder;
  // Check if a target format (e.g. audio/ogg) is supported.
  // else if (!window.MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
  //   window.MediaRecorder = OpusMediaRecorder;
  // }
}


export class AudioRecorder extends React.Component {

  constructor(props) {
    super(props);
    this.handleStopStream = this.handleStopStream.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleEnableRecord = this.handleEnableRecord.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.constraints = {
      audio: true,
      video: false
    };
    this.stream = null;
    this.state = {
      blob: null,
      isShowMicrophone: true,
      mediaRecorder: null,
      isEnableRecord: false
    };
    // window.MediaRecorder = OpusMediaRecorder;
    console.log('window', window);
  }

  handleStopStream(blob) {
    this.setState({
      blob,
      isShowMicrophone: false
    })
  }

  handleDelete() {
    this.setState({
      blob: null,
      isShowMicrophone: true
    });
  }

  handleSuccess(stream) {
    const audioTracks = stream.getAudioTracks();
    console.log('Got stream with constraints:', this.constraints);
    console.log('Using audio device: ' + audioTracks[0].label);
    stream.oninactive = function() {
      console.log('Stream ended');
    };
    this.stream = stream;
    // let recordOptions = {
    //   audioBitsPerSecond : 128000,
    //   mimeType : 'audio/ogg'
    // }


    // Non-standard options
    const workerOptions = {
      encoderWorkerFactory: _ => new Worker(),
      OggOpusEncoderWasmPath: OggOpusWasm,
      WebMOpusEncoderWasmPath: WebMOpusWasm
    };


    let mediaRecorder = new OpusMediaRecorder(stream, {}, workerOptions);

    // let mediaRecorder = new MediaRecorder(stream);

    this.setState({
      mediaRecorder,
      isEnableRecord: true
    });
  }

  handleEnableRecord() {
    navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess).catch(handleError);
  }

  handleSend() {
    sendAudio(this.state.blob, this.props.username)
      .then((response)=>{
        console.log(JSON.stringify(response));
        this.setState({
          blob: null,
          isShowMicrophone: true
        });
      })
      .catch(()=>{})

  }

  render() {
    return (
      <div>
        {
          this.state.isEnableRecord
            ? <AudioRecord onStopStream={this.handleStopStream}
                           mediaRecorder={this.state.mediaRecorder}
                           isShowMicrophone={this.state.isShowMicrophone}/>
            : <img style={{width: '40px'}} onClick={this.handleEnableRecord} src={microphone} />
        }

        {
          this.state.blob &&
            <button className={styles['button-delete']} onClick={this.handleDelete}>Delete</button>
        }
        {
          this.state.blob &&
            <AudioPreview blob={this.state.blob} />
        }

        {
          this.state.blob &&
            <button className={styles['button-send']} onClick={this.handleSend}>Send</button>
        }
      </div>
    );
  }
}

export default AudioRecorder;
