import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  removeScrollbar: {
    width: '100%',
    overflowX: 'hidden'
  },
  error: {
    width: '100%',
    margin: '3rem 0 3rem 0',
    display: 'flex',
    flexDirection: 'column'
  },
  root: {
    width: 'calc(100% + 34px)',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    left: '50%',
    transform: 'translateX(calc(-50% + 8px))',
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 15rem)',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  listTitle: {
    fontSize: '1.1rem',
    '& > button': {
      position: 'absolute',
      right: '1rem',
      color: 'rgba(0, 0, 0, 0.26)'
    }
  },
  userName: {
    fontSize: '0.9rem',
    position: 'absolute',
    left: '1rem',
    [theme.breakpoints.down(510)]: {
      display: "none",
    },

  },
  userNameMobile: {
    fontSize: '0.9rem',
    position: 'absolute',
    left: '1rem',
    [theme.breakpoints.up(510)]: {
      display: "none",
    },
  },
  editAssignment: {
    margin: theme.spacing(1, 6),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  ul: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'inherit',
    padding: 0,
  },
  subInfo: {
    position: 'relative',
    margin: theme.spacing(1, 5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  subTasks: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)'
  }
}));

export default useStyles;
