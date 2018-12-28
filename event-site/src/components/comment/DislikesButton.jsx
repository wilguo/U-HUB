import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import {getComment} from '../../api/comments'
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {getUser} from '../../api/user'

/*
Dislikes Button on the right of the website's post, which keeps track of the users who have disliked the post
 */
const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

function ListOfDislikes(props) {
    const { users } = props;
    if (users.length > 0) {
        return users.map(user => (<ListItemText primary={user.firstName + " " + user.lastName} key={user._id}/>));
    } else {
        return (
            <Typography variant='h6' align='center' color='textSecondary'>No Dislikes</Typography>
        );
    }
}


class DislikesButton extends React.Component {


  constructor(props) {
      super(props);
      this.state = {
          comment: null,
          anchorEl: null,
          users:[]
      }
  }

  componentDidMount() {
      this.getComment()
  }

  async getComment() {
      try {
          const comment = await getComment(this.props.comment._id);
          this.getUsers()
          this.setState({comment: comment})
      } catch(e) {
          console.log(e.stack);
      }
  }

  async getUsers() {
    try {
      const users = []
      for (let i = 0; i < this.props.comment.dislikes.length; i++){
        const user = await getUser(this.props.comment.dislikes[i])
        users.push(user)
      }
      this.setState({users:users})
    } catch(e){
      console.log(e.stack)
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
    this.getUsers()
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes, comment } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
          color="primary"
          size='small'
        >
          {comment.dislikes.length === 1 ? "1 Dislike" : comment.dislikes.length + " Dislikes" }
        </Button>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
        <div className={classes.root}>
            <Divider />
            <ListOfDislikes users={this.state.users} />
        </div>
        </Popover>
      </div>
    );
  }
}

DislikesButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DislikesButton);
