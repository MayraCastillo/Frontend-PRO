import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/css/index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

//Views
import Home from './views/Home/Home';
import AboutUs from './views/AboutUs/AboutUs';
import ContactUs from './views/ContactUs/ContactUs';
import Orders from './views/Client/Orders/Orders';
import Restaurants from './views/Client/Restaurants/Restaurants';

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

ReactDOM.render(
  <Router>
   <div>
    <Switch>
       {/* Páginas */}
       <Route exact path='/' component={Home} />
       <Route path='/nosotros' component={AboutUs} />
       <Route path='/contacto' component={ContactUs} /> 
       <Route path='/pedido' component={Orders} />
       <Route path='/restaurantes' component={Restaurants} />
      </Switch>
   </div>
  </Router>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

