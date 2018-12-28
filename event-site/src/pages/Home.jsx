import React, { Component } from 'react'
import { Grid, withStyles, Typography, Divider } from '@material-ui/core/'
import PostCard from '../components/post/PostCard';
import UpcomingEventsCard from '../components/UpcomingEventsCard'
import PopularTopicsCard from '../components/PopularTopicsCard'
import { AuthConsumer } from '../context/AuthContext';
import WelcomePageBackground from '../components/WelcomePageBackground';
import { getSubscriptions } from '../api/posts'

const styles = (theme) => ({
  leftContainer: {
    height: '100vh',
    position: 'fixed',
    left: '300px',
    top: 0,
    bottom: 0,
    right: '35%',
  },
  leftPageWrapper: {
    display: 'flex',
    height: '100%',
  },
  spacer: theme.mixins.toolbar,
  rightContainer: {
    position: 'absolute',
    left: '65%',
    right: 0,
    paddingLeft: '30px',
    paddingRight: '30px'
  }
});

class Home extends Component {

  render() {
    const { classes } = this.props;
    return (
      <AuthConsumer>
        {({ currentUser }) => {
            return (<div>{currentUser !== null ?
              <div>
                <WelcomePageBackground />
                <div className={classes.leftContainer}>
                  <div className={classes.spacer} />
                  <div className={classes.leftPageWrapper}>
                    <WelcomePageLeft currentUser={currentUser} />
                  </div>
                </div>
                <div className={classes.rightContainer}  >
                  <WelcomePageRight currentUser={currentUser} />
                </div>
              </div> : <div></div>}</div>)
        }}
      </AuthConsumer>
    )
  }
}

class WelcomePageRight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null
    }
  }
  componentWillMount() {
    this._mounted = true;
  }
  async componentDidMount() {
    try {
      const posts = await getSubscriptions();
      if (this._mounted) {
        this.setState({ posts: posts });
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const { posts } = this.state;
    const { currentUser } = this.props;

    if (currentUser.topics.length === 0) {
      return (<div>You haven't subscribed to any topics</div>)
    } else if (posts === null) {
      return (<div>Loading posts...</div>)
    }

    return (<Grid container
      alignItems='center'
      align='center'
      justify='center'
      direction='row'
      spacing={16}
    >
      <Grid item xs={12} container alignItems='flex-start'>
        <Grid item>
          <Typography variant='h4'>Your Subscriptions</Typography>
        </Grid>
      </Grid>
      {posts.map((post) => (
        <Grid item xs={12} key={post._id}>
          <PostCard post={post} />
        </Grid>))}
    </Grid>)
  }

}


class WelcomePageLeft extends Component {
  render() {
    const { currentUser } = this.props

    const time = new Date()
    let greeting = null;
    if (time.getHours() < 12) {
      greeting = 'Morning'
    } else if (time.getHours() < 17) {
      greeting = 'Afternoon'
    } else {
      greeting = 'Evening'
    }

    return (
      <Grid container
        alignItems='center'
        alignContent='center'
        align='center'
        style={{ flex: 1 }}
        justify='center'
        direction='row'
        spacing={32}
      >
        <Grid item xs={12}>
          <Typography variant='h1'>Good {greeting}, {currentUser.firstName}</Typography>
        </Grid>
        <Grid item xs={10}>
          <Divider variant='inset' />
        </Grid>
        <Grid item container xs={12} spacing={32}>
          <Grid item xs={12} xl={6}>
            <UpcomingEventsCard />
          </Grid>

          <Grid item xs={12} xl={6}>
            <PopularTopicsCard />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(Home);