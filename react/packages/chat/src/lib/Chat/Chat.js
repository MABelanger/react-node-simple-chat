import React from 'react';

import Conversation from './Conversation';
import Form from './Form';
import Header from './Header';
import ScroolBottom from './ScroolBottom';
import * as utils from './utils';
import AudioRecorder from '@react-simple-chat/audio-recorder';


//  add bootstrap
//  https://github.com/facebook/create-react-app/issues/301
import 'bootstrap/dist/css/bootstrap.css';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleSendSeen = this.handleSendSeen.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  shouldComponentUpdate (nextProps, nextState){
    // if a user entered a new messages
    const isNewMessage = (this.props.messages.length != nextProps.messages.length);
    return isNewMessage;
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 10)
  }

  handleSendMessage(content) {
    if(content.length == 0){
      return false;
    }
    let message = {
      username: this.props.username,
      sendDateIso: new Date().toISOString(),
      content: content
    };
    this.props.onSend(message);
  }

  handleSendSeen(seenDateIso) {

    if(!this.props.messages) {
      return false;
    }

    // send only if not seen
    if(this.props.messages.length < 1) {
      return false;
    }

    let indexLast = this.props.messages.length - 1;
    if(this.props.messages[indexLast].seenDateIso) {
      return false;
    }

    if(!utils.isEnableSendSeen(this.props.messages, this.props.username )) {
      return false;
    }

    let message = {
      username: this.props.username,
      seenDateIso: seenDateIso
    };

    this.props.onSend(message);

  }

  scrollToBottom() {
    this.refScroolDown.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return(
      <div>
        <Header text={this.props.username} />
        <Conversation messages={this.props.messages}
                      username={this.props.username} />
        {
          <AudioRecorder username={this.props.username} />
        }
        <Form onSendMessage={this.handleSendMessage}
              onSendSeen={this.handleSendSeen}

        />
        <ScroolBottom reference={(el) => { this.refScroolDown = el; }} />
      </div>
    );
  }
}

export default Chat;
