import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { topics } from '../Routes';
import Link from 'react-router-dom/Link'

export default function TopicListTile(props) {
    const { topic } = props;

    const index = topics.findIndex(t =>{ 
        return t.path.slice(1) === topic.topic.toLowerCase()
    });
    const topicObject = topics[index];
    return (
        <Link to={'/topic'+topicObject.path}>
            <ListItem button>

                <ListItemIcon>
                    {topicObject.icon}
                </ListItemIcon>
                <ListItemText primary={topic.topic} primaryTypographyProps={{ variant: 'h6' }} />
                <Typography>{topic.posts} posts</Typography>
            </ListItem>
        </Link>
    )
}
