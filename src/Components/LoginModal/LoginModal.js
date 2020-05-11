// @ts-nocheck
import React from "react";
import {
    Modal,
    Button,
    makeStyles,
    Typography,
    Grid,
    TextField,
} from "@material-ui/core/";
import { UserContext } from "../../Contexts/UserContext";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",

        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
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

    const body = (
        <UserContext.Consumer>
            {user => (
                <div className={classes.paper}>
                    <Grid container>
                        {view === "login" ? (
                            <>
                                <Grid item>
                                    <Typography variant="h4">Login</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="outlined-basic"
                                        label="Username"
                                        variant="outlined"
                                        value={loginInput.username}
                                        onChange={(e) => changeLoginInput(e, "username")}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Password"
                                        variant="outlined"
                                        value={loginInput.password}
                                        onChange={(e) => changeLoginInput(e, "password")}
                                    />
                                </Grid>
                            </>
                        ) : (
                                <>
                                    <Grid item>
                                        <Typography variant="h4">register</Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="outlined-basic"
                                            label="Username"
                                            variant="outlined"
                                            value={loginInput.username}
                                            onChange={(e) => changeLoginInput(e, "username")}
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="Password"
                                            variant="outlined"
                                            value={loginInput.password}
                                            onChange={(e) => changeLoginInput(e, "password")}
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="confirm Password"
                                            variant="outlined"
                                            value={loginInput.passwordConfirmation}
                                            onChange={(e) => changeLoginInput(e, "passwordConfirmation")}
                                        />
                                    </Grid>
                                </>
                            )}

                        <Grid item>
                            <Button
                                onClick={() => {
                                    if (view === "register") {
                                        setView("login");
                                    } else {
                                        console.log("logging in");
                                    }
                                }}>
                                Login
					</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                disabled={(loginInput.username.length < 3 || loginInput.password.length < 3 || loginInput.passwordConfirmation.length < 3) && view === "register"}
                                onClick={() => {
                                    if (view === "login") {
                                        setView("register");
                                    } else if (
                                        loginInput.password === loginInput.passwordConfirmation
                                    ) {

                                        user.registerUser({ name: loginInput.username, password: loginInput.password })

                                        setLoginInput({
                                            username: "",
                                            password: "",
                                            passwordConfirmation: ""
                                        })

                                        user.loginUser({
                                            name: loginInput.username,
                                            admin: false
                                        })

                                        handleClose()
                                    } else {

                                        console.log('no match',
                                            loginInput);

                                    }
                                }}>
                                register
					</Button>
                        </Grid>
                    </Grid>
                </div>

            )}

        </UserContext.Consumer>

    );

    return (
        <UserContext.Consumer>
            {user => (
                <div>
                    <Button onClick={handleOpen}>{user.loggedIn ? "logout" : "login"}</Button>
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
