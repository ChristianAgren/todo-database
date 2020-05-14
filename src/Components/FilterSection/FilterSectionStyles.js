import { makeStyles, fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  getAllBtn: {
    marginRight: theme.spacing(2),
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(0.6),
    },
  },
  searchIdentification: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#FFFFFFCC",
    border: "none",
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    border: "1px solid white",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0, 1.2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(3em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

export default useStyles;
