import React from 'react'
import { Drawer, List, withStyles, ListItem, ListItemText, Divider, ListItemIcon } from '@material-ui/core';
import { withRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { Home as HomeIcon, Group as UsersIcon, QuestionAnswer as PostsIcon, Timeline as StatsIcon } from '@material-ui/icons'

import Users from './Users';
import Posts from './Posts';
import Stats from './Stats';

const drawerWidth = 200;

const styles = (theme) => ({
    content: {
        padding: theme.spacing.unit * 3,
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth,
        flexShrink: 0
    },
    spacer: theme.mixins.toolbar
});

const routes = [
    {
        name: 'Users',
        path: '/users',
        icon: <UsersIcon />
    },
    {
        name: 'Posts',
        path: '/posts',
        icon: <PostsIcon />
    },
    {
        name: 'Stats',
        path: '/stats',
        icon: <StatsIcon />
    },
]

function DashboardRoutes(props) {
    const { location: { pathname }, classes } = props;
    return (
        <React.Fragment>
            <Drawer variant='permanent' className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                <div className={classes.appBarSpacer} />
                <List>
                    <Link to='/'>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItem>
                    </Link>

                    <Divider />
                    {routes.map((route) => {
                        const selected = pathname.startsWith('/dashboard' + route.path);
                        return (<Link to={'/dashboard' + route.path} key={route.path} style={{ textDecoration: 'none' }}>
                            <ListItem button selected={selected}>
                                <ListItemIcon>
                                    {React.cloneElement(route.icon, { color: selected ? 'primary' : 'inherit' })}
                                </ListItemIcon>
                                <ListItemText primary={route.name} />
                            </ListItem>
                        </Link>)
                    })}
                </List>
            </Drawer>
            <div className={classes.content}>
                <div className={classes.spacer} />
                <Switch>
                    <Redirect exact from='/dashboard' to='/dashboard/users'/>
                    <Route path='/dashboard/users' component={Users} />
                    <Route path='/dashboard/posts' component={Posts} />
                    <Route path='/dashboard/stats' component={Stats} />
                </Switch>
            </div>
        </React.Fragment>
    )
}

export default withRouter(withStyles(styles)(DashboardRoutes));