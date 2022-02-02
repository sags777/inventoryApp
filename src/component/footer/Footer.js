import React from "react";
import { Container } from "@material-ui/core";
import footerLogo from "../images/footer-logo.png";
import useStyles from "./style";

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container className="d-flex justify-content-center">
        <img src={footerLogo} alt="footer" className={classes.image} />
      </Container>
    </div>
  );
}

export default Footer;
