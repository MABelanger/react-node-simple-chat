import React from 'react';
import stopButton from './stopButton.svg';
import recordButton from './recordButton.svg';

function renderSecond(nbSecond) {
  return (
    <div style={{display: 'inline', fontSize: '30px'}}>
      ({ nbSecond }s)
    </div>
  )
}

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.chunkRecord = [];
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleRecordButton = this.handleRecordButton.bind(this);
    this.handleStopButton = this.handleStopButton.bind(this);
    this.handleStopStrem = this.handleStopStrem.bind(this);
    this.state = {
      isRecording: false,
      nbSecond: 0
    }
  }

  handleRecordButton() {
    if(this.props.mediaRecorder.state == 'inactive'){
      this.props.mediaRecorder.start(1000); // update chunk each second. (1000ms)
      this.props.mediaRecorder.onstop = this.handleStopStrem;
      this.props.mediaRecorder.ondataavailable = (e) => {
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

  handleStopButton() {
    console.log('this.props.mediaRecorder.state', this.props.mediaRecorder.state);
    if(this.props.mediaRecorder.state == 'recording'){
      this.props.mediaRecorder.stop();
    }
  }

  componentDidMount(){

  }

  handleStopStrem(){
    console.log("recorder stopped");
    let mimeType = this.props.mediaRecorder.mimeType;
    let blob = new Blob(this.chunkRecord, { 'type' : mimeType });
    this.chunkRecord = [];
    this.props.onStopStream(blob);

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
                <img style={{width: '80px'}} onClick={this.handleStopButton} src={stopButton} />
                { renderSecond(this.state.nbSecond) }
              </div>
            : this.props.isShowMicrophone && <img style={{width: '80px'}} onClick={this.handleRecordButton} src={recordButton} />
        }
      </div>
    );
  }
}

export default App;
