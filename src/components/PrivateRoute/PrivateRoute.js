import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import AuthService from '../../services/AuthService.js';

/**
 * PrivateRoute is a Roue that renders the component only if the user is authenticated.
 * Otherwise, it redirects to the Login component.
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
          AuthService.getCurrentUser()
            ? <Component {...props} />
            : <Navigate to='/login' />
        )} />
    );
};

export default PrivateRoute;
