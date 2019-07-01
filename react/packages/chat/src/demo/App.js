import React from 'react';

import Chat from '../lib';

import 'bootstrap/dist/css/bootstrap.css';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);

    this.state = {
      messages : []
    }
  }

  handleSend(message) {
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }));
  }

  render() {
    return (
      <Chat username={'user1'}
            messages={this.state.messages}
            onSend={this.handleSend}
      />
    );
  }
}

export default App;
