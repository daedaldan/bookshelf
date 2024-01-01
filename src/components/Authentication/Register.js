import React, { Component } from 'react';

import isEmail from 'validator/lib/isEmail';

import AuthService from '../../services/AuthService.js';

// Used to validate whether a login form field has been filled out or not.
const required = value => {
  if (!value) {
    return alert("This field is required.");
  }
  return true;
};

// Used to check whether the user's email is valid.
const validEmail = value => {
  if (!isEmail(value)) {
    return alert("This is not a valid email.");
  }
  return true;
};

// Used to check whether the user's first or last name is valid.
const validName = value => {
  if (value.length < 1 || value.length > 20) {
    return alert("Your first and last name must each be between 1 and 20 characters.");
  }
  return true;
};

// Used to check whether the user's username is valid.
const validUsername = value => {
  if (value.length < 5 || value.length > 20) {
    return alert("The username must be between 5 and 20 characters.");
  }
  return true;
};

// Used to check whether the user's password is valid.
const validPassword = value => {
  if (value.length < 8 || value.length > 40) {
    return alert("The password must be between 8 and 40 characters.");
  }
  return true;
};

/**
 * This component provides a form for the user to register a new account by
 * providing their full name, email, username, and password.
 */
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      successful: false,
      message: ""
    }
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
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

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    if (required(this.state.email) &&
        required(this.state.username) &&
        required(this.state.firstName) &&
        required(this.state.lastName) &&
        required(this.state.password) &&
        validEmail(this.state.email) &&
        validName(this.state.firstName) &&
        validName(this.state.lastName) &&
        validUsername(this.state.username) &&
        validPassword(this.state.password)) {
      AuthService.register(
          this.state.email,
          this.state.username,
          this.state.firstName,
          this.state.lastName,
          this.state.password
      ).then(
          // If the registration is successful, redirect the user to the Login page.
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            });

            this.props.history.push('/login');
            window.location.reload();
          },
          // If any errors occur, show the error message(s).
          error => {
            if (error.response.status === 400) {
              this.setState({
                successful: false,
                message: "The username or email you used is already associated with an account. Please try a new one."
              });
            } else {
              const resMessage =
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString();

              this.setState({
                successful: false,
                message: resMessage
              });
            }
          }
      );
    }

  }

  render() {
      return (
          <form onSubmit={this.handleRegister}>
            {/* Check if successful registration has already occurred before showing form inputs.*/}
            {!this.state.successful && (<div>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                />

                <label htmlFor="username">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                />

                <label htmlFor="username">Email</label>
                <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                />

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

                <button>
                  Register
                </button>
              </div>
            )}

            {/* Show message(s), if any exist. */}
            {this.state.message ? this.state.message : ""}
          </form>
      );
    }
}
