import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  newAssignmentWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  inputWrapper: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2, 1),
    },
  },
  newAssignmentBtnWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  assignmentBtn: {
    margin: theme.spacing(0, 2, 3),
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
