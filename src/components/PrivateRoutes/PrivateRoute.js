import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RedirectRoute } from "../../components/PrivateRoutes/RedirectRoute.js";


export const PrivateRoute = ({ component: Component,path: path, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token')
            ? <Component {...props} /> 
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
/*
    if(1>3){
        console.log("Es mayor")
    }else
    {
        console.log("Es menor")
    }
    1 > 3 ? "Es mayor" : "Es menor"
*/