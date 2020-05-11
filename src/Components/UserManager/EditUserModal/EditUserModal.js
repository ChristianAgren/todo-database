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
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        top: "52%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",

        width: '100%',
        maxWidth: '40rem',
        height: 'auto',

        backgroundColor: theme.palette.background.paper,
        borderRadius: '.4rem',
        borderBottom: '.4rem solid rgb(17,82,147)',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4),
        [theme.breakpoints.down(321)]: {
            width: '100%',
            borderRadius: 0,
        },
    },

    header: {
        color: "#3f51b5"

    },

    editUserContainer: {
        position: "relative",
        width:"100%",

        '& > *': {
            display: "flex",
            flexDirection: "column",
            margin: theme.spacing(1),
        }
    },

    role: {
        padding: theme.spacing(1),

        border: "1px slid #0002",

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "baseline"
    },

    btnWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"center",

        margin: "1rem auto .5rem",
        width: '70%',

        '& > *': {
            margin: ".2rem"
        },

        '& .MuiButton-outlinedPrimary': {
            width: '50%'
        }
    }
}));

function EditUserModal() {
    const classes = useStyles();


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [userInfo, setUserInfo] = React.useState({
        id: "AGASD172378stxxFGA7221",
        name: "fredrik",
        newPassword: "",
        confirmNewPassword: "",
        admin: true
    });

    const prevSettings = {
        id: "AGASD172378stxxFGA7221",
        name: "fredrik",
        newPassword: "",
        confirmNewPassword: "",
        admin: true
    }


    const changeUserInfo = (event, anchor) => {

        setUserInfo({
            ...userInfo,
            [anchor]: event.target.value,
        });

    };

    const disableSaveBtn = () => {
        return (JSON.stringify(prevSettings) === JSON.stringify(userInfo)
            || userInfo.newPassword !== userInfo.confirmNewPassword
            || userInfo.id.length < 3
            || userInfo.name.length < 3)

    }

    const toggleAdmin = () => {
        setUserInfo({
            ...userInfo,
            admin: !userInfo.admin
        })
    }

    const body = (
        <div className={classes.paper}>
            <Grid container className={classes.editUserContainer} spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.header}>
                        Manage user
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant="overline">name</Typography>
                    <TextField value={userInfo.name} onChange={(e) => changeUserInfo(e, 'name')} />
                </Grid>
                <Grid item xs={12} >
                    <Typography variant="overline" >new password</Typography>
                    <TextField value={userInfo.newPassword} onChange={(e) => changeUserInfo(e, 'newPassword')} />
                </Grid>
                {userInfo.newPassword !== "" &&
                    <Grid item xs={12} >
                        <Typography variant="overline">confirm new password</Typography>
                        <TextField value={userInfo.confirmNewPassword} onChange={(e) => changeUserInfo(e, 'confirmNewPassword')} />
                    </Grid>}
                <Grid item xs={12} >
                    <Typography variant="overline">ID</Typography>
                    <TextField value={userInfo.id} onChange={(e) => changeUserInfo(e, 'id')} />
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
                    <Button
                        variant="outlined"
                        color="secondary">
                        delete
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={disableSaveBtn()}>
                        save
                    </Button>
                </Grid>
            </Grid>
        </div >
    );

    return (
        <UserContext.Consumer>
            {user => (
                <div>
                    <IconButton onClick={() => handleOpen()}>
                        <SettingsIcon />
                    </IconButton>
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

export default EditUserModal;

