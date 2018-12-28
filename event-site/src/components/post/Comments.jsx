import React, { Component } from 'react'
import { Typography, withStyles, CircularProgress, Grid, Button, Dialog, DialogTitle, DialogActions, TextField, DialogContent } from '@material-ui/core';
import Comment from './Comment';
import { AuthConsumer } from '../../context/AuthContext';

import { getComments, addComment } from '../../api/posts';


const styles = (theme) => ({
    heading: {
        paddingTop: 16,
        paddingBottom: 16
    },
    commentsText: {
        alignSelf: 'center',
        flex: 1
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    progressContainer: {
        textAlign: 'center'
    }
});

function CommentsContent(props) {
    const { comments } = props;

    if (comments.length > 0) {
        return comments.map(comment => (<Comment comment={comment} key={comment.comment._id} />));
    } else {
        return (
            <Typography variant='h6' align='center' color='textSecondary'>No Comments</Typography>
        );
    }
}

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            commentText: '',
            user: null,
            comments: null
        }
    }

    componentDidMount() {
        this.updateComments()
    }

    async updateComments() {
        const { post } = this.props;
        try {
            const comments = await getComments(post._id);
            this.setState({comments: comments})
        } catch(e) {
            console.log(e.stack);
        }
    }

    render() {
        const { comments } = this.state;
        const { classes } = this.props;

        return (
            <div>
                {this.commentDialog()}
                <Grid container direction='column' spacing={16} className={classes.heading}>
                    <Grid item container className={classes.heading} spacing={16}>
                        <Grid item className={classes.commentsText}>
                            <Typography variant='h5'>Comments</Typography>
                        </Grid>
                        <AuthConsumer>
                            {({ currentUser }) => (
                                (currentUser ?
                                    <Grid item>
                                        <Button onClick={() => this.handleOpen(currentUser)} variant="contained" size="small" color="primary">Add Comment</Button>
                                    </Grid> : null
                                )
                            )}
                        </AuthConsumer>

                    </Grid>
                    <Grid item>
                        {comments != null ?
                            <CommentsContent comments={comments} /> :
                            (<div className={classes.progressContainer}>
                                <CircularProgress className={classes.progress} />
                            </div>)
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }

    commentDialog() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
            >
                <DialogTitle>Add Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comment-text"
                        label="Comment"
                        fullWidth
                        multiline
                        value={this.state.commentText}
                        onChange={(event) => this.setState({ commentText: event.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button onClick={this.handleComment} color='primary'>Comment</Button>
                </DialogActions>
            </Dialog>
        );
    }

    handleCancel = () => {
        this.setState({ open: false });
    }

    handleComment = async () => {
        const { post } = this.props;

        try {
            await addComment(post._id, this.state.commentText);
            this.updateComments();

            this.setState({ open: false });
        } catch(e) {
            alert(e);
            console.log(e);
        }
    }

    handleOpen = (user) => {

        this.setState({ open: true, user: user });
    }
}

export default withStyles(styles)(Comments);
