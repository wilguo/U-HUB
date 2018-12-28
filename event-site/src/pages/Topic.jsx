import React, { Component } from 'react'
import { Grid, Typography, Divider } from '@material-ui/core';
import PostCard from '../components/post/PostCard';
import { withStyles } from "@material-ui/core/styles/index";
import DiscussionDialog from '../components/TopicPage/AddDiscussionPost'
import EventDialog from '../components/TopicPage/AddEventPost'

import { getPostsFromTopic } from '../api/topic';
import { topics } from '../components/Routes'

const styles = (theme) => ({
    content: {
        maxWidth: 700
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
    },
    background: {
        position: 'fixed',
        zIndex: -1,
        right: -50,
        bottom: -50
    },
    icon: {
        width: 600,
        height: 600,
        fill: 'rgba(0,0,0,0.1)',

        transform: 'rotate(-15deg)'
    }
});
class Topic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    async componentWillMount() {
        try {
            const topicId = this.props.match.params.topicId;
            const posts = await getPostsFromTopic(topicId);

            this.setState({ posts: posts })
        } catch (e) {
            console.log(e);
        }
    }


    handler = (newPost) => {
        let newPosts = this.state.posts
        newPosts.push(newPost)
        this.setState({ posts: newPosts })
    }

    render() {
        const { match: { params: { topicId } } } = this.props;
        const { classes } = this.props;

        const topicObject = topics[topics.findIndex(t => t.path.toLowerCase().slice(1) === topicId)]

        return (
            <div>
                <div className={classes.background}>
                    {React.cloneElement(topicObject.icon, { fontSize: 'large', className: classes.icon })}
                </div>
                <Grid container
                    alignItems='center'
                    align='center'
                    justify='center'
                    direction='row'
                    spacing={16}
                >
                    <Grid item xs={12}>
                        <Typography variant='h2'>{topicId.charAt(0).toUpperCase() + topicId.slice(1)}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} />
                    <Grid item container xs={12} spacing={32} alignItems='center' justify='center' align='center'>
                        <Grid item xs={6}>
                            <DiscussionDialog topic={topicId} handler={this.handler} />
                        </Grid>
                        <Grid item  xs={6}>
                            <EventDialog topic={topicId} handler={this.handler} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}/>
                    <Grid container alignItems='flex-start' justify='center' align='center' spacing={40}>
                        <Grid item container xs={6} spacing={32}>
                            {
                                this.state.posts.filter(p => p.type === 'discussion').map((post) => (
                                    <Grid item xs={12} key={post._id}>
                                        <PostCard post={post} />
                                    </Grid>
                                ))
                            }
                        </Grid>

                        <Grid item container xs={6} spacing={32}>
                            {
                                this.state.posts.filter(p => p.type === 'event').map((post) => (
                                    <Grid item xs={12} key={post._id}>
                                        <PostCard post={post} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Topic)
