import React from 'react'
import { withStyles } from '@material-ui/core';

import Routes from '../components/Routes';
import EventAppBar from '../components/EventAppBar';
import { AuthConsumer} from "../context/AuthContext";
import HomePage from '../pages/HomePage'

const styles = (theme) => ({
    container: {
        display:'flex',
        flex: 1
    }
});

function Main(props) {
    const {classes} = props;
  return (
    <AuthConsumer>
      {
        ({currentUser}) => (
          currentUser === null ?
            <HomePage />:
            <div className={classes.container}>
              <EventAppBar />
              <Routes />
            </div>
        )
      }
    </AuthConsumer>
  )
}

export default withStyles(styles)(Main);
