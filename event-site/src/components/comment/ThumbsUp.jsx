import React from 'react'
import { AuthConsumer } from "../../context/AuthContext";
import { IconButton } from '@material-ui/core';
import {ThumbUp, ThumbUpOutlined} from '@material-ui/icons'
import {addToLikes, removeFromLikes } from '../../api/comments'

/*
Like button implementation for each post
 */



class ThumbsUpComponent extends React.Component {

  constructor(props) {
    super(props)
    const { comment } = this.props

    this.state = {
      liked: this.isLiked(comment),
    }
  }

  addUserToLikes = async () => {
      try {
          const response = await addToLikes(this.props.comment._id);
          this.setState({liked: this.isLiked(response)})
          this.props.handler()
      } catch (e) {
          console.log(e);
      }
  }

  removeUserFromLikes = async () => {
      try {
          const response = await removeFromLikes(this.props.comment._id);
          this.setState({liked: this.isLiked(response)})
          this.props.handler()
      } catch (e) {
          console.log(e);
      }
  }

  isLiked = (comment) => {
    return comment.likes.includes(this.props.user._id)
  }



  render() {
          if (this.state.liked) {
              return (<IconButton onClick={() => this.removeUserFromLikes()} variant="contained" size="medium" color="secondary">
                  <ThumbUp />
              </IconButton>)
          }
          return (
              <IconButton onClick={() => this.addUserToLikes()} variant="contained" size="medium" color="primary">
                  <ThumbUpOutlined />
          </IconButton>)
        }
}



class ThumbsUpButton extends React.Component {

    render() {
        const { comment } = this.props;

        return (
            <AuthConsumer>
                {({ currentUser }) => currentUser ?
                    <ThumbsUpComponent user={currentUser} comment={comment} handler={this.props.handler}/> :
                    null
                }
            </AuthConsumer>
        )
    }
}

export {ThumbsUpButton}
