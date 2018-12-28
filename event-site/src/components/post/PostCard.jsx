import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { Button, withStyles, Card, CardHeader, CardContent, Typography, IconButton, CardActions, Collapse, CardMedia, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { ExpandMore, Alarm, Place } from '@material-ui/icons';

import GoingButton from './GoingButton';
import moment from 'moment'

const styles = (theme) => ({
    card: {
        maxWidth: 650,
    },
    image: {
        height: 0,
        paddingTop: '56.25%'
    },
    cardContent: {
        padding: 0,
    },
    actions: {
        display: 'flex'
    },
    expand: {
        marginLeft: 'auto'
    }
});

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        }
    }

    toggleExpanded = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    render() {
        const { classes, post } = this.props;
        const isEvent = post.type === 'event';

        return (
            <Card className={classes.card}>
                <PostCardHeader post={post} />
                {isEvent && post.eventBody.media != null ? (<CardMedia
                    className={classes.image}
                    image={post.eventBody.media}
                />) : null}
                {isEvent ? (<CardContent className={classes.cardContent}>
                    <List>
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
                </CardContent>) : null}

                <CardActions className={classes.actions}>
                    {isEvent ? <GoingButton post={post} /> : null}
                    <Link to={{ pathname: `/topic/${post.topic}/${post._id}` }}>
                        <Button variant="outlined" size="small" color="default">
                            Details
                        </Button>
                    </Link>
                    <IconButton onClick={this.toggleExpanded} className={classes.expand}>
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
                    <CardContent>
                        <Typography component='p' align='left'>
                            {post.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
}

function PostCardHeader(props) {
    const { post } = props;

    let subheader = ''
    if(post.user !== undefined) {
        const user = post.user;
        subheader = `Posted by ${user.firstName} ${user.lastName}`
    }

    return (
        <Link to={{ pathname: `/topic/${post.topic}/${post._id}`, state: { post: post } }}>
            <CardHeader
                title={post.title}
                titleTypographyProps={{ align: 'left' }}
                subheader={subheader}
                subheaderTypographyProps={{ align: 'left' }}
            />
        </Link>
    )
}

export { PostCardHeader };
export default withStyles(styles)(PostCard);