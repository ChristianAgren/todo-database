import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "52%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",

    width: "100%",
    maxWidth: "40rem",
    height: "auto",

    backgroundColor: theme.palette.background.paper,
    borderRadius: ".4rem",
    borderBottom: ".4rem solid rgb(17,82,147)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down(321)]: {
      width: "100%",
      borderRadius: 0,
    },
  },

  header: {
    color: "#3f51b5",
  },

  editUserContainer: {
    position: "relative",
    width: "100%",

    "& > *": {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(1),
    },
  },

  role: {
    padding: theme.spacing(1),

    border: "1px slid #0002",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },

  btnWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",

    margin: "1rem auto .5rem",
    width: "70%",

    "& > *": {
      margin: ".2rem",
    },

    "& .MuiTypography-overline": {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export default useStyles;
