import logo from './logo.svg';
import React, { Fragment, useEffect } from 'react';
import Opening from './Opening';

import './App.css';
import Login from "./Login";
import Register from './Register';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import AllVacations from "./AllVacations";
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Navbar from './Navbar';
import alert from './actions/alert';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[]);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Opening} />
          <div >
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/Vacations' component={AllVacations} />
              <PrivateRoute exact path='/admin' component={Dashboard} />

            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  )

}

export default App;
