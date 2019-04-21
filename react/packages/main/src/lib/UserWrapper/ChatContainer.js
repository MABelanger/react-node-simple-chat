import React from 'react';

import Chat from '@react-simple-chat/chat';

import socketIOClient from "socket.io-client";

function promiseOldMessages(){
  return fetch('/messages.json',{
    credentials: 'include'
  })
    .then(async (response)=>{
      try {
        let jsonResponse = await response.json()
        return Promise.resolve(jsonResponse)

      } catch(e) {
        console.log('messages.json parsing error');
        return Promise.resolve([]);
      }
    })
}

export class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.listenConnectIo = this.listenConnectIo.bind(this);
    this.listenThreadIo = this.listenThreadIo.bind(this);
    this.handleSend = this.handleSend.bind(this);

    // connect to server
    this.socket = socketIOClient.connect();
    this.state = {
      messages : []
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
    promiseOldMessages().then((messages) => {
      const initMessages = (messages.length > 0) ? messages : [];
      if(!messages.error) {
        this.setState({
          messages: initMessages
        });
      } else {
        this.setState({
          messages: []
        });
      }
    });
    this.listenConnectIo();
    this.listenThreadIo();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.username && prevState.username) {
      return ({ username: nextProps.username }) // <- this is setState equivalent
    } else
      return null;
  }

  listenConnectIo() {
    this.socket.on("connect", (data) => {
      this.socket.emit("join", "Hello server from client");
    });
  }

  listenThreadIo() {
    // listener for 'thread' event, which updates messages
    this.socket.on("thread", (message) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }));

    });
  }

  handleSend(message) {
    this.socket.emit("message", message);
  }


  render() {
    return(
      <div>
        <Chat username={this.props.username}
              messages={this.state.messages}
              onSend={this.handleSend}
        />
      </div>
    );
  }
}

export default ChatContainer;
