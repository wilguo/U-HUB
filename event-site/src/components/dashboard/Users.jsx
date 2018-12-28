import React, { Component } from 'react'
import { Grid, withStyles } from '@material-ui/core';
import UserPanel from './UserPanel';

import { getUsers } from '../../api/admin'

const styles = () => ({
  panelContainer: {
    maxWidth: 600
  },
});

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: null
    }
  }

  async componentDidMount() {
    try {
      const users = await getUsers();

      this.setState({ users: users })
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container
        alignItems='center'
        align='center'
        justify='center'
        direction='row'
        spacing={16}
      >
        <Grid item xs={12}>
          <div className={classes.panelContainer}>
            {this.state.users ? this.state.users.map(user => <UserPanel user={user} key={user._id} />) : null}
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Users);
