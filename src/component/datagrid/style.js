import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "12px",
    marginBottom: "80px",
    height: "100%"
  },
  heading: {
    paddingTop: "12px",
    marginBottom: "20px"
  },
  gridheader:{
    fontSize: "larger",
    fontWeight: "bold",
    fontFamily: "auto"
  },
  topRightBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // marginTop: "37px  !important",
    marginLeft: "20px"
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
