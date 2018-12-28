import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {AuthConsumer } from "../context/AuthContext";
import {getUser, setAttributes} from "../api/profile";
import Button from "@material-ui/core/es/Button/Button";
import {getPost} from "../api/posts";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
/*
SimpleMenu Component is the dropdown list for the list of the events a user is going to.
 */
class SimpleMenu extends React.Component {
    state = {
        anchorEl: null,
        goingToEvents: this.props.goingToEvents
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Events Going To
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {
                        this.props.goingToEvents.map( p => {
                            return (<MenuItem key={p}> {p} </MenuItem>)
                        })
                    }
                </Menu>
            </div>
        );
    }
}



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

/*
UserComponent component is executed when the user is logged in, and it displays the relevant information.
 */
class UserComponent extends React.Component {
    async getPosts (){
        let posts = []
        try {

            const user = await getUser(this.props.user._id);
            for ( let i = 0; i < user.goingToEvents.length; i++) {
                try {
                    const post = await getPost(user.goingToEvents[i])
                    posts.push(post.title)
                } catch(e) {
                    console.log(e);
                }
            }
            return posts
        }catch(e) {
            alert(e);
        }
        return posts


    }
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
                lastName: "",
                email: "",
                programOfStudy: "",
                yearOfStudy: "",
            schoolName: "",
                username: "",
                topics: [],
                goingToEvents: [],
                posts: []
        }
    }

    async getPost() {
        const posts = await this.getPosts()

        this.setState({
            goingToEvents : posts
        });
    }




    async componentDidMount() {
        // Update the post. The existing post data is from the previous page. Might be out of date
        try {
            const user = await getUser(this.props.user._id);
            this.setState({firstName: user.firstName, lastName: user.lastName, email: user.email, programOfStudy: user.programOfStudy,
                yearOfStudy: user.yearOfStudy, topics: user.topics, username: user.username, goingToEvents: user.goingToEvents,
            posts: user.posts, schoolName: user.schoolName});

            await this.getPost()
        } catch(e) {
            alert(e);
        }
    }

    handleChange = (name) => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleEmail = (name) => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleLastName =  (name) => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleYearOfStudy =  (name) => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleProgramOfStudy =   (name)=> event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleSchoolName =   (name)=> event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeEverything = async () => {
        try {
            const body = {
                firstName : this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                programOfStudy: this.state.programOfStudy,
                yearOfStudy: this.state.yearOfStudy,
                schoolName: this.state.schoolName
            }
            await setAttributes(this.props.user._id, body);
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return <div>

        <form className={this.props.classes.container} noValidate autoComplete="off">
            <TextField
                id="standard-name"
                label="Name "
                className={this.props.classes.textField}
                onChange={this.handleChange('firstName')}
                value={this.state.firstName}
                margin="normal"
            />
            < TextField
                id="standard-uncontrolled"
                label="Last Name"
                value={this.state.lastName}
                onChange={this.handleLastName('lastName')}
                className={this.props.classes.textField}
                margin="normal"
            />
            <TextField
                id="standard-required"
                label="Email"
                value={this.state.email}
                className={this.props.classes.textField}
                margin="normal"
            />
            <TextField
                label="Year of Study"
                value={this.state.yearOfStudy}
                onChange={this.handleYearOfStudy('yearOfStudy')}
                className={this.props.classes.textField}
                margin="normal"
            />
            <TextField
                label="Program of Study"
                value={this.state.programOfStudy}
                onChange={this.handleProgramOfStudy('programOfStudy')}
                className={this.props.classes.textField}
                margin="normal"
            />
            <TextField
                label="School Name"
                value={this.state.schoolName}
                onChange={this.handleSchoolName('schoolName')}
                className={this.props.classes.textField}
                margin="normal"
            />
            <TextField
                label="User Name"
                value={this.state.username}
                className={this.props.classes.textField}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            />

            <SimpleMenu goingToEvents={this.state.goingToEvents}/>
            <TextField
                id="standard-read-only-input"
                label="Posts you have posted"
                value={this.state.posts.join(', ')}
                className={this.props.classes.textField}
                margin="normal"
                multiline = {true}
                InputProps={{
                    readOnly: true,
                }}
            /></form>
            <Button onClick={this.handleChangeEverything} variant="contained" size="medium" color="primary"> Save </Button>
        </div>
    }
}
/*
Textfields components displays empty information as the user is not logged in.
 */
class TextFields extends React.Component {
    state = {
        firstName : "",
        lastName: "",
        email: "",
        programOfStudy: "",
        yearOfStudy: "",
        username: "",
        topics: ""
    };
    handleChange = (name) => event => {
        this.setState({
            [name]: event.target.value,
        });

    };
    handleEmail = (name) => event => {
        this.setState({
            [name]: event.target.value,
        });

    };
    handleLastName =  (name) => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleYearOfStudy =  (name) => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleProgramOfStudy =   (name)=> event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (

                <AuthConsumer>
                    {({currentUser}) => currentUser ?
                        <UserComponent user={currentUser} classes={classes}/>:
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="standard-name"
                                label="Name "
                                className={classes.textField}
                                value={"vuevberun"}
                                margin="normal"
                            />
                            < TextField
                                id="standard-uncontrolled"
                                label="Last Name"
                                value={""}
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                id="standard-required"
                                label="Email"
                                value={""}
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                label="Year of Study"
                                value={""}
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                label="Program of Study"
                                value={""}
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                label="User Name"
                                value={""}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Subscriptions"
                                value={""}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Events you are going to"
                                className={this.props.classes.textField}

                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Posts you have posted"
                                className={this.props.classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            /></form>
                    }

                </AuthConsumer>



        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
