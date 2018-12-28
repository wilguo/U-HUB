import React, { Component } from 'react'

import PostPanel from './PostPanel'
import { Grid, withStyles, Typography } from '@material-ui/core';

import { getPosts } from '../../api/admin';
import { topics } from '../Routes'

const styles = (theme) => ({
  panelContainer: {
    maxWidth: 1000,
  },
  topicTitle: {
    paddingTop: '16px',
    paddingBottom: '16px'
  }
});

class Posts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: null
    }
  }

  async componentDidMount() {
    try {
      const posts = await getPosts();
      
      this.setState({posts: posts});
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  render() {
    const { posts } = this.state;
    const { classes } = this.props;

    return (
      <Grid container
        alignItems='center'
        align='center'
        justify='center'
        direction='row'
      >
        {
          posts === null ? <Typography>Loading Posts...</Typography> : topics.map(topic => {
            const postsOfThisTopic = posts.filter(post => {
              return post.post.topic === topic.path.toLowerCase().slice(1);
            });
            if(postsOfThisTopic.length > 0) {
              return (
                <div className={classes.panelContainer} key={topic.path}>
                  <Grid item xs={12} className={classes.topicTitle}>
                    <Typography variant='h6' align='left'>{topic.name}</Typography>
                  </Grid>
                  <Grid item xs={12} container>
                    {postsOfThisTopic.length === 0}
                    {postsOfThisTopic.map(post => <PostPanel post={post} key={post.post._id} />)}
                  </Grid>
                </div>
              )
            } else {
              return (<div key={topic.path}></div>)
            }
            
          })
        }
      </Grid>
    )
  }
}

export default withStyles(styles)(Posts);
