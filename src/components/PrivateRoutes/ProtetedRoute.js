import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtetedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        
        localStorage.getItem('token')
            ? <Redirect to={{ pathname: '/admin/dashboard', state: { from: props.location } }} />
            : <Component {...props} /> 
    )} />
) 