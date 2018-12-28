import React, { Component } from 'react'
import { withStyles, Card, CircularProgress, CardHeader, CardContent } from '@material-ui/core'
import { getUpcoming } from '../api/posts';
import EventListTile from './post/EventListTile'

const styles = (theme) => ({
    progressContainer: {
        margin: theme.spacing.unit * 2,
    }
});

class UpcomingEventsCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: null
        }
    }

    async componentDidMount() {
        try {
            const posts = await getUpcoming();

            this.setState({posts: posts});
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { posts } = this.state;
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader
                    title='Upcoming Events'
                    titleTypographyProps={{ align: 'left' }}
                />
                <CardContent>
                    {posts ? (
                        posts.map(post => (<EventListTile post={post} key={post._id}/>))
                    ) : 
                    (<div className={classes.progressContainer}>
                        <CircularProgress className={classes.progress} />
                    </div>
                    )}
                </CardContent>
            </Card>
        )
    }
}


export default withStyles(styles)(UpcomingEventsCard)