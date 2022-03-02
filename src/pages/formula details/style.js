import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

  container:{
    paddingLeft: 60,
    marginBottom: 100
  },

  formulaHeader: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3c3b3b",
  },

  code: {
    fontSize: 20,
    paddingTop: 5,
    fontWeight: "bold",
    color: "#3c3b3b",
  },

  name: {
    fontSize: 15,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },

  colorLine: {
    paddingTop: 5,
    bottom: 0,
    alignSelf: "flex-end",
    verticalAlign: "bottom",
  },

}));

export default useStyles;
