import React, { Component } from 'react'
import Style from '../Styles'
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography, Modal } from '@material-ui/core';
import {register} from "../api/auth";
import PropTypes from 'prop-types';
import { AuthConsumer } from '../context/AuthContext';
import './css/animation.css'
import scrollToComponent from 'react-scroll-to-component'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  margin: {
    margin: theme.spacing.unit,
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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstName: '',
      lastName: '',
      email: '',
      schoolName: '',
      yearOfStudy: null,
      programOfStudy: '',
      signUpUserName: '',
      signUpPassword: '',
      confirmPassword: '',
      isSuccess: false,
      username: '',
      password: '',
      error: false,
      errorMessage: ''
    }

    this.handleSignUp = this.handleSignUp.bind(this)
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
    const success = await login(this.state.username, this.state.password);


    if (!success) {
      this.setState({ error: true, errorMessage: 'Incorrect' })
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
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
    const { error, errorMessage } = this.state;

    return (
      <AuthConsumer>
        {({ currentUser, login }) => {
          return (
            <div>
              <div style={Style.homePageStyle.splitLeft}>
                <div style={Style.homePageStyle.leftBanner}>
                  <div style={Style.homePageStyle.leftBannerHeader}>
                    <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.leftBannerBodyFont}>
                      <img src={ '/photos/logo.svg' } alt='logo' style={{"height":"70px", "width":"190px"}}/>
                    </Typography>
                  </div>
                  <div style={Style.homePageStyle.leftBannerMain}>
                    <Typography component="h6" variant="h1" gutterBottom style={Style.homePageStyle.leftBannerTitleFont}>
                      Stay in the Loop
                    </Typography>
                    <div style={{"paddingRight":"10%"}}>
                      <hr/>
                    </div>
                    <br/>
                    <div style={Style.homePageStyle.leftBannerBodyDiv} >
                      <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.leftBannerBodyFont}>
                        U-HUB keeps you up to date with everything that's going on. And that means you can spend less
                        time tracking down your favorite events and questions - more time enjoying what you love to do.
                      </Typography>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{"paddingLeft": "1%"}}>
                      <a href="#">
                        <div style={Style.homePageStyle.arrow}
                             onClick={() => scrollToComponent(this.Blue, { offset: -200, align: 'middle', duration: 1000, ease:'inExpo'})}>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div style={Style.homePageStyle.flipCardContainerDiv}>
                  <div className="flip-container" onTouchStart={() => this.classList.toggle('hover')}>
                    <div className="flipper">
                      <div className="front">
                        <div>
                          <img src={ '/photos/calendar.svg' } alt='calendar'  style={Style.homePageStyle.flipFrontImage}/>
                        </div>
                        <div style = {Style.homePageStyle.flipFrontImageTitleSpacing}>
                          <Typography component="h6" variant="h4" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Events
                          </Typography>
                        </div>
                        <hr />
                        <div style={{"paddingLeft":"10%","paddingRight":"10%"}}>
                          <Typography variant="subtitle1" gutterBottom>
                            Creating events and finding fun things to do around you has never been easier! With
                            U-HUB, you never have to miss out on the fun ever again!
                          </Typography>
                        </div>
                      </div>
                      <div className="back">
                        <div style={Style.homePageStyle.flipBackStyle}>
                          <Typography component="h6" variant="h3" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Topics
                          </Typography>
                          <hr />
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Sports
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Parties
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Socials
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Networking
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={Style.homePageStyle.flipCardSpacing}> </div>
                  <div className="flip-container" onTouchStart={() => this.classList.toggle('hover')}>
                    <div className="flipper">
                      <div className="front">
                        <div>
                          <img src={ '/photos/speechBubble.svg' } alt='speechBubble' style={Style.homePageStyle.flipFrontImage}/>
                        </div>
                        <div style = {Style.homePageStyle.flipFrontImageTitleSpacing}>
                          <Typography component="h6" variant="h4" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Forums
                          </Typography>
                        </div>
                        <hr />
                        <div style={{"paddingLeft":"10%","paddingRight":"10%"}}>
                          <Typography variant="subtitle1" gutterBottom>
                            Do you having burning questions you need answered or have a topic you're passionate about? Post
                            on U-HUB and let the discussion begin!
                          </Typography>
                        </div>
                      </div>
                      <div className="back">
                        <div style={Style.homePageStyle.flipBackStyle}>
                          <Typography component="h6" variant="h3" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Topics
                          </Typography>
                          <hr />
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Math
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Coding
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Science
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Politics
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={Style.homePageStyle.flipCardSpacing}> </div>
                  <div className="flip-container" onTouchStart={() => this.classList.toggle('hover')}>
                    <div className="flipper">
                      <div className="front">
                        <div>
                          <img src={ '/photos/trend.svg' } alt='trend' style={Style.homePageStyle.flipFrontImage}/>
                        </div>
                        <div style = {Style.homePageStyle.flipFrontImageTitleSpacing}>
                          <Typography component="h6" variant="h4" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Trends
                          </Typography>
                        </div>
                        <hr />
                        <div style={{"paddingLeft":"10%","paddingRight":"10%"}}>
                          <Typography variant="subtitle1" gutterBottom>
                            Need to keep up to date with the latest trends or breaking news? Worry no more! U-HUB has you
                            covered with all the media updates you need!
                          </Typography>
                        </div>
                      </div>
                      <div className="back">
                        <div style={Style.homePageStyle.flipBackStyle}>
                          <Typography component="h6" variant="h3" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Topics
                          </Typography>
                          <hr />
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Business
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Breaking News
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Politics
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Fashion
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={Style.homePageStyle.flipCardContainerDiv}>
                  <div className="flip-container" onTouchStart={() => this.classList.toggle('hover')}>
                    <div className="flipper">
                      <div className="front">
                        <div>
                          <img src={ '/photos/ball.svg' } alt='ball' style={Style.homePageStyle.flipFrontImage}/>
                        </div>
                        <div style = {Style.homePageStyle.flipFrontImageTitleSpacing}>
                          <Typography component="h6" variant="h4" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Hobbies
                          </Typography>
                        </div>
                        <hr />
                        <div style={{"paddingLeft":"10%","paddingRight":"10%"}}>
                          <Typography variant="subtitle1" gutterBottom>
                            Pursuing your hobbies or discovering something new is easier than ever! With U-HUB
                            you're able to do all that with just a few simple clicks!
                          </Typography>
                        </div>
                      </div>
                      <div className="back">
                        <div style={Style.homePageStyle.flipBackStyle}>
                          <Typography component="h6" variant="h3" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Topics
                          </Typography>
                          <hr />
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Art
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Music
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Photography
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Outdoors/Camping
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={Style.homePageStyle.flipCardSpacing}> </div>
                  <div className="flip-container" onTouchStart={() => this.classList.toggle('hover')}>
                    <div className="flipper">
                      <div className="front">
                        <div>
                          <img src={ '/photos/wine.svg' } alt='wine' style={Style.homePageStyle.flipFrontImage}/>
                        </div>
                        <div style = {Style.homePageStyle.flipFrontImageTitleSpacing}>
                          <Typography component="h6" variant="h4" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Social
                          </Typography>
                        </div>
                        <hr />
                        <div style={{"paddingLeft":"10%","paddingRight":"10%"}}>
                          <Typography variant="subtitle1" gutterBottom>
                            Want to meet new people or just have a fun night out? Know where the best parties and
                            socials are happening in town tonight with U-HUB!
                          </Typography>
                        </div>
                      </div>
                      <div className="back">
                        <div style={Style.homePageStyle.flipBackStyle}>
                          <Typography component="h6" variant="h3" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Topics
                          </Typography>
                          <hr />
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Travel
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Socials
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Dating
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Conferences
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={Style.homePageStyle.flipCardSpacing}> </div>
                  <div className="flip-container" onTouchStart={() => this.classList.toggle('hover')}>
                    <div className="flipper">
                      <div className="front">
                        <div>
                          <img src={ '/photos/review.svg' } alt='review' style={Style.homePageStyle.flipFrontImage}/>
                        </div>
                        <div style = {Style.homePageStyle.flipFrontImageTitleSpacing}>
                          <Typography component="h6" variant="h4" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Reviews
                          </Typography>
                        </div>
                        <hr />
                        <div style={{"paddingLeft":"10%","paddingRight":"10%"}}>
                          <Typography variant="subtitle1" gutterBottom>
                            Do you want to enrich your experiences or know the latest deals? Now you can get the
                            reviews you need so you'll never have to struggle of not knowing ever again!
                          </Typography>
                        </div>
                      </div>
                      <div className="back">
                        <div style={Style.homePageStyle.flipBackStyle}>
                          <Typography component="h6" variant="h3" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Topics
                          </Typography>
                          <hr />
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Dining
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Shopping
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Movies
                          </Typography>
                          <Typography component="h6" variant="h5" gutterBottom style={Style.homePageStyle.flipTitle}>
                            Travel
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <section className='blue' ref={(section) => { this.Blue = section; }}> </section>
                </div>
              </div>

              <div style={Style.homePageStyle.splitRight}>
                <div style={Style.homePageStyle.rightTop}>
                  <Button variant="outlined" onClick={this.handleOpen} className={classes.button}>
                    Sign in
                  </Button>
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                  >
                    <div style={Style.homePageStyle.signInModal} className={classes.paper}>
                      <form autoComplete='off'>
                        <Typography component="h6" variant="h3" gutterBottom>
                          Log In
                        </Typography>
                        <hr/>
                        <div>
                          <TextField
                            error={error}
                            id="outlined-username-input"
                            label={error ? errorMessage : 'Username'}
                            style={Style.homePageStyle.signInTextField}
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
                            style={Style.homePageStyle.signInTextField}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            type='password'
                            value={this.state.password}
                            onChange={this.onFieldChange('password')}
                          />
                        </div>
                        <Button
                          variant="contained"
                          className={classes.button}
                          onClick={() => this.doLogin(login)}
                          style={Style.loginButtonStyle}
                        >
                          Log In
                        </Button>
                      </form>
                    </div>
                  </Modal>
                </div>
                <div style={Style.homePageStyle.rightBody}>
                  <Typography component="h6" variant="h2" gutterBottom>
                    Sign Up
                  </Typography>
                </div>
                <div style={Style.homePageStyle.rightBody}>
                  <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                      id="firstName"
                      label="First Name"
                      className={classes.textField}
                      onChange={this.handleChange('firstName')}
                      margin="normal"
                      variant="outlined"
                      style={Style.homePageStyle.textFieldStyleHalf}
                    />
                    <TextField
                      id="lastName"
                      label="Last Name"
                      className={classes.textField}
                      onChange={this.handleChange('lastName')}
                      margin="normal"
                      variant="outlined"
                      style={Style.homePageStyle.textFieldStyleHalf}
                    />
                  </form>
                </div>
                <div style={Style.homePageStyle.rightBody}>
                  <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                      id="email"
                      label="Email"
                      className={classes.textField}
                      onChange={this.handleChange('email')}
                      margin="normal"
                      variant="outlined"
                      style={Style.homePageStyle.textFieldStyleFull}
                    />
                  </form>
                </div>
                <div style={Style.homePageStyle.rightBody}>
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
                    style={Style.homePageStyle.textFieldStyleFull}
                  >
                    {schoolList.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div style={Style.homePageStyle.rightBody}>
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
                    style={Style.homePageStyle.textFieldStyleFull}
                  >
                    {yearOfStudyList.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div style={Style.homePageStyle.rightBody}>
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
                    style={Style.homePageStyle.textFieldStyleFull}
                  >
                    {programList.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div style={Style.homePageStyle.rightBody}>
                  <TextField
                    id="username"
                    label="Username"
                    className={classes.textField}
                    onChange={this.handleChange('signUpUserName')}
                    margin="normal"
                    variant="outlined"
                    style={Style.homePageStyle.textFieldStyleFull}
                  />
                </div>
                <div style={Style.homePageStyle.rightBody}>
                  <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                      id="password"
                      label="Password"
                      className={classes.textField}
                      onChange={this.handleChange('signUpPassword')}
                      margin="normal"
                      variant="outlined"
                      type='password'
                      style={Style.homePageStyle.textFieldStyleHalf}
                    />
                    <TextField
                      id="confirmPassword"
                      label="Confirm Password"
                      className={classes.textField}
                      onChange={this.handleChange('confirmPassword')}
                      margin="normal"
                      variant="outlined"
                      type='password'
                      style={Style.homePageStyle.textFieldStyleHalf}
                    />
                  </form>
                </div>
                <br/>
                <br/>
                <AuthConsumer>
                  {({ postRegister }) => {
                    return (
                      <div style={Style.homePageStyle.rightBodyButton}>
                        <Button
                          variant="contained"
                          className={classes.button}
                          style={Style.homePageStyle.buttonStyle}
                          onClick={() => this.handleSignUp(postRegister)}
                        >
                          Create Account
                        </Button>
                      </div>
                    );
                  }}
                </AuthConsumer>

              </div>
            </div>
          )
        }}
      </AuthConsumer>
    )

  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
}

// const SimpleModalWrapped = withStyles(styles)(HomePage)

// export default HomePage;
export default HomePage = withStyles(styles)(HomePage)
