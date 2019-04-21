import React from 'react';
import { Redirect } from 'react-router-dom';

import ChatContainer from './ChatContainer';

import socketIOClient from "socket.io-client";

function promiseUser(){
  return fetch('/user',{
    credentials: 'include'
  })
    .then(async (response)=>{
      try {
        let jsonResponse = await response.json()
        return Promise.resolve(jsonResponse)

      } catch(e) {
        return Promise.reject('/user parsing error');
      }
    });
}

const INIT_STATE = {
  username: null,
  isInitState: true
};

export class UserWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentDidMount() {
    promiseUser()
      .then((user)=>{
        if(!user.error) {
          this.setState({
            username: user.username,
            isInitState: false
          });
        } else {
          this.setState({
            username: null,
            isInitState: false
          });
        }
      })
      .catch((error)=>{
        console.error(error);
      });
  }

  componentDidUpdate() {

  }

  render() {
    if(!(this.state.username || this.state.isInitState)) {
      return (<Redirect to='/login'/>);
    }

    console.log('this.state.username', this.state.username);
    if(this.state.username) {
      return(
        <div>
          <ChatContainer username={this.state.username} />
        </div>
      );
    }

    // render nothing while fetching user
    return null;

  }
}

export default UserWrapper;
