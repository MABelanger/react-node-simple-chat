import React from 'react';

import AudioRecord from './AudioRecord';
import PostSending from './PostSending';
import PostError from './PostError';

import {
  saveAudioFileFomBlob,
  sendAudio,
  handleErrorMediaDevices,
  getPercentProgress
} from './utils';

import microphone from './svg/microphone.svg';
import styles from './styles.module.css';

//  add bootstrap
//  https://github.com/facebook/create-react-app/issues/301
import 'bootstrap/dist/css/bootstrap.css';

export class AudioRecorder extends React.Component {

  constructor(props) {
    super(props);
    this.handleStopStream = this.handleStopStream.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
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
    })
    this.handleSend()
  }

  // handleDelete() {
  //   this.setState({
  //     blob: null,
  //     isShowMicrophone: true
  //   });
  // }

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
    const percentProgress = getPercentProgress(p.loaded, p.total);
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
        <PostSending percentProgress={this.state.percentProgress}
                     onSave={()=>{
                       saveAudioFileFomBlob (1, this.state.blob)
                     }}
        />
      )
    }
    if(this.state.isPostError) {
      return (
        <PostError onSend={this.handleSend}
                   onSave={()=>{
                     saveAudioFileFomBlob (1, this.state.blob)
                   }}
        />
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
      </div>
    );
  }
}

export default AudioRecorder;
