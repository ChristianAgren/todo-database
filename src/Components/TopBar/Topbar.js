// @ts-nocheck
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginModal from '../LoginModal/LoginModal';
import { UserContext } from '../../Contexts/UserContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Topbar(props) {
    const classes = useStyles();

    return (
        <UserContext.Consumer>
            {user => (
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => props.changeView('manage users')} >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {user.name}
                            </Typography>
                            <LoginModal />
                        </Toolbar>
                    </AppBar>
                </div>
            )}
        </UserContext.Consumer>
    );
}


export default Topbar;