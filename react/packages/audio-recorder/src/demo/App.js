import React from 'react';

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
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

function dumpBase64(blob, username){
  console.log('______username', username);
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
          console.log(JSON.stringify(response));
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
  }
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
  }

  handleRecordButton() {
    if(this.mediaRecorder.state == 'inactive'){
      this.mediaRecorder.start(1000); // update chunk each second. (1000ms)
      this.mediaRecorder.onstop = this.handleStopStrem;
      this.mediaRecorder.ondataavailable = (e) => {
        console.log('push chunk');
        this.chunkRecord.push(e.data);
      }
    }
  }

  handleStopButton() {
    console.log('this.mediaRecorder.state', this.mediaRecorder.state);
    if(this.mediaRecorder.state == 'recording'){
      this.mediaRecorder.stop();
    }
  }

  componentDidMount(){
    navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess).catch(handleError);
  }

  handleStopStrem(){
    console.log("recorder stopped");
    let mimeType = this.mediaRecorder.mimeType;
    let blob = new Blob(this.chunkRecord, { 'type' : mimeType });
    this.chunkRecord = [];
    dumpBase64(blob, this.username);
    let audioURL = window.URL.createObjectURL(blob);
    this.refAudio.src = audioURL;
  }

  render() {
    return (
      <div>
        <audio
          ref={(el) => { this.refAudio = el; }}
          playsInline
          controls={true}
        />
        <button onClick={this.handleRecordButton}>Record</button>
        <button onClick={this.handleStopButton}>Stop</button>
      </div>
    );
  }
}

export default App;
