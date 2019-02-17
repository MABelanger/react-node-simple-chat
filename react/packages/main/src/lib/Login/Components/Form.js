import React from 'react';

function Form({ onValueChange, onSend, usernameValue, passwordValue }) {
  console.log('usernameValue, passwordValue', usernameValue, passwordValue);
  return(
    <form className="form" role="form" autoComplete="off" id="formLogin" noValidate="">
        <div className="form-group">
            <label htmlFor="username">username</label>
            <input type="text"
                   className="form-control form-control-lg rounded-0"
                   name="username"
                   value={usernameValue}
                   onChange={onValueChange} />
            <div className="invalid-feedback">Oops, you missed this one.</div>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password"
                   className="form-control form-control-lg rounded-0"
                   name="password"
                   value={passwordValue}
                   autoComplete="new-password"
                   onChange={onValueChange} />
            <div className="invalid-feedback">Enter your password too!</div>
        </div>
        <button type="submit"
                className="btn btn-success btn-lg float-right"
                id="btnLogin"
                onClick={onSend}> Login</button>
    </form>
  );
}

export default Form;
