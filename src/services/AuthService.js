import axios from "axios";

// URL for Django Rest API backend
const API_URL = "http://127.0.0.1:8000/user/";

/*
 * Handles user authentication by receiving, storing, deleting user token in web browser based on authentication status.
 */
class AuthService {
  // Logs in user by receiving token from backend and storing the username, password, and token in web browser.
  login(username, password) {
    // Send POST request to backend to generate token.
    return axios
        .post(API_URL + "token-auth/", {
          username: username,
          password: password
        })
        .then(response => {
          if (response.data.token) {
            // Save user's token and info in browser's local storage.
            let userData = response.data;
            userData['username'] = username;
            userData = JSON.stringify(userData);
            localStorage.setItem('user', userData);
          }

          return response.data;
        });
  }

  // Delete user token and info from local storage upon logout.
  logout() {
    localStorage.removeItem('user');
  }

  register(email, username, firstName, lastName, password) {
    // Send POST request with user's email, username, first name, last name, and password to create new User instance in backend.
    return axios
        .post(API_URL + "register/", {
          email: email,
          username: username,
          first_name: firstName,
          last_name: lastName,
          password: password
        });
  }

  // Get JSON representing current user's information.
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
