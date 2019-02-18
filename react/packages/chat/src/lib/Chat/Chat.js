import React from 'react';

import Conversation from './Conversation';
import Form from './Form';
import Header from './Header';
import ScroolBottom from './ScroolBottom';
import AudioRecorder from '@react-simple-chat/audio-recorder';


//  add bootstrap
//  https://github.com/facebook/create-react-app/issues/301
import 'bootstrap/dist/css/bootstrap.css';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
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

  handleSend(content) {
    if(content.length == 0){
      return false;
    }
    let message = {
      username: this.props.username,
      date: new Date(),
      content: content
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
        <AudioRecorder username={this.props.username} />
        <Form onSend={this.handleSend} />
        <ScroolBottom reference={(el) => { this.refScroolDown = el; }} />
      </div>
    );
  }
}

export default Chat;
