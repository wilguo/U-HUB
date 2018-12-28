import React, { Component } from 'react'
import { withStyles, Typography, CardMedia, List, ListItem, ListItemText, ListItemIcon, Grid, CardActions, Divider } from '@material-ui/core';
import { Alarm, Place } from '@material-ui/icons';
import GoingButton from '../components/post/GoingButton';
import Comments from '../components/post/Comments';

import { getPost } from '../api/posts'

import moment from 'moment'

const styles = (theme) => ({
    content: {
        maxWidth: 1000
    },
    mediaContainer: {
        height: '100px'
    },
    media: {
        height: '300px',
        objectFit: 'cover'
    },
    actions: {
        padding: 0
    },
    list: {
        padding: 0
    }
});

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            post: null
         }
    }

    async componentDidMount() {
        // Update the post. The existing post data is from the previous page. Might be out of date
        try {
            const post = await getPost(this.props.match.params.post);
            console.log(post);
            this.setState({post: post});
        } catch(e) {
            alert(e);
        }
    }

    render() {
        const { post } = this.state;
        const { classes } = this.props;

        if(post != null) {
            const isEvent = post.type === 'event';

            return (
                <Grid container align='stretch' direction='row' alignItems='center' justify='center'>
                    <Grid container
                        item
                        direction='row'
                        spacing={16}
                        className={classes.content}
                    >
                        <Grid item xs={12}>
                            <Typography align='left' variant='h3'>
                                {post.title}
                            </Typography>
                        </Grid>
                        {isEvent ? (
                            <Grid item xs={12}>
                                <CardMedia image={post.eventBody.media} component='img' className={classes.media} />
                            </Grid>) : null}
    
                        {isEvent ? (<Grid item xs={12}>
                            <List className={classes.list}>
                                <ListItem button={false}>
                                    <ListItemIcon>
                                        <Alarm />
                                    </ListItemIcon>
                                    <ListItemText primary={moment(post.eventBody.date).format('dddd MMM Mo [at] h:mm a z')} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Place />
                                    </ListItemIcon>
                                    <ListItemText primary={post.eventBody.location} />
                                </ListItem>
                            </List>
                        </Grid>) : null}
    
                        {isEvent ? (<Grid item xs={12}>
                            <CardActions className={classes.actions}>
                                <GoingButton post={post} />
                            </CardActions>
                        </Grid>) : null}
                        <Grid item xs={12}>
                            <Typography variant='body1'>
                                {post.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                            <Comments post={post} />
                        </Grid>
                    </Grid>
                </Grid>
            )
        } else {
            return <div></div>
        }
    }
}

export default withStyles(styles)(Post)
