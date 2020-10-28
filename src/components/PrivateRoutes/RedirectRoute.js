import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const RedirectRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        
        localStorage.getItem('token')
            ? <Redirect to={{ pathname: '/admin/user', state: { from: props.location } }} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
) 