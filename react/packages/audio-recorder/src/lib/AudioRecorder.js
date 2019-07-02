import React from 'react';
import axios from 'axios';

import AudioRecord from './AudioRecord';
import AudioPreview from './AudioPreview';
import { saveAudioFileFomBlob } from './utils';

import microphone from './microphone.svg';
import save from './save.svg';
import upload from './upload.svg';

import styles from './styles.module.css';

//  add bootstrap
//  https://github.com/facebook/create-react-app/issues/301
import 'bootstrap/dist/css/bootstrap.css';


function postDataAxios(url = ``, data = {}, cbProgress) {
  return axios.request( {
    method: "post",
    url: url,
    data: data,
    onUploadProgress: cbProgress
  })
}

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

function sendAudio(blob, username, cbProgress){
  let promise = new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
        let base64data = reader.result;
        let message = {
          username: username,
          dataUri: base64data,
          sendDateIso: new Date().toISOString()
        }

        //postData('/audio', message)
        postDataAxios('/audio', message, cbProgress)
          .then((response) => {
            console.log('response', response)
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

function handleErrorMediaDevices(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

export class AudioRecorder extends React.Component {

  constructor(props) {
    super(props);
    this.handleStopStream = this.handleStopStream.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleEnableRecord = this.handleEnableRecord.bind(this);
    this.handleSuccessMediaDevices = this.handleSuccessMediaDevices.bind(this);
    this.handlePostProgress = this.handlePostProgress.bind(this);
    this.constraints = {
      audio: true,
      video: false
    };
    this.stream = null;
    this.state = {
      blob: null,
      isShowMicrophone: true,
      mediaRecorder: null,
      isEnableRecord: false,
      isPostError: false,
      isPostSending: false
    };
  }

  handleStopStream(blob) {
    this.setState({
      blob,
      // isShowMicrophone: true
    })
    this.handleSend()
  }

  handleDelete() {
    this.setState({
      blob: null,
      isShowMicrophone: true
    });
  }

  handleSuccessMediaDevices(stream) {
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
    let mediaRecorder = new MediaRecorder(stream);

    this.setState({
      mediaRecorder,
      isEnableRecord: true
    });
  }

  handleEnableRecord() {
    navigator.mediaDevices
      .getUserMedia(this.constraints)
      .then(this.handleSuccessMediaDevices)
      .catch(handleErrorMediaDevices);
  }

  handlePostProgress(p){
    console.log('p->', p);
    const percentProgress = ((p.loaded / p.total) * 100).toFixed(2);
    this.setState({
      percentProgress
    })
  }

  handleSend() {
    this.setState({
      isPostSending: true,
      isPostError: false
    });
    sendAudio(this.state.blob, this.props.username, this.handlePostProgress)
      .then((response)=>{
        // console.log(JSON.stringify(response));
        this.setState({
          blob: null,
          isShowMicrophone: true,
          isPostError: false,
          isPostSending: false
        });
      })
      .catch(()=>{
        this.setState({
          isPostError: true,
          isPostSending: false
        });
      })

  }

  render() {
    if(this.state.isPostSending) {
      return(
        <div>
          {this.state.percentProgress} %
          &nbsp;
          &nbsp;
          &nbsp;
          <img src={save}
               style={{ width: '30px', cursor: 'pointer' }}
               onClick={()=>{
                 saveAudioFileFomBlob (1, this.state.blob)
               }}
          />
        </div>
      )
    }
    if(this.state.isPostError) {
      return (
        <div>
          {
            // <AudioPreview blob={this.state.blob} />
            // &nbsp;
            // &nbsp;
          }
          <img src={upload}
               style={{ width: '50px', cursor: 'pointer' }}
               onClick={this.handleSend}
          />
          &nbsp;
          &nbsp;
          &nbsp;
          <img src={save}
               style={{ width: '30px', cursor: 'pointer' }}
               onClick={()=>{
                 saveAudioFileFomBlob (1, this.state.blob)
               }}
          />
        </div>
      )
    }
    return (
      <div>
        {
          this.state.isEnableRecord
            ? <AudioRecord onStopStream={this.handleStopStream}
                           mediaRecorder={this.state.mediaRecorder}
                           isShowMicrophone={this.state.isShowMicrophone}/>
            : <img style={{width: '80px'}} onClick={this.handleEnableRecord} src={microphone} />
        }

        {
          // this.state.blob &&
          //   <AudioPreview blob={this.state.blob} />
        }

        {
          // this.state.blob &&
          // <button className={styles['button-send']} onClick={this.handleSend}>Send</button>
        }
      </div>
    );
  }
}

export default AudioRecorder;
