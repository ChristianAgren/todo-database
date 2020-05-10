
import React from 'react'
import { Container, Typography, Paper, Grid, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';

import { UserContext } from '../../Contexts/UserContext';

// temp database
import Users from "../../database/Users.json"
// - - - - - - 

const useStyles = makeStyles((theme) => ({

    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    mainContainer: {

        height: "100%",

        '& .MuiList-padding': {
            padding: 0
        }
    },
    userList: {

        width: "100%",
        background: "#0004"
    },
    user: {
        position: "relative",

        '& > *:not(.MuiListItemIcon-root)': {
            width: "calc(100% / 4)",
            padding: theme.spacing(1)
        },
        '&:nth-child(2n)': {
            background: "#fff8"
        },
        '&:nth-child(2n -1)': {
            background: "#fff5"
        },
        '& :nth-child(2n)': {
            // background: "#fff5"
        },
        '&:first-child': {
            background: "#3f51b5",
            color: "#e7e7e7",
            textDecoration: "underline"
        }
    },
    editBtn: {
        position: 'absolute',
        right: 0,
    },
}));

function UserManager() {
    const classes = useStyles()
    const [assignments, setAssignments] = React.useState(null)
    const apiURL = 'http://localhost:3000/api/assignments/'

    return (
        // <UserContext.Consumer>
        //     {user => (

        <Container maxWidth="md" className={classes.mainContainer}>
            <Paper className={classes.paper}>

                <List dense className={classes.userList}>
                    <ListItem className={classes.user}>
                        <ListItemText
                            primary='name'
                        />
                        <ListItemText
                            primary='role'
                        />
                        <ListItemText
                            primary='password'
                        />
                        <ListItemText
                            primary='ID'
                        />
                    </ListItem>
                    {Users.users.map(user =>
                        <ListItem className={classes.user} key={user._id}>
                            <ListItemText
                                primary={user.name}
                            />
                            <ListItemText
                                primary={user.admin ? 'admin' : 'user'}
                            />
                            <ListItemText
                                primary={user.password}
                            />
                            <ListItemText
                                primary={user._id}
                            />

                            <ListItemIcon className={classes.editBtn}>
                                <IconButton onClick={() => console.log('tja')
                                }>
                                    <SettingsIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>,
                    )}
                </List>
            </Paper>
        </Container>

        //     )}
        // </UserContext.Consumer>


    )
}

export default UserManager