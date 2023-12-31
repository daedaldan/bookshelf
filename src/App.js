import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home.js';
import Website from './components/Website/Website.js';
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

    this.logout = this.logout.bind(this);
  }

  // Check whether user is logged in upon rendering page
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    // If user is logged in, set state of currentUser to user's info
    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  // Logout user using AuthService and reset state of currentUser to undefined
  logout() {
    AuthService.logout();

    this.setState({
      currentUser: undefined
    });
  }

  render() {
    let navbarLinks;

    // Show different navbar links based on user authentication status
    if (this.state.currentUser) {
      // If user is logged in, display links to Logout and Home
      navbarLinks = (<ul>
                      <li>
                        <Logout logout={this.logout}/>
                      </li>
                      <li>
                        <Link to={"/home"}>
                          <button type="text">Home</button>
                        </Link>
                      </li>
                    </ul>);
    } else {
      // If no user is logged in, display links to Register and login
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
          // Display Bookshelf logo and navbarLinks in navigation bar
          <nav>
            <Link id="logo" to={"/"}>
              Bookshelf
            </Link>

            {navbarLinks}
          </nav>

          // Use Routes to render Route that matches current URL path
          <Routes>
            <Route exact path='/' element={<Website/>} />
            <PrivateRoute exact path='/home' element={<Home/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/register' element={<Register/>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
