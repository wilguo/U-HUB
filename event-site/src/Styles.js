const Styles = {
  homePageStyle:{
    splitLeft: {
      "height":"200vh",
      "position": "absolute",
      "left": "0",
      "top": "0",
      "bottom": "0",
      "width": "70%",
      "backgroundColor": "#4652b0"
    },
    splitRight: {
      "position": "fixed",
      "left": "70%",
      "top": "0",
      "bottom": "0",
      "right": "0",
      "backgroundColor": "white"
    },
    leftBanner:{
      "height": "100vh",
      "backgroundColor": "#4652b0",
      // "backgroundColor": "grey",
      "paddingLeft": "3%"
    },
    leftBannerHeader: {
      "paddingTop": "8%",
      "paddingLeft": "3%"
    },
    leftBannerMain: {
      "paddingTop": "23%",
      "paddingLeft": "3%"
    },
    leftBannerTitleFont:{
      "fontSize": "5.5em",
      "fontWeight": "900",
      "letterSpacing": "0.1em",
      "textTransform": "uppercase",
      "color":"white"
    },
    leftBannerBodyFont:{
      "fontSize": "1em",
      "fontWeight": "350",
      "letterSpacing": "0.10em",
      "textTransform": "uppercase",
      "color":"white",
      "lineHeight": "1.8"
    },
    leftBannerBodyDiv:{
      "paddingRight": "13%"
    },
    arrow:{
      "boxSizing": "border-box",
      "height": "3vw",
      "width": "3vw",
      "borderStyle": "solid",
      "borderColor": "white",
      "borderWidth": "0px 3px 3px 0px",
      "transform": "rotate(45deg)",
      "transition": "border-width 150ms ease-in-out",
    },
    leftMain:{

    },
    leftMainTextStyle:{
      "fontSize": "1em",
      "fontWeight": "600",
      "letterSpacing": "0.15em",
      "textTransform": "uppercase",
      "color":"white",
      "lineHeight": "1.8"
    },
    rightTop:{
      "height": "15vh",
      "textAlign": "right",
      "paddingTop": "7%",
      "paddingRight": "19%",
      "backgroundColor": "white",
    },
    rightBody:{
      "backgroundColor": "white",
      "paddingLeft": "10%"
    },
    rightBodyButton:{
      "backgroundColor": "white",
      "paddingLeft": "9%",
      "marginTop": "20px"
    },
    textFieldStyleFull:{
      "backgroundColor": "white",
      "width":"350px",
      "height":"50px"
    },
    textFieldStyleHalf:{
      "backgroundColor": "white",
      "width":"175px",
      "height":"50px"
    },
    buttonStyle:{
      "width":"350px",
      "height": "40px"
    },
    signInModal: {
      "width": "55vh",
      "height": "35vh",
      "backgroundColor": "white",
      "marginLeft": "35%",
      "marginTop": "15%",
      "textAlign": "center",
      "paddingTop": "2%"
    },
    signInTextField: {
      "backgroundColor": "white",
      "width":"210px",
      "height":"50px"
    },
    flipCardSpacing:{
      "width":"60px",
      "height":"100px",
      "float":"left"
    },
    flipCardContainerDiv: {
      "width":"100vw",
      "height":"50vh",
      "paddingLeft": "6vw",
      // "backgroundColor": "red",
      "paddingTop": "6vh"
    },
    flipTitle: {
      "fontWeight": "350",
      "letterSpacing": "0.10em",
      "textTransform": "uppercase",
      "color":"black",
      "lineHeight": "1.8"
    },
    flipFrontImage: {
      "height":"80px",
      "width":"80px"
    },
    flipFrontImageTitleSpacing: {
      "marginTop":"8%"
    },
    flipBackStyle:{
      "paddingTop":"10%",
      "paddingLeft":"10%",
      "paddingRight":"10%",
      "textAlign":"Center"
    },
    flipBackHRSpacing: {
      "marginTop":"0",
      "marginBottom":"10px"
    }
  },
  eventAppBarStyle: {
    buttonStyle: {"color":"white"}
  },
  loginStyle: {
    outerDivStyle:{
      "backgroundColor":"#e0e0e0",
      "height":"100vh",
      "width":"100vw",
      "textAlign": "center",
      "paddingTop": "10%"
    },
    innerDivStyle:{
      "backgroundColor":"#4652b0",
      "padding":"60px"
    },
    loginHeadingStyle:{
      "color":"white"
    },
    loginTextFieldStyle:{
      "width": "300px",
      "backgroundColor":"white"
    },
    headerStyle: {"color":"black"},
    loginButtonStyle:{
      "width":"150px"
    }
  },
  signUpPageStyle: {
    outerDiveStyle:{
      "backgroundColor": "#F5F5F5",
      "width":"100vw",
      "height":"100vh",
      "paddingTop":"5%",
      "paddingLeft":"5%"
    },
    largeTextFieldStyle:{
      "backgroundColor": "white",
      "width":"620px"
    },
    mediumTextFieldStyle:{
      "backgroundColor": "white",
      "width":"300px"
    },
    smallTextFieldStyle:{
      "backgroundColor": "white",
      "width":"195px"
    },
    buttonStyle:{
      "width":"620px",
      "height": "40px"
    }
  }
}

export default Styles;