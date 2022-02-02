import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "#d5cec4",
    height: 200,
  },

  image: {
    width: "100%",
    maxWidth: 250,
    marginTop: 50,
  },
}));

export default useStyles;
