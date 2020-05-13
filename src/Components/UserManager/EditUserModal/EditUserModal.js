import React from "react";
import {
  Button,
  FormControlLabel,
  Switch,
  Grid,
  makeStyles,
  MenuItem,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core/";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "52%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",

    width: "100%",
    maxWidth: "40rem",
    height: "auto",

    backgroundColor: theme.palette.background.paper,
    borderRadius: ".4rem",
    borderBottom: ".4rem solid rgb(17,82,147)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down(321)]: {
      width: "100%",
      borderRadius: 0,
    },
  },

  header: {
    color: "#3f51b5",
  },

  editUserContainer: {
    position: "relative",
    width: "100%",

    "& > *": {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(1),
    },
  },

  role: {
    padding: theme.spacing(1),

    border: "1px slid #0002",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },

  btnWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",

    margin: "1rem auto .5rem",
    width: "70%",

    "& > *": {
      margin: ".2rem",
    },

    "& .MuiTypography-overline": {
      width: "100%",
      textAlign: "center",
    },
  },
}));

function EditUserModal(props) {
  const classes = useStyles();
  const apiURL = "http://localhost:3000/api/users/";

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    if (props.closeUserMenu) {
      props.closeUserMenu()
    }
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
          if (props.updateUsers) {
            props.updateUsers(prevSettings, data);
          }
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
        if (props.updateUsers) {
          props.updateUsers(data);
        } else {
          props.userContext.logoutUser()
        }
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
            {props.userContext.admin
              ? 'Manage user'
              : 'Change settings'
            }
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
        {(props.userContext.admin &&
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
        )}
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
    <>
      {props.userContext.admin
        ? <IconButton onClick={() => handleOpen()}>
            <SettingsIcon />
          </IconButton>
        : <MenuItem onClick={() => handleOpen()}>
            Settings
          </MenuItem>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

export default EditUserModal;
