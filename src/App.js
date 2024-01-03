import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import LandingPage from './components/LandingPage/LandingPage.js';

import Browse from './components/Browse/Browse.js';
import Book from './components/Browse/Books/Book.js';
import Person from './components/Browse/People/Person.js';

import Profile from './components/Profile/Profile.js';

import Login from './components/Authentication/Login.js';
import Register from './components/Authentication/Register.js';
import Logout from './components/Authentication/Logout.js';

import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';
import AuthService from './services/AuthService.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // Check whether user is logged in upon mounting page.
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    // If user is logged in, set state of currentUser to user's info.
    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  // Reset state of currentUser after logging in.
  login() {
    const user = AuthService.getCurrentUser();

    this.setState({
      currentUser: user
    });
  }

  // Logout user using AuthService and reset state of currentUser to undefined.
  logout() {
    AuthService.logout();

    this.setState({
      currentUser: undefined
    });
  }

  render() {
    let navbarLinks;

    // Show different navbar links based on user authentication status.
    if (this.state.currentUser) {
      // If user is logged in, display links to Logout, Browse, and Profile.
      navbarLinks = (<ul>
                      <li>
                        <Logout logout={this.logout}/>
                      </li>
                      <li>
                        <Link to={"/browse"}>
                          <button type="text">Browse</button>
                        </Link>
                        <Link to={"/profile"}>
                          <button type="text">Profile</button>
                        </Link>
                      </li>
                    </ul>);
    } else {
      // If no user is logged in, display links to Register and Login.
      navbarLinks = (<ul>
                      <li>
                        <Link to={"/register"}>
                          <button type="primary">Register</button>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/login"}>
                          <button type="text">Login</button>
                        </Link>
                      </li>
                    </ul>);
    }

    // Return elements to be rendered
    return (
      <div>
        <BrowserRouter>
          {/* Display Bookshelf logo and navbarLinks in navigation bar. */}
          <nav>
            <Link id="logo" to={"/"}>
              Bookshelf
            </Link>

            {navbarLinks}
          </nav>

          {/* Use Routes to render Route that matches current URL path. */}
          <Routes>
            <Route exact path='/' element={<LandingPage/>} />
            <Route exact path='/browse' element={<PrivateRoute element={<Browse/>}/>} />
            <Route exact path='/book' element={<PrivateRoute element={<Book/>}/>} />
            <Route exact path='/person' element={<PrivateRoute element={<Person/>}/>} />
            <Route exact path='/profile' element={<PrivateRoute element={<Profile/>}/>} />
            <Route exact path='/login' element={<Login onLogin={this.login}/>} />
            <Route exact path='/register' element={<Register/>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
