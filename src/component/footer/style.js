import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    backgroundColor: "#121212",
    height: 80,
    marginTop: 20,
    textAlign: "center",
  },

  image: {
    width: "100%",
    maxWidth: 250,
    marginTop: 20,
  },
}));

export default useStyles;
