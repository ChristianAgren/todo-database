import React, { useEffect } from "react";

// COMPONENTS
import EditUserModal from "./EditUserModal/EditUserModal";

// MATERIAL UI
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

// STYLES
import useStyles from "./UserManagerStyles";

// -- -- --

function UserManager(props) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    if (!props.user.admin) {
      props.redirectToMain("main")
      console.log("redirect to main");

    }
    props.user.getUsers(setUsers)
  }, [props.user]);

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
