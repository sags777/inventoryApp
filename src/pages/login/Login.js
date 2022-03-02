import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useStyles from "./style";
import logo from "../../images/logo.png";
import { authentication } from "../../apis/Api";

export default function StateTextFields() {
  //Use of style.js
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  //validation
  const [validation, setValidation] = useState(true);

  //validations username
  const [uEmpty, setUempty] = useState("none");
  const [uErrMsg, setUerrMsg] = useState("*username required");

  //validations password
  const [pEmpty, setPempty] = useState("none");
  const [pErrMsg, setPerrMsg] = useState("*password required");

  //Login Success
  const [success, setSuccess] = useState("none");

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    if (validation) {
      username === "" ? setUempty("") : setUempty("none");
      password === "" ? setPempty("") : setPempty("none");
    }

    const loginObj = {
      userName: username,
      password: password,
    };
    authentication(loginObj).then((response) => {
      if (response === "Admin") {
        setSuccess("");
        setTimeout(() => {
          window.open("/", "_self");
        }, 1000);
      }
    });
  };

  return (
    <Container>
      <Box className={classes.box}>
        {/* <Container className="d-flex justify-content-center">
          <img src={logo} alt="header" className={classes.image} />
        </Container> */}

        <div className={classes.input}>
          <h2>
            <b>Log In</b>
          </h2>
          <Alert severity="success" sx={{ display: success }}>
            Login Success. Redirecting to application...
          </Alert>
          <div className={classes.username}>
            <TextField
              id="outlined-name"
              label="Username"
              sx={{ width: "35ch" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography sx={{ color: "red", display: uEmpty }}>
              {uErrMsg}
            </Typography>
          </div>
          <div className={classes.passowrd}>
            <FormControl variant="outlined" sx={{ width: "35ch" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={
                        showPass
                          ? () => setShowPass(false)
                          : () => setShowPass(true)
                      }
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Typography sx={{ color: "red", display: pEmpty }}>
              {pErrMsg}
            </Typography>
          </div>
          <div className={classes.button}>
            <Button
              variant="contained"
              sx={{ p: 1.5, width: "35ch" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </Box>
    </Container>
  );
}
