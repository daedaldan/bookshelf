import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AuthService from '../../services/AuthService.js';

// Used to validate whether a login form field has been filled out or not.
const required = value => {
  if (!value) {
    return (
        <div style={{marginTop: -20, marginBottom: 20}}>
          This field is required.
        </div>
    );
  }
};

/**
 * This component provides a form for the user to login to their account by
 * providing their username and password.
 */
class Login extends Component {
  constructor(props) {
    console.log("#1");
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    console.log("#2");
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    }
    console.log("#3");
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    // If no errors occurred, log in the user based on the form inputs.
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
          // If the login is successful, redirect the user to the Home page.
          () => {
            this.props.history.push('/browse');
            window.location.reload();
          },
          // If any errors occur, show the error message(s).
          error => {
            if (error.response.status === 400) {
              this.setState({
                loading: false,
                message: "Your username or password is incorrect. Please try again."
              });
            } else {
              const resMessage =
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString();

              this.setState({
                loading: false,
                message: resMessage
              });
            }
          }
      );
    } else { // If the form validation is unsuccessful, do nothing.
      this.setState({
        loading: false
      });
    }
  }

  render() {
      return (
          <Form
              onSubmit={this.handleLogin}
              ref={c => {
                this.form = c;
              }}
          >
            <label htmlFor="username">Username</label>
            <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
            />

            <label htmlFor="password">Password</label>
            <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
            />

            <button disabled={this.state.loading}>
              Login
            </button>

            {/* Show message(s), if any exist. */}
            {this.state.message && (
                <p style={{marginTop: 20}}>this.state.message</p>
            )}

            {/* CheckButton is used to check for errors with the form and is not displayed. */}
            <CheckButton
                style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
            />
          </Form>
      );
    }
}

export default Login;
