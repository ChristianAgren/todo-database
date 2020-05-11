
import React, { useEffect } from 'react'
import EditUserModal from "./EditUserModal/EditUserModal"

import { Container, Typography, Paper, Grid, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../Contexts/UserContext'


const useStyles = makeStyles((theme) => ({

    mainContainer: {

        height: "100%",

        '& .MuiList-padding': {
            padding: 0
        }
    },

    header: {
        padding: theme.spacing(1),
        color: "#3f51b5"
    },
    userList: {
        width: "100%",
        background: "#0004",

        borderRadius: theme.shape.borderRadius
    },
    user: {
        position: "relative",

        '& > *:not(.MuiListItemIcon-root)': {
            width: "calc(100% / 3)",
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
            textDecoration: "underline",
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
        }
    },
    editBtn: {
        position: 'absolute',
        right: 0,
    },
}));



function UserManager() {
    const classes = useStyles()
    const apiURL = 'http://localhost:3000/api/users/'
    const [users, setUsers] = React.useState([])


    async function getUsers() {
        fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                console.log(response)

                return response.json()
            }
            )
            .then(data => {
                console.log(data);

                setUsers(data)
            })
    }

    useEffect( () => getUsers(), [])

    return (
        // <UserContext.Consumer>
        //     {user => (

        <Container maxWidth="md" className={classes.mainContainer}>

            <Typography variant="h4" className={classes.header}>
                Manage users
            </Typography>

            <List dense className={classes.userList}>
                <ListItem className={classes.user}>
                    <ListItemText
                        primary='name'
                    />
                    <ListItemText
                        primary='role'
                    />
                    <ListItemText
                        primary='ID'
                    />
                </ListItem>
                {users.map(user =>
                    <ListItem className={classes.user} key={user._id}>
                        <ListItemText
                            primary={user.name}
                        />
                        <ListItemText
                            primary={user.admin ? 'admin' : 'user'}
                        />
                        <ListItemText
                            primary={user._id}
                        />

                        <ListItemIcon className={classes.editBtn}>
                            <EditUserModal />
                        </ListItemIcon>
                    </ListItem>,
                )}
            </List>
        </Container>

        //     )}
        // </UserContext.Consumer>


    )
}

export default UserManager