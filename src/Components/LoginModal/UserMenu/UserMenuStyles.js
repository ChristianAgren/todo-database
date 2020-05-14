import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userMenu: {
    "& .MuiButton-label": {
      fontSize: ".9rem",
      "& .MuiSvgIcon-root": {
        margin: theme.spacing(0, 0, 0, 1),
      },
    },
  },
}));

export default useStyles;
