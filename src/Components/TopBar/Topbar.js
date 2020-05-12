// @ts-nocheck
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LoginModal from "../LoginModal/LoginModal";
import { UserContext } from "../../Contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}));

function Topbar(props) {
  const classes = useStyles();

  return (
    <UserContext.Consumer>
      {(user) => (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 213.88 86.25"
                  className={classes.logo}
                >
                  <path
                    class="cls-1"
                    d="M0,20.49V38H17.78V84.76h15l3.74-10.44,1.64-4.58V38H49.55l6.27-17.51Z"
                  />
                  <path
                    class="cls-1"
                    d="M138.08,47.33a44.33,44.33,0,0,0-13.34-3.69L117,42.56c-3.88-.54-6-1.8-6-4.33s2.17-4.15,7.77-4.15c6.14,0,8.21,2.25,8.66,6.13h8.34l-6.7-20A47.07,47.07,0,0,0,118,19c-20.62,0-26.61,9.56-27.29,19.08l1.94,5.72L96.07,54c3.31,3.2,8,5.18,13.38,6.1l1.11.17,7.77,1.09c7,1,9.11,2.44,9.11,5.23,0,3-2.52,4.43-8.39,4.43-2.8,0-5.12-.35-6.8-1.42s-2.81-3-3-6H99.32l1.27,3.74,5.9,17.44a44.31,44.31,0,0,0,10.67,1.45q.75,0,1.53,0c14.83,0,24.19-5.26,27.72-14Z"
                  />
                  <path
                    class="cls-1"
                    d="M104.49,84.76H84.09l-2.53-8.39-8.75-29.7L70.1,37.1c-.81,3.16-1.81,6.41-2.71,9.57l-8.93,29.7-.06.2-2.47,8.19H34.8l3.74-10.44,1.64-4.58,9-25L51.55,38l2-5.63,4.25-11.88H82.74l4,11.88L88.67,38l2,5.94,9.77,28.88Z"
                  />
                  <polygon
                    class="cls-1"
                    points="170.72 49.46 166.3 60.45 171.08 74.75 151.73 81.22 149.41 74.28 141.08 49.33 138.69 42.21 131.99 22.16 131.36 20.26 150.71 13.79 158.69 37.68 169.63 7.47 191.97 0 178.98 32.04 213.88 60.45 191.8 67.83 170.72 49.46"
                  />
                  <polygon
                    class="cls-1"
                    points="78.71 80.76 61.31 80.76 62.23 77.72 62.29 77.52 70.09 51.59 77.73 77.52 78.71 80.76"
                  />
                </svg>
              </IconButton>
              {/* <Typography variant="h6" className={classes.title}>
               
              </Typography> */}
              <LoginModal changeView={props.changeView} />
            </Toolbar>
          </AppBar>
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Topbar;
