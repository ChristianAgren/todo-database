import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    "& .MuiButton-label": {
      color: "white",
    },
  },
  paper: {
    position: "absolute",
    top: "53%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",

    width: "40%",
    minWidth: "20rem",
    height: "auto",

    backgroundColor: theme.palette.background.paper,
    borderRadius: ".4rem",
    borderBottom: ".4rem solid rgb(17,82,147)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down(321)]: {
      width: "100%",
      borderRadius: 0,
    },
  },
  loginModal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "rgb(17,82,147)",
    "& .MuiGrid-item": {
      "& > .MuiSvgIcon-root": {
        position: "absolute",
        top: "-2rem",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "5rem",
        backgroundColor: theme.palette.background.paper,
        borderRadius: ".4rem",
      },
    },
    "& .MuiTypography-h4": {
      padding: theme.spacing(5, 0, 3, 0),
    },
    "& .MuiFormControl-root": {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down(400)]: {
        margin: theme.spacing(0.2, 0),
      },
    },
  },
  loginBtn: {
    margin: theme.spacing(3, 0),
    width: "50%",
    "& .MuiButton-outlinedPrimary": {
      width: "100%",
    },
  },
  registerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiTypography-overline": {
      fontSize: "0.84rem",
      margin: theme.spacing(0, 1),
    },
  },
}));

export default useStyles;
