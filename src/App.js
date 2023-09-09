import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';

import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';
import AuthService from './services/auth.service.js';

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
                          <Button type="text">Home</Button>
                        </Link>
                      </li>
                    </ul>);
    } else {
      // If no user is logged in, display links to Register and login
      navbarLinks = (<ul>
                      <li>
                        <Link to={"/register"}>
                          <Button type="primary">Register</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/login"}>
                          <Button type="text">Login</Button>
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

          // Use Switch to render Route that matches current URL path
          <Switch>
            <Route exact path="/" component={Website} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
