import React, { Component } from 'react';
import { Link, Navigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';

import AuthService from '../../services/AuthService.js';
import './Auth.css';

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
      redirect: false,
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
              redirect: true,
              successful: true
            });
          },
          // If any errors occur, show the error message(s).
          error => {
            // When CORS/network fails, `error.response` may be undefined.
            if (error.response && error.response.status === 400) {
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
      if (this.state.redirect) {
        return <Navigate to='/login' />;
      }

      return (
          <div className="auth-page">
            <form id="register" className="auth-form" onSubmit={this.handleRegister}>
              <div className="auth-form-card">
                <h1 className="auth-form-title">Join Bookshelf</h1>
                <p className="auth-form-subtitle">Create an account to share reviews and discover new reads</p>

                {!this.state.successful && (
                  <>
                    <div className="auth-field-row">
                      <div className="auth-field">
                        <label htmlFor="register-firstName">First name</label>
                        <input
                            id="register-firstName"
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                            autoComplete="given-name"
                        />
                      </div>

                      <div className="auth-field">
                        <label htmlFor="register-lastName">Last name</label>
                        <input
                            id="register-lastName"
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                            autoComplete="family-name"
                        />
                      </div>
                    </div>

                    <div className="auth-field">
                      <label htmlFor="register-email">Email</label>
                      <input
                          id="register-email"
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          autoComplete="email"
                      />
                    </div>

                    <div className="auth-field">
                      <label htmlFor="register-username">Username</label>
                      <input
                          id="register-username"
                          type="text"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          autoComplete="username"
                      />
                    </div>

                    <div className="auth-field">
                      <label htmlFor="register-password">Password</label>
                      <input
                          id="register-password"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          autoComplete="new-password"
                      />
                    </div>

                    <button className="btn btn-primary auth-submit">
                      Create account
                    </button>
                  </>
                )}

                {this.state.message && (
                  <p className="auth-message auth-message-error">{this.state.message}</p>
                )}

                <p className="auth-form-footer">
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </div>
            </form>
          </div>
      );
    }
}
