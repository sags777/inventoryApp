import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    maxHeight: 800,
    maxWidth: 450,
    display: "flex",
    flexDirection: "column",
    border: "1px solid",
    borderRadius: 10,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    alignItems: "center",
    marginTop: 60,
    margin: "auto",
  },

  input: {
    marginTop: 15,
    padding: "auto",
    textAlign: "center",
  },

  username: {
    marginBottom: 20,
    marginTop: 20,
  },

  button:{
    marginTop: 20,
    marginBottom: 40
  },

    image: {
      width: "100%",
      maxWidth: 300,
      paddingTop: 20
    },
}));

export default useStyles;
