import React from "react";
import injectSheet from "react-jss";

const styles = {
  SignIn: {
    borderRadius: 0,
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    backgroundColor: "#ffffff",
    border: "solid 1.5px #dddddd",
    borderLeft: 0,
    minWidth: "66px",
    minHeight: "55px",
    maxWidth: "80px",
    maxHeight: "60px",
    height: "10vh",
    width: "5vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    "& span": {
      transitionDuration: ".3s"
    },
    "&:hover span": {
      color: "#888"
    }
  },
  text: {
    fontFamily: "Circular Std",
    fontSize: "1.7rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000"
  }
};

const SignInButton = ({ classes }) => {
  return (
    <button className={classes.SignIn}>
      <span className={classes.text}>Sign In</span>
    </button>
  );
};

export default injectSheet(styles)(SignInButton);
