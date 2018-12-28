import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { AuthConsumer } from '../context/AuthContext';
import { IconButton, Menu, MenuItem, Button, withStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'
import Styles from '../Styles'

const eventAppBarStyle = Styles.eventAppBarStyle

const styles = (theme) => ({
    menuItem: {
        outline: 'none',
        textDecoration: 'none'
    },
    menuLink: {

    },
    loginButton: {
        color: 'white'
    } 
});

class UserButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchor: null
        }
    }

    openMenu = (event) => {
        this.setState({ anchor: event.currentTarget });
    }

    closeMenu = () => {
        this.setState({ anchor: null });
    }

    render() {
        const { anchor } = this.state;
        const { classes } = this.props;

        return (
            <AuthConsumer>
                {({ currentUser, logout }) => (
                    currentUser ?
                        (<React.Fragment>
                            <IconButton onClick={this.openMenu} color='inherit'>
                                <AccountCircle />
                            </IconButton>
                            <Menu anchorEl={anchor}
                                open={Boolean(anchor)}
                                onClose={this.closeMenu}>
                                <Link to='/profile' className={classes.menuItem}>
                                    <MenuItem className={classes.menuItem} onClick={this.closeMenu}>Profile</MenuItem>
                                </Link>
                                {currentUser.isAdmin ?
                                    <Link to='/dashboard'>
                                        <MenuItem onClick={this.closeMenu}>Dashboard</MenuItem>
                                    </Link>
                                    : null}
                                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                            </Menu>
                        </React.Fragment>
                        )
                        :
                        <React.Fragment>
                            <Link to={'/'}>
                            <Button style={eventAppBarStyle.buttonStyle}>Create Account</Button>
                            </Link>
                            <Link to={'/'}>
                                <Button className={classes.loginButton}>
                                    Login
                                </Button>
                            </Link>
                        </React.Fragment>
                )}
            </AuthConsumer>
        )
    }
}

export default withStyles(styles)(UserButton);