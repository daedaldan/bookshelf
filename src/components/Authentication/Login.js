import React, { Component } from 'react';
import { Link, Navigate } from "react-router-dom";

import AuthService from '../../services/AuthService.js';
import './Auth.css';

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
      redirect: false,
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
            this.props.onLogin();
            this.setState({redirect: true});
          },
          // If any errors occur, show the error message(s).
          error => {
            // When CORS/network fails, `error.response` may be undefined.
            if (error.response && error.response.status === 400) {
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
      if (this.state.redirect) {
        return <Navigate to='/browse' />
      }

      return (
          <div className="auth-page">
            <form id="login" className="auth-form" onSubmit={this.handleLogin}>
              <div className="auth-form-card">
                <h1 className="auth-form-title">Welcome back</h1>
                <p className="auth-form-subtitle">Sign in to continue to Bookshelf</p>

                <div className="auth-field">
                  <label htmlFor="login-username">Username</label>
                  <input
                      id="login-username"
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      autoComplete="username"
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="login-password">Password</label>
                  <input
                      id="login-password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      autoComplete="current-password"
                  />
                </div>

                <button className="btn btn-primary auth-submit" disabled={this.state.loading}>
                  {this.state.loading ? "Signing in..." : "Sign in"}
                </button>

                {this.state.message && (
                  <p className="auth-message auth-message-error">{this.state.message}</p>
                )}

                <p className="auth-form-footer">
                  Don&apos;t have an account? <Link to="/register">Create one</Link>
                </p>
              </div>
            </form>
          </div>
      );
    }
}
