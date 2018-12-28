import React, { Component } from 'react'
import { AppBar, Toolbar, withStyles } from '@material-ui/core/'

import UserButton from './UserButton'

const styles = (theme) => ({
  title: {
    flexGrow: 1,
  },
  logo: {
    width: '190px',
    height: '35px'
  },
  loginButton: {

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
});

class EventAppBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'U-HUB'
    }
  }

  componentDidMount() {

  }

  render() {
    const { classes } = this.props; // Const classes = this.props.classes

    return (
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <div className={classes.title}>
            <img src='/photos/logo.svg' className={classes.logo} alt='logo'/>
          </div>
            <UserButton />
          </Toolbar>
        </AppBar>
    );
  }
}


export default withStyles(styles)(EventAppBar);


