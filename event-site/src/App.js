import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp'

import './App.css';
import { AuthProvider, AuthConsumer } from './context/AuthContext';

const styles = (theme) => ({
  root: {
    display: 'flex'
  },
});

class App extends Component {

  render() {
    const { classes } = this.props;

    return (
      <AuthProvider>
        <div className={classes.root}>
          <AuthConsumer>
            {({ authenticated }) => {
              return (authenticated !== undefined ?
                <Switch>
                  <Route path='/dashboard' component={Dashboard} />
                  <Route path='/signUp' component={SignUp} />
                  <Route path='/login' component={Login} />
                  <Route path='/' component={Main} />
                </Switch> : <div></div>
              );
            }}
          </AuthConsumer>
        </div>
      </AuthProvider>
    );
  }
}


export default withStyles(styles)(App);
