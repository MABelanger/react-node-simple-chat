import React from 'react';

import AudioRecord from './AudioRecord';
import AudioPreview from './AudioPreview';

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

export class AudioRecorder extends React.Component {

  constructor(props) {
    super(props);
    this.handleStopStream = this.handleStopStream.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.state = {
      blob: null,
      isShowMicrophone: true
    };
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
        <AudioRecord onStopStream={this.handleStopStream}
                     isShowMicrophone={this.state.isShowMicrophone} />
        {
          this.state.blob &&
            <button className={styles['button-delete']} onClick={this.handleDelete}>X</button>
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
