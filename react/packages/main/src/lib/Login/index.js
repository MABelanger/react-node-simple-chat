import React from 'react';
import LoginComponent from './Components/Login';
import { Redirect } from 'react-router-dom';

const INIT_FORM_STATE = {
  username: '',
  password: '',
  isLoginSuccess: false
};

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

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.state = INIT_FORM_STATE;
  }

  handleValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSend(e) {
    e.preventDefault();
    let formValues = this.state;
    postData('/login', formValues)
      .then((response) => {

        console.log(JSON.stringify(response));
        if(response.user) {
          console.log('success', response.user);
          this.setState({
            isLoginSuccess: true
          });

        } else if(response.error) {
          console.log('login error', response.error);
        } else {
          console.log('no data need to redirect', response);
        }

      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.isLoginSuccess) {
      return <Redirect to='/'/>;
    }
    return(
      <div>
        <LoginComponent onValueChange={this.handleValueChange}
                        onSend={this.handleSend}
                        usernameValue={this.state.username}
                        passwordValue={this.state.password} />
      </div>
    );
  }


}
export default Login;
