import React from "react";
import { Container } from "@material-ui/core";
import logo from "../../images/logo.png";
import useStyles from "./style";

function Header() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.container}>
        <Container className="d-flex justify-content-center">
          <img src={logo} alt="header" className={classes.image} />
        </Container>
      </div>
    </div>
  );
}

export default Header;
