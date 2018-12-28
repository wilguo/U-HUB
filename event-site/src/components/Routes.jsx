import React, { Component } from 'react'
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, ListSubheader } from '@material-ui/core';
import { 
    Home as HomeIcon, 
    DirectionsRun as SportsIcon, 
    Timeline as MathIcon, 
    BugReport as CodingIcon,
    AirplanemodeActive as TravelIcon,
    FlashOn as ScienceIcon,
    LocalBar as GroupIcon,
    Work as BusinessCenterIcon,
    LocalMovies as LocalMoviesIcon,
    ShoppingCart as ShoppingCartIcon,
    Public as NewsIcon,
    Terrain as OutdoorsIcon,
    Restaurant as DiningIcon,
    Palette as ArtIcon,
    MusicNote as MusicNoteIcon,
    CameraAlt as PhotographyIcon,
    Favorite as DatingIcon,
    HowToReg as PoliticsIcon

 } from '@material-ui/icons'

import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Post from '../pages/Post'
import Topic from '../pages/Topic';
import SideBarTopic from '../components/SideBarTopic'
import { AuthConsumer } from '../context/AuthContext';

const drawerWidth = 300;

const styles = (theme) => ({
    root: {
        zIndex: 1,
    },
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
        name: 'Home',
        path: '/',
        icon: (<HomeIcon />)
    },
]

export const topics = [
    {
        name: 'Sports',
        path: '/sports',
        icon: (<SportsIcon />)
    },
    {
        name: 'Math',
        path: '/math',
        icon: (<MathIcon />)
    },
    {
        name: 'Coding',
        path: '/coding',
        icon: (<CodingIcon />)
    },
    {
        name: 'Science',
        path: '/science',
        icon: (<ScienceIcon />)
    },
    {
        name: 'Travel',
        path: '/travel',
        icon: (<TravelIcon />)
    },
    {
        name: 'Social',
        path: '/social',
        icon: (<GroupIcon />)
    },
    {
        name: 'Business',
        path: '/business',
        icon: (<BusinessCenterIcon />)
    },
    {
        name: 'Movies',
        path: '/movies',
        icon: (<LocalMoviesIcon />)
    },
    {
        name: 'Shopping',
        path: '/shopping',
        icon: (<ShoppingCartIcon />)
    },
    {
        name: 'Breaking News',
        path: '/news',
        icon: (<NewsIcon />)
    },
    {
        name: 'Outdoors/ Camping',
        path: '/outdoors',
        icon: (<OutdoorsIcon />)
    },
    {
        name: 'Dining',
        path: '/dining',
        icon: (<DiningIcon />)
    },
    {
        name: 'Art',
        path: '/art',
        icon: (<ArtIcon />)
    },
    {
        name: 'Music',
        path: '/music',
        icon: (<MusicNoteIcon />)
    },
    {
        name: 'Photography',
        path: '/photography',
        icon: (<PhotographyIcon />)
    },
    {
        name: 'Dating',
        path: '/dating',
        icon: (<DatingIcon />)
    },
    {
        name: 'Politics',
        path: '/politics',
        icon: (<PoliticsIcon />)
    },
]

class Routes extends Component {

    render() {
        const { location: { pathname }, classes } = this.props;

        return (
            <React.Fragment>
                <Drawer variant='permanent' className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                    <div className={classes.spacer} />
                    <List>
                        {routes.map((route) => {
                            const selected = pathname === route.path;
                            return (
                                <Link to={route.path} style={{ textDecoration: 'none' }} key={route.path}>
                                    <ListItem button selected={pathname === route.path}>
                                        <ListItemIcon>
                                            {React.cloneElement(route.icon, { color: selected ? 'primary' : 'inherit' })}
                                        </ListItemIcon>
                                        <ListItemText primary={route.name} />
                                    </ListItem>
                                </Link>
                            );
                        })}
                        <Divider />
                        <ListSubheader inset>Topics</ListSubheader>
                        {topics.map((topic) => {
                            const selected = pathname.startsWith('/topic' + topic.path)
                            return (
                                <Link to={'/topic' + topic.path} key={topic.path}>
                                  <AuthConsumer>
                                    {({currentUser}) => (
                                      currentUser ?
                                      <SideBarTopic topic={topic} selected={selected} topicsArray={currentUser.topics}/> :
                                      <SideBarTopic topic={topic} selected={selected} topicsArray={[]}/>
                                    )}
                                  </AuthConsumer>
                                </Link>
                            );
                        })}
                    </List>
                </Drawer>
                <div className={classes.content}>
                    <div className={classes.spacer} />
                    <Route exact path='/' component={Home} />
                    <Route path='/profile' component={Profile} />
                    <Switch>
                        <Route path='/topic/:topicId/:post' component={Post}/>
                        <Route path='/topic/:topicId' component={Topic} key={pathname}/>
                    </Switch>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(Routes));
