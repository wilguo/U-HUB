import React from 'react'
import { CardHeader, Paper, withStyles, Typography } from '@material-ui/core';
import LikesButton from '../comment/LikesButton'
import DislikesButton from '../comment/DislikesButton'
import {ThumbsUpButton} from '../comment/ThumbsUp'
import {ThumbsDownButton} from '../comment/ThumbsDown'

import {getComment} from '../../api/comments'

const styles = (theme) => ({
    paper: {
        margin: 8,
        padding: 0
    },
    header: {
        padding: 8,
        paddingBottom: 4
    },
    content: {
        padding: 8,
        paddingTop: 0
    },
});

class Comment extends React.Component {
    constructor(props){
      super(props);
      this.handler = this.handler.bind(this)
      const {comment} = this.props.comment

      this.state = {comment: comment}
    }


    render() {
      const { classes } = this.props;
      const user = this.props.comment.user
      const comment = this.state.comment
      return (
          <Paper className={classes.paper}>
              <CardHeader
                  title={user.firstName + ' ' + user.lastName}
                  titleTypographyProps={{variant: 'subheading', color:'textSecondary'}}
                  className={classes.header}
                  />
              <Typography variant='body1' align='left' className={classes.content}>
                  {comment.content}
              </Typography>
              <div>
                <div style={{'float':'left', 'display':'inline=block'}}>
                      <ThumbsUpButton comment={comment} handler ={this.handler}/>
                      <ThumbsDownButton comment={comment} handler ={this.handler}/>

                </div>
                <div style={{'float':'right', 'display':'inline-block'}}>
                      <DislikesButton comment={comment}/>
                </div>
                <div style={{'float':'right', 'display':'inline-block'}}>
                      <LikesButton comment={comment}/>
                </div>

                <div style={{'clear':'both'}}></div>
              </div>
          </Paper>
      )
    }

    handler = () => {
      this.getComment();
    }

    async getComment() {
        try {
            const comment = await getComment(this.props.comment.comment._id);
            this.setState({comment: comment})
        } catch(e) {
            console.log(e.stack);
        }
    }

}

export default withStyles(styles)(Comment);
