import React from 'react';
import FormComponent from './Form';

function Login({ onValueChange, onSend, usernameValue, passwordValue }) {
  return(
    <div className="container py-5">
        <div className="row">
            <div className="col-md-12">
                <h2 className="text-center text-white mb-4">Bootstrap 4 Login Form</h2>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card rounded-0">
                            <div className="card-header">
                                <h3 className="mb-0">Login</h3>
                            </div>
                            <div className="card-body">
                              <FormComponent onValueChange={onValueChange}
                                             onSend={onSend}
                                             usernameValue={usernameValue}
                                             passwordValue={passwordValue} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;
