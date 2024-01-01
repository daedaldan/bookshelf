import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import isEmail from 'validator/lib/isEmail';

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

// Used to check whether the user's email is valid.
const validEmail = value => {
  if (!isEmail(value)) {
    return (
        <div style={{marginTop: -20, marginBottom: 20}}>
          This is not a valid email.
        </div>
    );
  }
};

// Used to check whether the user's first or last name is valid.
const validName = value => {
  if (value.length < 1) {
    return (
        <div style={{marginTop: -20, marginBottom: 20}}>
          Your name must be at least 1 character long.
        </div>
    );
  }
};

// Used to check whether the user's username is valid.
const validUsername = value => {
  if (value.length < 5 || value.length > 20) {
    return (
        <div style={{marginTop: -20, marginBottom: 20}}>
          The username must be between 5 and 20 characters.
        </div>
    );
  }
};

// Used to check whether the user's password is valid.
const validPassword = value => {
  if (value.length < 8 || value.length > 40) {
    return (
        <div style={{marginTop: -20, marginBottom: 20}}>
          The password must be between 8 and 40 characters.
        </div>
    );
  }
};

/**
 * This component provides a form for the user to register a new account by
 * providing their full name, email, username, and password.
 */
class Register extends Component {
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

    this.form.validateAll();

    // If no errors occurred, register the user based on the form inputs.
    if (this.checkBtn.context._errors.length === 0) {
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

            this.props.history.push('/browse');
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
          <Form
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}
          >
            {/* Check if successful registration has already occurred before showing form inputs.*/}
            {!this.state.successful && (<div>
                <label htmlFor="firstName">First Name</label>
                <Input
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required, validName]}
                />

                <label htmlFor="username">Last Name</label>
                <Input
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required, validName]}
                />

                <label htmlFor="username">Email</label>
                <Input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, validEmail]}
                />

                <label htmlFor="username">Username</label>
                <Input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, validUsername]}
                />

                <label htmlFor="password">Password</label>
                <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, validPassword]}
                />

                <button>
                  Register
                </button>
              </div>
            )}

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

export default Register;
