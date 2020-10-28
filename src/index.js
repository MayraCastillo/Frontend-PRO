
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import routes from "routes.js";

import Login from "./views/Login/Login.js";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoute.js";
import { ProtetedRoute } from "./components/PrivateRoutes/ProtetedRoute.js";
import { RedirectRoute } from "./components/PrivateRoutes/RedirectRoute.js";
//import ReactNotification from 'react-notifications-component';
//import 'react-notifications-component/dist/theme.css'

const hist = createBrowserHistory();


const switchRoutes = (
  <Switch>
    { routes[0].layout === "/admin"? 
      <PrivateRoute
        path={routes[0].layout + routes[0].path}
        component={Admin}
      />:null
    }
    { routes[1].layout === "/admin"? 
      <PrivateRoute
        path={routes[1].layout + routes[1].path}
        component={Admin}
      />:null
    }
    
    { routes[2].layout === "/admin"? 
      <PrivateRoute
        path={routes[2].layout + routes[2].path}
        component={Admin}
      />:null
    }
     { routes[3].layout === "/admin"? 
      <PrivateRoute
        path={routes[3].layout + routes[3].path}
        component={Admin}
      />:null
    }
  


        
    <ProtetedRoute path="/login" component={Login} />
    <RedirectRoute path="/" component={Admin} />
  </Switch>
);
ReactDOM.render(
  <Router history={hist}>
    
    <Switch>{switchRoutes}</Switch>    
  </Router>,
  document.getElementById("root")
);
/*
<Router history={hist}>
    
<Switch>  
  <Route path="/admin" component={Admin} />
  <Route path="/rtl" component={RTL} />
  <Redirect from="/" to="/admin/dashboard" />
</Switch>
</Router>,*/