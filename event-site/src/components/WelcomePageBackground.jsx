import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 300,
    right: 0,
    bottom: 0
  },
  moon: {
    position: 'fixed',
    top: 75,
    left: 800,
    animation: 'fadein 2s ease-in'
  },
  rootSecondary: {
    position: 'fixed',
    bottom: 0,
    right: 0
  },
  moonFilter: {
    filter: "drop-shadow( 5px 5px 10px rgba(0,0,0,.15))"
  }
})

const bgColors = [
  '#80D3F9',
  '#1D87E4',
  '#5E6BB2'
]

const circleColors = [
  '#FCD736',
  '#F8A724',
  '#F9F9F9'
]

class WelcomePageBackground extends Component {
  render() {
    const { classes } = this.props;

    let index = 2;
    const time = new Date()
    if (time.getHours() < 12) {
      index = 0
    } else if (time.getHours() < 17) {
      index = 1
    }

    return (
      <div>
      <div className={classes.root}>
        <div classes={classes.shape}>
          <svg width="1024px" height="1024px" viewBox="0 0 1024 1024" enableBackground="new 0 0 1024 1024">
          <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="142.832" y1="-82.4644" x2="381.2109" y2="330.42">
            <stop  offset="0" stopColor="#FFFFFF" stopOpacity="0"/>
            <stop  offset="1" stopColor={bgColors[index]} stopOpacity="0.4"/>
          </linearGradient>
          <path fill="url(#SVGID_1_)" d="M0,540.414C48.808,457.74,149.526,324.684,298,311c204.92-18.887,348-113,392-254
            c5.637-18.062,6.192-37.259,2.894-57H0V540.414z"/>
          </svg>
        </div>
        <div className={classes.moon}>
        <svg className={classes.moonFilter} x="0px" y="0px" width="350px" height="350px" viewBox="0 0 350 350" enableBackground="new 0 0 350 350">
          <g>
            <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="170.6098" y1="33.3901" x2="33.3901" y2="170.6098">
              <stop  offset="0" stopColor={circleColors[index]} stopOpacity="0.2"/>
              <stop  offset="1" stopColor={circleColors[index]}/>
            </linearGradient>
            <circle fill="url(#SVGID_2_)" cx="114" cy="114" r="114"/>
          </g>
          </svg>
        </div>
      </div>
      <div className={classes.rootSecondary}>
        <svg x="0px" y="0px" width="1024px" height="1024px" viewBox="0 0 1024 1024" enableBackground="new 0 0 1024 1024">
          <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="890.3994" y1="1101.1348" x2="600.4658" y2="598.9551">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0"/>
              <stop  offset="1" stopColor={bgColors[index]} stopOpacity="0.5"/>
            </linearGradient>
          <path fill="url(#SVGID_3_)" d="M1024,354.428c-1.305,59.161-22.132,314.245-281.421,389.651 C539.245,803.212,55.259,719.377,285.862,1024H1024V354.428z"/>
        </svg>
      </div>
      </div>
    )
  }
}

export default withStyles(styles)(WelcomePageBackground)
