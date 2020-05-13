import React from "react";

// MATERIAL UI
import {
  Button,
  FormControlLabel,
  Switch,
  Grid,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core/";

//ICONS
import SettingsIcon from "@material-ui/icons/Settings";

// CONTEXTS
import { UserContext } from "../../../Contexts/UserContext";

// STYLES
import useStyles from "./EditUserModalStyles";

// -- -- --

function EditUserModal(props) {
  const classes = useStyles();
  const apiURL = "http://localhost:3000/api/users/";

  const [open, setOpen] = React.useState(false);

  const handleOpen = (event) => {
    getUser();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputError(false);
  };

  const [userInfo, setUserInfo] = React.useState({
    _id: "",
    name: "",
    newPassword: "",
    confirmNewPassword: "",
    admin: true,
  });
  const [prevSettings, setPrevSettings] = React.useState({
    name: "",
    password: "",
    admin: null,
  });
  const [inputError, setInputError] = React.useState(false);

  const [deleting, setDeleting] = React.useState(null);

  async function getUser() {
    await fetch(apiURL + props.name, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPrevSettings({
          name: data.name,
          password: data.password,
          admin: data.admin,
        });

        setUserInfo({
          _id: data._id,
          name: data.name,
          newPassword: "",
          confirmNewPassword: "",
          admin: data.admin,
        });
      });
  }

  const changeUserInfo = (event, anchor) => {
    if (anchor === "name") {
      setInputError(false);
    }
    setUserInfo({
      ...userInfo,
      [anchor]: event.target.value.trim(),
    });
  };

  const disableSaveBtn = () => {
    // return FALSE if changes were made
    return (
      (prevSettings.name === userInfo.name &&
        prevSettings.admin === userInfo.admin &&
        (userInfo.newPassword.length === 0 ||
          userInfo.newPassword.length < 3)) ||
      userInfo.newPassword !== userInfo.confirmNewPassword ||
      userInfo.name.length < 3
    );
  };

  const handleSaveClick = async () => {
    let password;

    if (userInfo.newPassword !== prevSettings.password) {
      password = userInfo.newPassword;
    } else {
      password = prevSettings.password;
    }

    await fetch(apiURL + props.name, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        admin: userInfo.admin,

        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.err) {
          setInputError(true);
        } else {
          if (prevSettings.name === props.userContext.name) {
            props.userContext.setUserInState({
              name: data.name,
              admin: data.admin,
            });
          }
          props.updateUsers(prevSettings, data);
          handleClose();
        }
      });
  };

  const handleDeleteClick = async () => {
    await fetch(apiURL + props.name, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        props.updateUsers(data);
        handleClose();
      });
  };

  const toggleAdmin = () => {
    setUserInfo({
      ...userInfo,
      admin: !userInfo.admin,
    });
  };

  const body = (
    <div className={classes.paper}>
      <Grid container className={classes.editUserContainer} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.header}>
            Manage user
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline">name</Typography>
          <TextField
            error={inputError}
            helperText={inputError ? "Username is unavailable" : null}
            value={userInfo.name}
            onChange={(e) => changeUserInfo(e, "name")}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline">new password</Typography>
          <TextField
            type="password"
            value={userInfo.newPassword}
            onChange={(e) => changeUserInfo(e, "newPassword")}
          />
        </Grid>
        {userInfo.newPassword !== "" && (
          <Grid item xs={12}>
            <Typography variant="overline">confirm new password</Typography>
            <TextField
              type="password"
              value={userInfo.confirmNewPassword}
              onChange={(e) => changeUserInfo(e, "confirmNewPassword")}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="overline">ID</Typography>
          <TextField disabled value={userInfo._id} />
        </Grid>
        <Grid item xs={12} className={classes.role}>
          <Typography variant="overline">user</Typography>

          <FormControlLabel
            onClick={() => toggleAdmin()}
            control={<Switch color="primary" checked={userInfo.admin} />}
            label={<Typography variant="overline">role</Typography>}
            labelPlacement="top"
          />

          <Typography variant="overline">admin</Typography>
        </Grid>
        <Grid item xs={12} className={classes.btnWrapper}>
          {deleting ? (
            <>
              <Typography variant="overline" className={classes.sure}>
                are you sure?
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteClick()}
              >
                yes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setDeleting(false)}
              >
                no
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setDeleting(true)}
              >
                delete
              </Button>
              <Button
                variant="outlined"
                color="primary"
                disabled={disableSaveBtn()}
                onClick={() => handleSaveClick()}
              >
                save
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );

  return (
    <UserContext.Consumer>
      {(user) => (
        <div>
          <IconButton onClick={(e) => handleOpen(e)}>
            <SettingsIcon />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default EditUserModal;
