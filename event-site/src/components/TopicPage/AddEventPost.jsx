import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthConsumer } from '../../context/AuthContext';
import { Typography, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { updateUserPosts } from '../../api/user'
import { createPost } from '../../api/posts'

export default class EventDialog extends React.Component {
  state = {
    open: false,
    titleText: '',
    descriptionText: '',
    img: null,
    date: '2018-05-24T10:30',
    location: '',
    uploading: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = async () => {
    const newPost = {
      type: 'event',
      topic: this.props.topic,
      title: this.state.titleText,
      description: this.state.descriptionText,
      media: this.state.img,
      date: this.state.date,
      location: this.state.location,
    }

    try {
      this.setState({uploading: true})
      const post = await createPost(newPost);
      await updateUserPosts(post.uid, post.title)
      this.props.handler(post);

      this.setState({ open: false, uploading: false });
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }


  render() {
    return (
      <div>
        <AuthConsumer>
          {({ currentUser }) => (
            currentUser ?
              <Button onClick={this.handleClickOpen} variant='outlined' color='primary'>Create New Event</Button> :
              null
          )}
        </AuthConsumer>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create New Event</DialogTitle>
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
              multiline = {true}
              value={this.state.descriptionText}
              onChange={(event) => this.setState({ descriptionText: event.target.value })}
            />
            <div>
              {this.state.img === null ? (<div>
                <input
                id='image-upload'
                type='file'
                style={{ display: 'none' }}
                accept='image/*'
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  this.setState({ img: event.target.files[0] })
                  }}
                  />
              <label htmlFor='image-upload'>
                <Button variant='contained' color='primary' component='span'>
                  Upload Image
              </Button>
              </label>
              </div>) : (<div>
                <Typography style={{display: 'inline-block'}}>{this.state.img.name}</Typography>
                <IconButton onClick={() => this.setState({img: null})}><Close/></IconButton>
              </div>) }
            </div>
            <TextField
              required
              autoFocus
              margin="dense"
              id="date"
              label="Date"
              type="datetime-local"
              fullWidth
              value={this.state.date}
              onChange={(event) => this.setState({ date: event.target.value })}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="location"
              label="Location"
              fullWidth
              multiline = {true} 
              value={this.state.location}
              onChange={(event) => this.setState({ location: event.target.value })}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <AuthConsumer>
              {({ currentUser }) => (this.state.uploading ? <CircularProgress size={25}/> : 
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
