import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import AuthService from '../../services/AuthService.js';

/**
 * PrivateRoute is a Route that renders the component only if the user is authenticated.
 * Otherwise, it redirects to the Login component.
 */
const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = AuthService.getCurrentUser();

    return isAuthenticated ? (
            <Route {...rest} element={element}/>
        ) : (
            <Navigate to='/login' />
        );
};

export default PrivateRoute;
