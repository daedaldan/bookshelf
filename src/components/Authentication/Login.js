import React, { Component } from 'react';

import AuthService from '../../services/AuthService.js';
import Register from "./Register";

// Used to validate whether a login form field has been filled out or not.
const required = value => {
  if (value) {
    return true;
  } else {
    alert("This field is required.");
  }
};

/**
 * This component provides a form for the user to login to their account by
 * providing their username and password.
 */
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    }
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

    if (required(this.state.username) && required(this.state.password)) {
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
    } else { // If form validation is unsuccessful, allow the user to resubmit the form.
      this.setState({
        loading: false
      });
    }
  }

  render() {
      return (
          <form onSubmit={this.handleLogin}>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
            />

            <button disabled={this.state.loading}>
              Login
            </button>

            {/* Show message(s), if any exist. */}
            {this.state.message ? this.state.message : ""}
          </form>
      );
    }
}
