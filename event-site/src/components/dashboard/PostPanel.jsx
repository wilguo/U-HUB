import React, { Component } from 'react'
import { ExpansionPanel, ExpansionPanelSummary, Typography, withStyles, ExpansionPanelDetails, Grid, TextField, Button, ListItem, ListItemText, ListItemSecondaryAction, List, Divider } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import { updatePost, deletePost, deleteComment } from '../../api/admin'
import moment from 'moment'

const styles = (theme) => ({
  header: {
    flexBasis: '33%',
    textAlign: 'left'
  },
  container: {
    display: 'flex',
  },
  largeField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  commentsContainer: {
    textAlign: 'left'
  }
})

class PostPanel extends Component {

  constructor(props) {
    super(props);

    const { post: { post, comments } } = props;

    this.state = {
      expanded: false,
      post: post,
      comments: comments,
      title: post.title,
      description: post.description,
      deleted: false,
    }

    this.resetEventFields(post)
  }

  resetEventFields = (post) => {
    if (post.type === 'event') {
      this.state.date = moment(post.eventBody.date).format('YYYY-MM-DDTHH:mm')
      this.state.location = post.eventBody.location;
    }
  }

  onValueChanged = function (attributeName) {
    return (event) => {
      this.setState({ [attributeName]: event.target.value });
    }
  }
  toggleExpanded = () => {
    if(!this.state.deleted) {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  onCancel = () => {
    const { post: { post } } = this.state;

    this.resetEventFields(post)

    this.setState({
      expanded: false,
      title: post.title,
      description: post.desription,
    })
  }

  onSave = async () => {
    const {  post: { _id }  } = this.state;
    const { title, description, date, location } = this.state;

    try {
      const response = await updatePost(_id, {
        title: title,
        description: description,
        date: date,
        location: location,
      });
      this.resetEventFields(response)
      this.setState({
        expanded: false,
        post: response
      });
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  onDelete = async () => {
    const { post: {_id }} = this.state;

    try {
      await deletePost(_id);
      
      this.setState({expanded: false, deleted: true})
    }catch(e) {
      console.log(e);
      alert(e);
    }
  }

  onDeleteComment = async (comment) => {
    const { comments } = this.state;

    try {
      await deleteComment(comment._id);
      const index = comments.findIndex(c => {
        return c._id.toString() === comment._id.toString()
      });

      comments.splice(index, 1);
      this.setState({comments: comments})
    } catch(e) {
      console.log(e);
      alert(e);
    }
  }

  render() {
    const { classes } = this.props;
    const { expanded, deleted, post, comments } = this.state;

    return (
      <ExpansionPanel expanded={!deleted && expanded} onChange={this.toggleExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant='body1'className={classes.header} color={deleted ? 'error' : 'default'}>{deleted ? 'Deleted' : post.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color='textSecondary' align='left'>{deleted ? '' : post.description}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form className={classes.container}>
            <Grid container spacing={16}>
              <Grid item container direction='row' spacing={16}>
                <Grid item xs={6} key='title'>
                  <TextField
                    id='title'
                    label='Title'
                    value={this.state.title}
                    onChange={this.onValueChanged('title')}
                    className={classes.largeField}
                  />
                </Grid>
                <Grid item xs={6} key='description'>
                  <TextField
                    multiline
                    id='description'
                    label='Description'
                    value={this.state.description}
                    onChange={this.onValueChanged('description')}
                    className={classes.largeField}
                  />
                </Grid>
              </Grid>
              {post.type === 'event' ?
                <Grid item container direction='row' spacing={16}>
                  <Grid item xs={6} key='date'>
                    <TextField
                      id='date'
                      label='Date'
                      type='datetime-local'
                      value={this.state.date}
                      onChange={this.onValueChanged('date')}
                      className={classes.largeField}
                    />
                  </Grid>
                  <Grid item xs={6} key='location'>
                    <TextField
                      id='location'
                      label='Location'
                      value={this.state.location}
                      onChange={this.onValueChanged('location')}
                      className={classes.largeField}
                    />
                  </Grid>
                </Grid>
                : null}
              <Grid item container justify='flex-end' spacing={16}>
                <Grid item key='cancel'>
                  <Button onClick={this.onCancel}>
                    <Typography>
                      Cancel
                    </Typography>
                  </Button>
                </Grid>
                <Grid item key='delete'>
                  <Button onClick={this.onDelete}>
                    <Typography color='error'>
                      Delete
                    </Typography>
                  </Button>
                </Grid>
                <Grid item key='save'>
                  <Button onClick={this.onSave}>
                    <Typography color='primary'>
                      Save
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid item container direction='column' className={classes.commentsContainer}>
                <Grid item key='comments'>
                  <Typography variant='h5'>
                    Comments
                  </Typography>
                </Grid>
                <Grid item key='comments-content'>
                  <List>
                    {comments.map(comment => (
                      <React.Fragment key={comment._id}>
                        <ListItem>
                          <ListItemText primary={comment.content} secondary={comment.username} />
                          <ListItemSecondaryAction>
                            <Button onClick={() => this.onDeleteComment(comment)}>
                              <Typography color='error'>Delete</Typography>
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>

                </Grid>

              </Grid>
            </Grid>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(PostPanel);