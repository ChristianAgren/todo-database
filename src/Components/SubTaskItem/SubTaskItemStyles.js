import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inline: {
      padding: theme.spacing(0, 0, 0, 5)
  },
  listItemSecondary: {
      margin: theme.spacing(0, 2, 0, 0),
      '& > button': {
          margin: theme.spacing(0, 1, 0, 0)
      }
  }
}))
export default useStyles;
