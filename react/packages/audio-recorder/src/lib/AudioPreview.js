import React from 'react';

export class AudioPreview extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate (nextProps, nextState){
    // if a user entered a new messages
    const isNewBlob = (this.props.blob != nextProps.blob);
    return isNewBlob;
  }

  render() {
    let audioURL = null;
    console.log('this.props.blob', this.props.blob);
    if(this.props.blob){
      audioURL = window.URL.createObjectURL(this.props.blob);
    }
    return (
        <audio
          style={{verticalAlign: 'bottom'}}
          src={audioURL}
          playsInline
          controls={true}
        />
    );
  }
}

export default AudioPreview;
