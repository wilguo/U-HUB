import React, { Component } from 'react'
import { Grid, Card, withStyles, CardHeader, CardContent, Typography } from '@material-ui/core';

import { getStats } from '../../api/admin'

const styles = (theme) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class Stats extends Component {

  constructor(props) {
    super(props)

    this.state = {
      posts: null,
      users: null,
      comments: null
    }
  }

  async componentDidMount() {
    try {
      const response = await getStats();
      this.setState(response);
    } catch(e) {
      console.log(e);
      alert(e);
    }
  } 

  render() {
    const { classes } = this.props;
    const { users, comments, posts} = this.state;

    return (
      <Grid item container className={classes.container} spacing={32}>
        <Grid item xs={3}>
          <Card>
            <CardHeader title='Number of Posts' />
            <CardContent>
              <Typography variant='h1'>
                {posts ? posts : '.'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader title='Number of Users' />
            <CardContent>
              <Typography variant='h1'>
                {users ? users : '.'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader title='Number of Comments' />
            <CardContent>
              <Typography variant='h1'>
                {comments ? comments : '.'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Stats);
