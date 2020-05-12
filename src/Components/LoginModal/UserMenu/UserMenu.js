import React from "react";
import {
    Button,
    Menu,
    MenuItem,
    makeStyles,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    userMenu: {
        '& .MuiButton-label': {
            fontSize: '.9rem',
            '& .MuiSvgIcon-root': {
                margin: theme.spacing(0, 0, 0, 1)
            }
        }
    },
}))

function UserMenu(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const returnUserRole = (admin) => {
        if (admin) {
            return "Admin"
        } else {
            return "User"
        }
    }

    const handleSettingsClick = (props) => {
        handleCloseMenu()
        if (props.user.admin) {
            props.changeView('manage users')
        } else {
            console.log('Open user settings');
        }
    }

    const handleLogoutClick = (props) => {
        handleCloseMenu()
        props.changeView('main')
        props.user.logoutUser()
    }

    return (
        <div className={classes.userMenu}>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClickMenu}
            >
                {props.user.name}
                <AccountCircleIcon />
            </Button>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <p style={{textAlign: 'center'}}>{`Role: ${returnUserRole(props.user.admin)}`}</p>
                <MenuItem onClick={handleCloseMenu}>My Tasks</MenuItem>
                <MenuItem onClick={() => handleSettingsClick(props)}>{props.user.admin ? 'Manage users' : 'Settings'}</MenuItem>
                <MenuItem onClick={() => handleLogoutClick(props)}> Logout </MenuItem>
            </Menu>
        </div>
    )
}

export default UserMenu