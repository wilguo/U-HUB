import {ThumbDown, ThumbDownOutlined} from '@material-ui/icons'
import React from 'react'
import { AuthConsumer } from "../../context/AuthContext";
import { IconButton} from '@material-ui/core';
import {addToDislikes, removeFromDislikes} from '../../api/comments'
/*
DisLike button implementation for each post
 */

class ThumbsDownComponent extends React.Component {

  constructor(props) {
    super(props)
    const { comment } = this.props

    this.state = {
      disliked: this.isDisliked(comment)
    }
  }

  addUserToDislikes = async () => {
      try {
          const response = await addToDislikes(this.props.comment._id);
          this.setState({disliked: this.isDisliked(response)})
          this.props.handler()
      } catch (e) {
          console.log(e);
      }
  }

  removeUserFromDislikes = async () => {
      try {
          const response = await removeFromDislikes(this.props.comment._id);
          this.setState({disliked: this.isDisliked(response)})
          this.props.handler()
      } catch (e) {
          console.log(e);
      }
  }

  isDisliked = (comment) => {
    return comment.dislikes.includes(this.props.user._id)
  }

  render() {
      if (this.state.disliked) {
          return (<IconButton onClick={() => this.removeUserFromDislikes()} variant="contained" size="medium" color="secondary">
              <ThumbDown />
          </IconButton>)
      }
      return (
          <IconButton onClick={() => this.addUserToDislikes()} variant="contained" size="medium" color="primary">
              <ThumbDownOutlined />
      </IconButton>)

  }


}


class ThumbsDownButton extends React.Component {

    render() {
        const { comment } = this.props;

        return (
            <AuthConsumer>
                {({ currentUser }) => currentUser ?
                    <ThumbsDownComponent user={currentUser} comment={comment} handler={this.props.handler}/> :
                    null
                }
            </AuthConsumer>
        )
    }
}

export {ThumbsDownButton}
