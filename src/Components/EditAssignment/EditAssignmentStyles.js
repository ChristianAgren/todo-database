import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    height: "90%",
    maxHeight: "40rem",
    width: "95%",
    maxWidth: "30rem",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  addAssignmentBtn: {
    margin: theme.spacing(2, 2, 3),
    display: "flex",
    justifyContent: "center",
    "& .MuiTypography-overline": {
      fontSize: ".9rem",
      marginLeft: ".4rem",
      color: "rgba(0, 0, 0, 0.54)",
    },
    color: "rgb(92,182,96)",
  },
}));

export default useStyles;
