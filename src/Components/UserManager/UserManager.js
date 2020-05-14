import React, { useEffect } from "react";
import EditUserModal from "./EditUserModal/EditUserModal";

import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "100%",

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

function UserManager(props) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);

  useEffect(() => props.user.getUsers(setUsers), []);

  const updateUsersInState = (user, newUser) => {
    const state = [...users];
    const userIndex = state.findIndex((u) => u._id === user._id);

    if (newUser) state.splice(userIndex, 1, newUser);
    if (!newUser) state.splice(userIndex, 1);

    setUsers(state);
  };

  return (
    <Container maxWidth="md" className={classes.mainContainer}>
      <Typography variant="h4" className={classes.header}>
        Manage users
      </Typography>

      <List dense className={classes.userList}>
        <ListItem className={classes.user}>
          <ListItemText primary="name" />
          <ListItemText primary="role" />
          <ListItemText primary="ID" />
        </ListItem>
        {users.length === 0 ? (
          <ListItem className={classes.user}>
            <Typography variant="h6" className={classes.loading}>
              Users loading...
            </Typography>
          </ListItem>
        ) : (
          users.map((user) => (
            <ListItem className={classes.user} key={user._id}>
              <ListItemText primary={user.name} />
              <ListItemText primary={user.admin ? "admin" : "user"} />
              <ListItemText primary={user._id} />

              <ListItemIcon className={classes.editBtn} tabIndex={user.index}>
                <EditUserModal
                  name={user.name}
                  updateUsers={updateUsersInState}
                  userContext={props.user}
                />
              </ListItemIcon>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
}

export default UserManager;
