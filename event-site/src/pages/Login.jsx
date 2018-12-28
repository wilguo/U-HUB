import React, { Component } from 'react'
import { Button, Typography } from '@material-ui/core';
import Style from '../Styles'
import { withStyles } from "@material-ui/core/styles/index";
import TextField from '@material-ui/core/TextField';
import { AuthConsumer } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';

const LoginStyle = Style.loginStyle;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
      errorMessage: ''
    }
  }

  onFieldChange = function (stateAttributeName) {
    return (event) => {
      this.setState({
        [stateAttributeName]: event.target.value,
        error: false,
        errorMessage: ''
      })
    };
  }

  doLogin = async (login) => {
    const success = await login(this.state.username, this.state.signUpPassword);

    if (!success) {
      this.setState({ error: true, errorMessage: 'Incorrect' })
    }
  }

  render() {
    const { classes } = this.props;
    const { error, errorMessage } = this.state;

    return (
      <AuthConsumer>
        {({ currentUser, login }) => {
          return (
            currentUser ? <Redirect to='/' /> :
              <form autoComplete='off'>
                <div style={LoginStyle.outerDivStyle}>
                  <div style={LoginStyle.innerDivStyle}>
                    <Typography component="h6" variant="h1" gutterBottom style={LoginStyle.loginHeadingStyle}>
                      Login
                    </Typography>
                    <br/>
                    <div>
                      <TextField
                        error={error}
                        id="outlined-username-input"
                        label={error ? errorMessage : 'Username'}
                        style={LoginStyle.loginTextFieldStyle}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.username}
                        onChange={this.onFieldChange('username')}
                      />
                    </div>
                    <div>
                      <TextField
                        error={error}
                        id="outlined-password-input"
                        label={error ? errorMessage : 'Password'}
                        style={LoginStyle.loginTextFieldStyle}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type='password'
                        value={this.state.password}
                        onChange={this.onFieldChange('password')}
                      />
                    </div>
                    <br/>
                    <br/>
                    <Button
                      variant="contained"
                      className={classes.button}
                      onClick={() => this.doLogin(login)}
                      style={LoginStyle.loginButtonStyle}
                    >
                      Log In
                    </Button>
                  </div>
                </div>
              </form>

          )
        }}
      </AuthConsumer>
    )
  }
}

export default withStyles(styles)(Login);
