import React from 'react';
import recordButton from './recordButton.svg';
import stopButton from './stopButton.svg';
import microphone from './microphone.svg';


function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function renderSecond(nbSecond) {
  return (
    <div style={{display: 'inline'}}>
      ({ nbSecond }s)
    </div>
  )
}

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.stream = null;
    this.mediaRecorder = null;
    this.username = 'alex';
    this.chunkRecord = [];
    this.constraints = {
      audio: true,
      video: false
    }
    this.handleSuccess = this.handleSuccess.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleRecordButton = this.handleRecordButton.bind(this);
    this.handleStopButton = this.handleStopButton.bind(this);
    this.handleStopStrem = this.handleStopStrem.bind(this);
    this.state = {
      isRecording: false,
      nbSecond: 0
    }
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
    this.mediaRecorder = new MediaRecorder(stream);

    if(this.mediaRecorder.state == 'inactive'){
      this.mediaRecorder.start(1000); // update chunk each second. (1000ms)
      this.mediaRecorder.onstop = this.handleStopStrem;
      this.mediaRecorder.ondataavailable = (e) => {
        console.log('push chunk');
        this.chunkRecord.push(e.data);
        this.setState(prevState => ({
          nbSecond: prevState.nbSecond + 1
        }));
      }
      this.setState({
        isRecording: true
      })
    }

  }

  handleRecordButton() {
    navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess).catch(handleError);
  }

  handleStopButton() {
    console.log('this.mediaRecorder.state', this.mediaRecorder.state);
    if(this.mediaRecorder.state == 'recording'){
      this.mediaRecorder.stop();
    }
  }

  componentDidMount(){

  }

  handleStopStrem(){
    console.log("recorder stopped");
    let mimeType = this.mediaRecorder.mimeType;
    let blob = new Blob(this.chunkRecord, { 'type' : mimeType });
    this.chunkRecord = [];
    this.props.onStopStream(blob);

    // send blob...

    this.setState({
      isRecording: false,
      nbSecond: 0
    })
  }

/*
<audio
  ref={(el) => { this.refAudio = el; }}
  playsInline
  controls={true}
/>
*/
  render() {
    return (
      <div style={{display:'inline'}}>
        {
          this.state.isRecording
            ? <div style={{display: 'inline'}}>
                <img style={{width: '40px'}} onClick={this.handleStopButton} src={stopButton} />
                { renderSecond(this.state.nbSecond) }
              </div>
            : this.props.isShowMicrophone && <img style={{width: '40px'}} onClick={this.handleRecordButton} src={microphone} />
        }

      </div>
    );
  }
}

export default App;
