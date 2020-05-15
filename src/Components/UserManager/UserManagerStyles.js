import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(8),

    "& .MuiList-padding": {
      padding: 0,
    },
  },

  header: {
    padding: theme.spacing(1),
    color: "#3f51b5",
  },
  userList: {
    width: "100%",
    background: "#0004",

    borderRadius: theme.shape.borderRadius,
  },
  user: {
    position: "relative",
    width: "100%",

    "& .MuiListItemText-root": {
      flex: "0 1 auto",
    },

    "& > *:not(.MuiListItemIcon-root)": {
      padding: theme.spacing(1),
    },
    "& > *:nth-child(1)": {
      width: "calc(100% / 5)",
      [theme.breakpoints.down(500)]: {
        width: "calc(100% / 2)",
      },
    },
    "& > *:nth-child(2)": {
      width: "calc(100% / 5)",
      [theme.breakpoints.down(500)]: {
        width: "calc(100% / 2)",
      },
    },
    "& > *:nth-child(3)": {
      width: "calc(3*(100% / 5))",
      [theme.breakpoints.down(500)]: {
        display: "none",
      },
    },
    "&:nth-child(2n)": {
      background: "#fff8",
    },
    "&:nth-child(2n -1)": {
      background: "#fff5",
    },
    "& :nth-child(2n)": {
      // background: "#fff5"
    },
    "&:first-child": {
      background: "#3f51b5",
      color: "#e7e7e7",
      textDecoration: "underline",
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
  },
  editBtn: {
    position: "absolute",
    right: 0,
  },
  loading: {
    textAlign: "center",
    color: "#0005",
  },
}));

export default useStyles;
