// @ts-nocheck
import React from "react";
import {
    Button,
    FormControl,
    Grid,
    makeStyles,
    Modal,
    TextField,
    Typography,
} from "@material-ui/core/";
import { UserContext } from "../../Contexts/UserContext";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        top: "52%",
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
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'rgb(17,82,147)',
        '& .MuiSvgIcon-root': {
            position: 'absolute',
            top: '-2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '5rem',
            backgroundColor: theme.palette.background.paper,

            borderRadius: '.4rem'
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
        // margin: theme.spacing(0, 0, 0, 0),
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
    });


    const changeLoginInput = (event, anchor) => {
        setLoginInput({
            ...loginInput,
            [anchor]: event.target.value,
        });
    };

    const handleLoginClick = (user) => {
        if (!user.loggedIn) {
            handleOpen()
        } else {
            user.logoutUser()
        }
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

        setView("login");
        setLoginInput({
            ...loginInput,
            password: "",
        });
    };

    const handlePrimaryClick = (user) => {
        if (view === 'login') {
            user.loginUser({ name: loginInput.username, password: loginInput.password }, handleClose)
        } else {
            if (loginInput.password === loginInput.passwordConfirmation) {
                user.clientRegisterUser({ name: loginInput.username, password: loginInput.password })
                setLoginInput({
                    username: "",
                    password: "",
                    passwordConfirmation: ""
                })
                handleClose()
            } else {
                console.log('no match', loginInput);
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
    }

    const body = (
        <UserContext.Consumer>
            {user => (
                <div className={classes.paper}>
                    <Grid container className={classes.loginContainer}>
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
                                    id="outlined-basic"
                                    label="Username"
                                    variant="outlined"
                                    value={loginInput.username}
                                    onChange={(e) => changeLoginInput(e, "username")}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    value={loginInput.password}
                                    onChange={(e) => changeLoginInput(e, "password")}
                                />
                            </FormControl>
                            {view === "register" &&
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-basic"
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
                <div>
                    <Button onClick={() => handleLoginClick(user)}>{user.loggedIn ? "logout" : "login"}</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description">
                        {body}
                    </Modal>
                </div>
            )}
        </UserContext.Consumer>
    );
}

export default LoginModal;
