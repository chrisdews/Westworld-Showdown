import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginComponent from './LoginComponent';


 ReactDOM.render((
  <Router>
    <React.Fragment>
      <Route exact path="/" component={App} />
      <Route exact path="/welcome" component={LoginComponent} />
      {/* <Route exact path="/login" component={Login} /> */}
    </React.Fragment>
  </Router>),
  document.getElementById('root')
 );
 
 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
