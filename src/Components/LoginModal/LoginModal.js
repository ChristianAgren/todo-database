// @ts-nocheck
import React from "react";
import {
    Button,
    FormControl,
    Grid,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Modal,
    TextField,
    Typography,
} from "@material-ui/core/";
import { UserContext } from "../../Contexts/UserContext";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    loginContainer: {
        '& .MuiButton-label': {
            color: 'white'
        }
    },
    userMenu: {
        '& .MuiButton-label': {
            fontSize: '.9rem',
            '& .MuiSvgIcon-root': {
                margin: theme.spacing(0, 0, 0, 1)
            }
        }
    },
    paper: {
        position: "absolute",
        top: "53%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",

        width: '40%',
        minWidth: '20rem',
        height: 'auto',

        backgroundColor: theme.palette.background.paper,
        borderRadius: '.4rem',
        borderBottom: '.4rem solid rgb(17,82,147)',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        [theme.breakpoints.down(321)]: {
            width: '100%',
            borderRadius: 0,
        },
    },
    loginModal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'rgb(17,82,147)',
        '& .MuiGrid-item': {
            '& > .MuiSvgIcon-root': {
                position: 'absolute',
                top: '-2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '5rem',
                backgroundColor: theme.palette.background.paper,
                borderRadius: '.4rem'
            },
        },
        '& .MuiTypography-h4': {
            padding: theme.spacing(5, 0, 3, 0)
        },
        '& .MuiFormControl-root': {
            margin: theme.spacing(1, 0),
            [theme.breakpoints.down(400)]: {
                margin: theme.spacing(.2, 0),
            },
        }
    },
    loginBtn: {
        margin: theme.spacing(3, 0),
        width: '50%',
        '& .MuiButton-outlinedPrimary': {
            width: '100%'
        }
    },
    registerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiTypography-overline': {
            fontSize: '0.84rem',
            margin: theme.spacing(0, 1)
        }
    }
}));

function LoginModal() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [view, setView] = React.useState("login");
    const [loginInput, setLoginInput] = React.useState({
        username: "",
        password: "",
        passwordConfirmation: "",
        showPassword: false
    });

    const [inputError, setInputError] = React.useState({
        login: false,
        register: false,
        user: false
    })

    const [anchorEl, setAnchorEl] = React.useState(null);

    const changeLoginInput = (event, anchor) => {
        if (anchor === 'username') {
            setInputError({
                ...inputError,
                user: false
            })
        }
        setLoginInput({
            ...loginInput,
            [anchor]: event.target.value,
        });
    };

    const handleClickShowPassword = () => {
        setLoginInput({
            ...loginInput,
            showPassword: !loginInput.showPassword
        })
    }

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);

        setView("login");
        clearPasswordField()
        clearInputErrors()
    };

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSetError = (anchor) => {

        if (anchor === "user") {
            setInputError({
                ...inputError,
                register: false,
                [anchor]: true,
            })
        } else {
            setInputError({
                ...inputError,
                [anchor]: true,
            })
        }

    }

    const clearInputErrors = () => {

        setInputError({
            login: false,
            register: false,
            user: false
        })
    }

    const clearPasswordField = () => {
        setLoginInput({
            ...loginInput,
            password: "",
            passwordConfirmation: "",
            showPassword: false
        })
    }

    const handleUserHelperText = () => {
        if (inputError.user && view === 'register') {
            return "Username is unavailable"
        } else if (inputError.login && view === 'login') {
            return "Username or password was incorrect"
        } else {
            return ""
        }
    }

    const handlePasswordHelperText = () => {
        if (inputError.login && view === 'login') {
            return "Username or password was incorrect"
        } else if (inputError.register && view === 'register') {
            return "Passwords didn't match"
        } else {
            return ""
        }
    }

    const handlePrimaryClick = (user) => {
        if (view === 'login') {
            user.loginUser({ name: loginInput.username, password: loginInput.password }, handleCloseModal, handleSetError)
        } else {
            if (loginInput.password === loginInput.passwordConfirmation) {
                clearInputErrors()
                user.clientRegisterUser({ name: loginInput.username, password: loginInput.password }, handleCloseModal, handleSetError)
                clearPasswordField()
            } else {
                handleSetError('register')
            }
        }
    }

    const disablePrimaryBtn = () => {
        if (view === 'login') {
            return (loginInput.username.length < 3 || loginInput.password.length < 3)
        } else {
            return (loginInput.username.length < 3 || loginInput.password.length < 3 || loginInput.passwordConfirmation.length < 3)
        }
    }

    const handleSecondaryClick = () => {
        if (view === 'login') {
            setView('register')
        } else {
            setView('login')
        }
        clearInputErrors()
    }

    const userMenu = (user) => {
        return (
            <div className={classes.userMenu}>
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClickMenu}
                >
                    {user.name}
                    <AccountCircleIcon />
                </Button>
                <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleCloseMenu}>My Tasks</MenuItem>
                    <MenuItem onClick={() => {
                        handleCloseMenu()
                        user.logoutUser()
                    }
                    }>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        )
    }

    const body = (
        <UserContext.Consumer>
            {user => (
                <div className={classes.paper}>
                    <Grid container className={classes.loginModal}>
                        <Grid item xs={12}>
                            {view === 'login'
                                ? <AccountBoxIcon />
                                : <AddBoxIcon />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                {view === 'login'
                                    ? 'Login'
                                    : 'Register'
                                }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-username"
                                    error={view === 'login' ? inputError.login : inputError.user}
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
                                >
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-password"
                                    type={loginInput.showPassword ? 'text' : 'password'}
                                    error={view === 'login' ? inputError.login : inputError.register}
                                    helperText={handlePasswordHelperText()}
                                    value={loginInput.password}
                                    onChange={(e) => changeLoginInput(e, "password")}
                                    labelWidth={70}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            >
                                                {loginInput.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {view === "register" &&
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-passwordConfirm"
                                        error={inputError.register}
                                        helperText={inputError.register ? "Passwords didn't match" : ""}
                                        label="Confirm password"
                                        variant="outlined"
                                        value={loginInput.passwordConfirmation}
                                        onChange={(e) => changeLoginInput(e, "passwordConfirmation")}
                                    />
                                </FormControl>
                            }
                        </Grid>
                        <Grid item
                            className={classes.loginBtn}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                disabled={disablePrimaryBtn()}
                                onClick={() => handlePrimaryClick(user)}>
                                {view === "login"
                                    ? 'Login'
                                    : 'Register'
                                }
                            </Button>
                        </Grid>
                        <Grid item
                            className={classes.registerContainer}
                        >
                            <Typography variant="overline">
                                {view === "login"
                                    ? 'No account yet?'
                                    : 'Have an account?'
                                }

                            </Typography>
                            <Button
                                onClick={() => handleSecondaryClick()}>
                                {view === "register"
                                    ? 'Login'
                                    : 'Register'
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </div >

            )
            }

        </UserContext.Consumer >

    );

    return (
        <UserContext.Consumer>
            {user => (
                <div className={classes.loginContainer}>
                    {user.loggedIn
                        ? userMenu(user)
                        : <Button onClick={() => handleOpenModal()}> Login / Register </Button>
                    }
                    <Modal
                        open={open}
                        onClose={handleCloseModal}
                        aria-labelledby="login-modal"
                        aria-describedby="a-login-modal">
                        {body}
                    </Modal>
                </div>
            )}
        </UserContext.Consumer>
    );
}

export default LoginModal;
