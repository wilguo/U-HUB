import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CSSStyle from '../Styles'
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../context/AuthContext';

import { register } from '../api/auth'

const SignUpPageStyle = CSSStyle.signUpPageStyle

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

const yearOfStudyList = [
  {
    value: null,
    label: '',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
]

const programList = [
  {
    value: '',
    label: '',
  },
  {
    value: 'ComputerScience',
    label: 'Computer Science',
  },
  {
    value: 'Math',
    label: 'Math',
  },
  {
    value: 'LifeScience',
    label: 'Life Science',
  },
  {
    value: 'Economics',
    label: 'Economics',
  },
  {
    value: 'BusinessAdministration',
    label: 'Business Administration',
  },
  {
    value: 'Engineering',
    label: 'Engineering',
  },
  {
    value: 'Humanities',
    label: 'Humanities',
  },
  {
    value: 'SocialScience',
    label: 'Social Science',
  },
]

const schoolList = [
  {
    value: '',
    label: '',
  },
  {
    value: 'UniversityOfToronto',
    label: 'University Of Toronto',
  },
  {
    value: 'UniversityOfBritishColumbia',
    label: 'University Of British Columbia',
  },
  {
    value: 'UniversityOfWaterloo',
    label: 'University Of Waterloo',
  },
  {
    value: 'McGillUniversity',
    label: 'McGill University',
  },
  {
    value: 'YorkUniversity',
    label: 'York University',
  },
  {
    value: 'QueensUniversity',
    label: 'Queen\'s University',
  },
  {
    value: 'McMasterUniversity',
    label: 'McMaster University',
  },
  {
    value: 'UniversityOfOttawa',
    label: 'University Of Ottawa',
  },
  {
    value: 'RyersonUniversity',
    label: 'Ryerson University',
  },
  {
    value: 'UniversityOfGuelph',
    label: 'University Of Guelph',
  },
  {
    value: 'OCAD',
    label: 'OCAD',
  },
]

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      schoolName: '',
      yearOfStudy: null,
      programOfStudy: '',
      userName: '',
      password: '',
      confirmPassword: '',
      isSuccess: false,
    }

    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSignUp = async (postRegister) => {
    if (this.state.signUpPassword !== this.state.confirmPassword) {
      alert("Passwords do not match. Please try again.")
    } else if (this.state.signUpUserName === '' || this.state.signUpPassword === '') {
      alert("Please fill out the required fields.")
    } else {
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        schoolName: this.state.schoolName,
        yearOfStudy: this.state.yearOfStudy,
        programOfStudy: this.state.programOfStudy,
        username: this.state.signUpUserName,
        password: this.state.signUpPassword,
      }

      try {
        const result = await register(newUser);

        postRegister(result);
        this.setState({isSuccess: true})
      } catch (e) {
        console.log(e);
        alert(e);
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {
          this.state.isSuccess ?
            <Redirect to='/' />
            :
            <div style={SignUpPageStyle.outerDiveStyle}>
              <Typography component="h2" variant="h1" gutterBottom>
                Create Account
              </Typography>
              <br />
              <br />
              <div>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id="firstName"
                    label="First Name"
                    className={classes.textField}
                    onChange={this.handleChange('firstName')}
                    margin="normal"
                    variant="outlined"
                    style={SignUpPageStyle.mediumTextFieldStyle}
                  />
                  <TextField
                    id="lastName"
                    label="Last Name"
                    className={classes.textField}
                    onChange={this.handleChange('lastName')}
                    margin="normal"
                    variant="outlined"
                    style={SignUpPageStyle.mediumTextFieldStyle}
                  />
                </form>
              </div>
              <br />
              <div>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    variant="outlined"
                    style={SignUpPageStyle.largeTextFieldStyle}
                  />
                </form>
              </div>
              <br />
              <div>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id="schooName"
                    select
                    label="School Name"
                    className={classes.textField}
                    onChange={this.handleChange('schoolName')}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    // helperText="Please select your school"
                    margin="normal"
                    variant="outlined"
                    style={SignUpPageStyle.smallTextFieldStyle}
                  >
                    {schoolList.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    id="yearOfStudy"
                    select
                    label="Year of Study"
                    className={classes.textField}
                    onChange={this.handleChange('yearOfStudy')}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    // helperText="Please select your current year of study"
                    margin="normal"
                    variant="outlined"
                    style={SignUpPageStyle.smallTextFieldStyle}
                  >
                    {yearOfStudyList.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    id="programOfStudy"
                    select
                    label="Program of Study"
                    className={classes.textField}
                    onChange={this.handleChange('programOfStudy')}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    // helperText="Please select your program of study"
                    margin="normal"
                    variant="outlined"
                    style={SignUpPageStyle.smallTextFieldStyle}
                  >
                    {programList.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </form>
              </div>
              <br />
              <div>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id="username"
                    label="Username"
                    className={classes.textField}
                    onChange={this.handleChange('signUpUserName')}
                    margin="normal"
                    variant="outlined"
                    style={SignUpPageStyle.smallTextFieldStyle}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    className={classes.textField}
                    onChange={this.handleChange('password')}
                    margin="normal"
                    variant="outlined"
                    type='password'
                    style={SignUpPageStyle.smallTextFieldStyle}
                  />
                  <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    className={classes.textField}
                    onChange={this.handleChange('confirmPassword')}
                    margin="normal"
                    variant="outlined"
                    type='password'
                    style={SignUpPageStyle.smallTextFieldStyle}
                  />
                </form>
              </div>
              <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <AuthConsumer>
                  {({ postRegister }) => {
                    return (
                      <Button
                        variant="contained"
                        className={classes.button}
                        style={SignUpPageStyle.buttonStyle}
                        onClick={() => this.handleSignUp(postRegister)}
                      >
                        Create Account
                    </Button>
                    );
                  }}
                </AuthConsumer>
              </div>
            </div>
        }
      </div>
    )
  }
}

export default withStyles(styles)(SignUp);

