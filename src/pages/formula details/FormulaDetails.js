import * as React from "react";
import { Box, Paper, Container, Alert } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import useStyles from "./style";
import OpacityIcon from "@mui/icons-material/Opacity";

export default function FormulaDetails(props) {
  //Use of style.js
  const classes = useStyles();
  console.log("info", props.fDetails);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      fontSize: 15,
      color: "black",
      border: "1px solid",
    },
  }));

  return (
    <div className={classes.container}>
      <Container>
        
      </Container>
      <Container>
        {props.fDetails.length === 0 ? (
          <></>
        ) : (
          <p className={classes.formulaHeader}>
            Formula Details (ID: {props.fDetails[0].formulaID})
          </p>
        )}
      </Container>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 250,
            maxHeight: 250,
            marginBottom: 5,
          },
        }}
      >
        {props.fDetails.length === 0 ? (
          <h5>Sorry! No data to show.</h5>
        ) : (
          props.fDetails.map((obj, index) => (
            <Paper elevation={4} key={index} className={classes.paper}>
              <Container>
                <p className={classes.code}>
                  <u>{obj.code}</u>
                </p>
                <BootstrapTooltip
                  title={obj.name}
                  placement="top"
                  sx={{ fontSize: 15, bgcolor: "white" }}
                >
                  <p className={classes.name}>{obj.name}</p>
                </BootstrapTooltip>

                <p className={classes.quantity}>
                  <OpacityIcon />
                  <b>Quantity:</b>
                  <br />
                  <span style={{ paddingLeft: "25px" }}>
                    {obj.ammountGrams} gm | {obj.ammountOz} Oz
                  </span>
                </p>
              </Container>
              <Alert
                sx={{ bgcolor: obj.colorCode }}
                className={classes.colorLine}
                icon={false}
              ></Alert>
            </Paper>
          ))
        )}
      </Box>
    </div>
  );
}
