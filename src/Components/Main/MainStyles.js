import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "100%",
    paddingTop: theme.spacing(6),
    backgroundColor: "#F5F5F5",
  },
  title: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
