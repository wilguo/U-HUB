import React, { Component } from 'react'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, TextField, withStyles, Grid, Button } from '@material-ui/core';

import { updateUser } from '../../api/admin';

const styles = (theme) => ({
    header: {
        flexBasis: '33%',
        textAlign: 'left'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

class UserPanel extends Component {
    constructor(props) {
        super(props);
        const { user } = this.props;

        this.state = {
            expanded: false,
            user: user,
            firstName: user.firstName,
            lastName: user.lastName,
            password: '',
        }
    }

    onValueChanged = function (attributeName) {
        return (event) => {
            this.setState({ [attributeName]: event.target.value });
        }
    }

    toggleExpanded = () => {
        this.setState({ expanded: !this.state.expanded})
    }

    submitChanges = async () => {
        const { user } = this.props;
        const { firstName, lastName, password} = this.state;

        try {
            const body = {
                firstName: firstName,
                lastName: lastName,
                signUpPassword: password !== '' ? password : undefined
            }
            const response = await updateUser(user._id, body);

            this.setState({expanded: false, user: response})
        } catch(e) {
            console.log(e);
            alert(e);
        }
    }

    /**
     * This form will require validation in future.
     */
    render() {
        const { classes } = this.props;
        const { user } = this.state;

        return (
            <ExpansionPanel expanded={this.state.expanded} onChange={this.toggleExpanded}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.header} >{user.firstName} {user.lastName}</Typography>
                    <Typography className={classes.header} color='textSecondary'>{user.email}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form autoComplete='off' className={classes.formContainer}>
                        <Grid container spacing={16}>
                            <Grid item>
                                <TextField
                                    id='first-name'
                                    label='First Name'
                                    value={this.state.firstName}
                                    onChange={this.onValueChanged('firstName')}
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id='last-name'
                                    label='Last Name'
                                    value={this.state.lastName}
                                    onChange={this.onValueChanged('lastName')}
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id='password'
                                    label='Password'
                                    helperText='Enter new password to reset'
                                    value={this.state.password}
                                    onChange={this.onValueChanged('password')}
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item>
                                <Button color='primary' onClick={this.submitChanges}>Save</Button>
                            </Grid>
                        </Grid>
                    </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default withStyles(styles)(UserPanel)