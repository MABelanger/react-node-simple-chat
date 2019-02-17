import React from 'react';
import playButton from './playButton.svg';

export class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.state = {
      isPlay: false
    };
  }

  handlePlay(e) {
    this.setState({
      isPlay: true
    })
  }

  render() {
    if(this.state.isPlay){
      return (
        <audio
          src={this.props.audioUrl}
          autoPlay={true}
          playsInline
          controls={true}
        />
      );
    }
    else {
      return (
        <div style={{width: '30px', height: '30px'}} onClick={this.handlePlay} dangerouslySetInnerHTML={{ __html: playButton }}></div>
      );
    }
  }
}

export default Audio;
