import React from "react";
import { Container } from "@material-ui/core";
import footerLogo from "../../images/footer-logo.png";
import useStyles from "./style";

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <img src={footerLogo} alt="footer" className={classes.image} />
    </div>
  );
}

export default Footer;
