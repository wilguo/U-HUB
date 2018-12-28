import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AuthConsumer } from '../../context/AuthContext';
import { createPost } from '../../api/posts'
import { updateUserPosts } from '../../api/user'

export default class DiscussionDialog extends React.Component {
  state = {
    open: false,
    titleText: '',
    descriptionText: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = async () => {
    const newPost = {
      type: 'discussion',
      topic: this.props.topic,
      title: this.state.titleText,
      description: this.state.descriptionText,
    }

    try {
      const post = await createPost(newPost);
      await updateUserPosts(post.uid, post.title)
      this.props.handler(post);

      this.setState({ open: false });
    } catch(e) {
      alert(e);
      console.log(e);
    }

  }


  render() {
    return (
      <div>
        <AuthConsumer>
        {({currentUser}) => (
          currentUser ?
          <Button onClick={this.handleClickOpen} variant='outlined' color='primary'>Create New Discussion</Button>:
          null
        )}
        </AuthConsumer>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create New Discussion</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="title"
              label="Post Title"
              fullWidth
              multiline = {true} 
              value={this.state.titleText}
              onChange={(event) => this.setState({ titleText: event.target.value })}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              fullWidth
              value={this.state.descriptionText}
              multiline = {true}
              onChange={(event) => this.setState({ descriptionText: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <AuthConsumer>
            {({currentUser}) => (
            <Button onClick={() => this.handleSubmit()} color="primary">
              Submit
            </Button>
            )}
            </AuthConsumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
