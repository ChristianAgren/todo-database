import React from "react";
import {
  Button,
  FormControlLabel,
  Switch,
  Grid,
  makeStyles,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core/";
import { UserContext } from "../../../Contexts/UserContext";
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

  const handleOpen = (event) => {
    getUser();

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [userInfo, setUserInfo] = React.useState({
    _id: "",
    name: "",
    newPassword: "",
    confirmNewPassword: "",
    admin: true,
  });
  const [prevSettings, setPrevSettings] = React.useState(null);
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
          _id: data._id,
          name: data.name,
          newPassword: data.password,
          confirmNewPassword: "",
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
    setUserInfo({
      ...userInfo,
      [anchor]: event.target.value,
    });
  };

  const disableSaveBtn = () => {
    return (
      JSON.stringify(prevSettings) === JSON.stringify(userInfo) ||
      userInfo.newPassword !== userInfo.confirmNewPassword ||
      userInfo._id.length < 3 ||
      userInfo.name.length < 3
    );
  };

  const handleSaveClick = async () => {
    console.log(userInfo);
    let password;

    if (userInfo.newPassword != prevSettings.newPassword) {
      password = userInfo.newPassword;
    } else {
      password = prevSettings.newPassword;
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
        console.log(response);

        return response.json();
      })
      .then((data) => {
        console.log(data);

        props.updateUsers(prevSettings, data);
        handleClose();
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
        console.log(data);
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
