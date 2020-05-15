import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    right: 0,
    left: 0,
    top: 0,
    zIndex: 100
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    width: "6rem",
    fill: "#e7e7e7",
  },
  logoThing: {
    fill: "#22fa66",
  },
}));

export default useStyles;
