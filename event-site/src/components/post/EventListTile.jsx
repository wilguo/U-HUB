import React from 'react'
import Link from 'react-router-dom/Link';
import { ListItem, ListItemText, withStyles, Button } from '@material-ui/core';
import GoingButton from './GoingButton'

const styles = (theme) => ({
    detailsWrapper: {
        paddingLeft: '12px'
    }
});

function EventListTile(props) {
    const { post, classes } = props;
    return (
        <ListItem>
            <ListItemText primary={post.title} secondary={`${post.eventBody.users.length - 1} others going`} />
            <GoingButton post={post} />
            <Link className={classes.detailsWrapper} to={{ pathname: `/topic/${post.topic}/${post._id}` }}>
                <Button variant="outlined" size="medium" color="default">
                    Details
                </Button>
            </Link>
        </ListItem>
    )
}

export default withStyles(styles)(EventListTile)
