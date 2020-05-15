import React from "react";

// COMPONENTS
import UserMenu from "./UserMenu/UserMenu";

// MATERIAL UI
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core/";

// ICONS
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

// CONTEXTS
import { UserContext } from "../../Contexts/UserContext";

// STYLES
import useStyles from "./LoginModalStyles";

// -- -- --

function LoginModal(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState("login");
  const [loginInput, setLoginInput] = React.useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    showPassword: false,
    showPasswordConf: false,
  });

  const [inputError, setInputError] = React.useState({
    login: false,
    register: false,
    user: false,
  });

  const changeLoginInput = (event, anchor) => {
    if (anchor === "username") {
      setInputError({
        ...inputError,
        user: false,
      });
    }
    setLoginInput({
      ...loginInput,
      [anchor]: event.target.value,
    });
  };

  const handleClickShowPassword = (anchor) => {
    setLoginInput({
      ...loginInput,
      [anchor]: !loginInput[anchor],
    });
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);

    setView("login");
    clearPasswordField();
    clearInputErrors();
  };

  const handleSetError = (anchor) => {
    if (anchor === "user") {
      setInputError({
        ...inputError,
        register: false,
        [anchor]: true,
      });
    } else {
      setInputError({
        ...inputError,
        [anchor]: true,
      });
    }
  };

  const clearInputErrors = () => {
    setInputError({
      login: false,
      register: false,
      user: false,
    });
  };

  const clearPasswordField = () => {
    setLoginInput({
      ...loginInput,
      password: "",
      passwordConfirmation: "",
      showPassword: false,
    });
  };

  const handleUserHelperText = () => {
    if (inputError.user && view === "register") {
      return "Username is unavailable";
    } else if (inputError.login && view === "login") {
      return "Username or password was incorrect";
    } else {
      return "";
    }
  };

  const handlePasswordHelperText = () => {
    if (inputError.login && view === "login") {
      return "Username or password was incorrect";
    } else if (inputError.register && view === "register") {
      return "Passwords didn't match";
    } else {
      return "";
    }
  };

  const handlePrimaryClick = (user) => {
    if (view === "login") {
      user.loginUser(
        { name: loginInput.username, password: loginInput.password },
        handleCloseModal,
        handleSetError
      );
    } else {
      if (loginInput.password === loginInput.passwordConfirmation) {
        clearInputErrors();
        user.clientRegisterUser(
          { name: loginInput.username, password: loginInput.password },
          handleCloseModal,
          handleSetError,
          props.setUsers
        );
        clearPasswordField();
      } else {
        handleSetError("register");
      }
    }
  };

  const disablePrimaryBtn = () => {
    if (view === "login") {
      return loginInput.username.length < 3 || loginInput.password.length < 3;
    } else {
      return (
        loginInput.username.length < 3 ||
        loginInput.password.length < 3 ||
        loginInput.passwordConfirmation.length < 3
      );
    }
  };

  const handleSecondaryClick = () => {
    if (view === "login") {
      setView("register");
    } else {
      setView("login");
    }
    clearInputErrors();
  };

  const body = (
    <UserContext.Consumer>
      {(user) => (
        <div className={classes.paper}>
          <Grid container className={classes.loginModal}>
            <Grid item xs={12}>
              {view === "login" ? <AccountBoxIcon /> : <AddBoxIcon />}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">
                {view === "login" ? "Login" : "Register"}
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  id="outlined-username"
                  error={view === "login" ? inputError.login : inputError.user}
                  helperText={handleUserHelperText()}
                  label="Username"
                  variant="outlined"
                  value={loginInput.username}
                  onChange={(e) => changeLoginInput(e, "username")}
                />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  htmlFor="outlined-password"
                  error={
                    view === "login" ? inputError.login : inputError.register
                  }
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-password"
                  type={loginInput.showPassword ? "text" : "password"}
                  error={
                    view === "login" ? inputError.login : inputError.register
                  }
                  value={loginInput.password}
                  onChange={(e) => changeLoginInput(e, "password")}
                  labelWidth={75}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        tabIndex="-1"
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword("showPassword")}
                      >
                        {loginInput.showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  variant="outlined"
                  error={
                    view === "login" ? inputError.login : inputError.register
                  }
                >
                  {handlePasswordHelperText()}
                </FormHelperText>
              </FormControl>
              {view === "register" && (
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    variant="outlined"
                    htmlFor="outlined-passwordConfirm"
                    error={
                      view === "login" ? inputError.login : inputError.register
                    }
                  >
                    Confirm password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-passwordConfirm"
                    type={loginInput.showPasswordConf ? "text" : "password"}
                    error={inputError.register}
                    value={loginInput.passwordConfirmation}
                    onChange={(e) =>
                      changeLoginInput(e, "passwordConfirmation")
                    }
                    labelWidth={135}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          tabIndex="-1"
                          aria-label="toggle password visibility"
                          onClick={() =>
                            handleClickShowPassword("showPasswordConf")
                          }
                        >
                          {loginInput.showPasswordConf ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText
                    variant="outlined"
                    error={inputError.register}
                  >
                    {inputError.register ? "Passwords didn't match" : ""}
                  </FormHelperText>
                </FormControl>
              )}
            </Grid>
            <Grid item className={classes.loginBtn}>
              <Button
                variant="outlined"
                color="primary"
                disabled={disablePrimaryBtn()}
                onClick={() => handlePrimaryClick(user)}
              >
                {view === "login" ? "Login" : "Register"}
              </Button>
            </Grid>
            <Grid item className={classes.registerContainer}>
              <Typography variant="overline">
                {view === "login" ? "No account yet?" : "Have an account?"}
              </Typography>
              <Button onClick={() => handleSecondaryClick()}>
                {view === "register" ? "Login" : "Register"}
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </UserContext.Consumer>
  );

  return (
    <UserContext.Consumer>
      {(user) => (
        <div className={classes.loginContainer}>
          {user.loggedIn ? (
            <UserMenu user={user} changeView={props.changeView} />
          ) : (
            <Button onClick={() => handleOpenModal()}>
              {" "}
              Login / Register{" "}
            </Button>
          )}
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="login-modal"
            aria-describedby="a-login-modal"
          >
            {body}
          </Modal>
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default LoginModal;
