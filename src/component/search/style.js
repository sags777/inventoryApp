import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxHeight: 350,
    marginTop: 50,
    "& .MuiIconButton-colorPrimary":{
      color:"white !important",
      marginBottom: "23px",
      marginLeft: "11px"
     }
  }
}));

export default useStyles;
