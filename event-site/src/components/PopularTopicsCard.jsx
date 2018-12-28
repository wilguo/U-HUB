import React, { Component } from 'react'
import { withStyles, Card, CircularProgress, CardHeader, CardContent } from '@material-ui/core'
import { getPopular } from '../api/topic'
import TopicListTile from './topic/TopicListTile'

const styles = (theme) => ({
    progressContainer: {
        margin: theme.spacing.unit * 2,
    }
});

class PopularTopicsCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topics: null
        }
    }

    async componentDidMount() {
        try {
            const topics = await getPopular();

            this.setState({topics: topics});
        } catch(e) {
            console.log(e);
        }
    }
    
    render() {
        const { topics } = this.state;
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader
                    title='Popular Topics'
                    titleTypographyProps={{ align: 'left' }}
                />
                <CardContent>
                    {topics ? (
                        topics.map(topic => <TopicListTile topic={topic} key={topic.topic}/>)
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

export default withStyles(styles)(PopularTopicsCard);