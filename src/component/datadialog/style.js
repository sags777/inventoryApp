import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "12px",
    marginBottom: "40px",
    maxHeight: "1500px",
    overflowX: "hidden",
    overflowY: "auto",
  },
  heading: {
    paddingTop: "12px",
    marginBottom: "20px"
  },
  gridheader:{
    fontWeight: "bold",
    fontFamily: "auto"
  },
  grid:{
    height: "410px"
  },
  closeBtn:{
    marginTop: "10px"
  },
  box: {
    height: 50,
    display: "flex",
    padding: 8
  },
  bottomLeftBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: "37px !important"
  },
  "data-grid":{
    height: "400px",
    maxWidth: "1300px",
    "& p": {
      marginTop: "13px",
      fontFamily: "auto",
      fontWeight: "bold"
    },
    "& .MuiDataGrid-footerContainer":{
      borderTop: "1px outset rgba(28,110,164,0.22)",
      backgroundColor: "#a7cbe9",
      fontFamily: "auto",
      fontWeight: "bold"
    }
  }
}));

export default useStyles;
