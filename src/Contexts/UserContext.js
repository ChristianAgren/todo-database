// @ts-nocheck
import React, { createContext, Component } from "react";
import {getAssignments, postAssignment, editAssignment} from './fetchAssignments'
import { getSubtasks, postSubtask, deleteSubtask, editSubtask } from './fetchSubtasks'

export const UserContext = createContext();

const apiURL = "http://localhost:3000/api/";
const sessionURL = "http://localhost:3000/session/";

class UserContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            admin: false,
            name: "",
            getUsers: this.getUsers,
            setUserInState: this.setUserInState,
            clientRegisterUser: this.clientRegisterUser,
            loginUser: this.loginUser,
            logoutUser: this.logoutUser,
            getAssignments: getAssignments,
            postAssignment: postAssignment,
            editAssignment: editAssignment,
            getSubtasks: getSubtasks,
            postSubtask: postSubtask,
            deleteSubtask: deleteSubtask,
            editSubtask: editSubtask,
        }

    }

    

    getUsers = (setUsers) => {
        fetch(`${apiURL}users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }

    clientRegisterUser = async (user, closeModal, cbErr) => {
        const newUser = await this.registerUser(user)
        if (!newUser.message) {
            this.loginUser(newUser, closeModal)
        } else {
            cbErr('user')
        }
    }

    async registerUser(user) {
        // POST
        const newUser = await fetch(apiURL + "users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...user,
                admin: false
            }),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                return data
            })
        return { ...newUser, password: user.password }
    }


    loginUser = async (user, closeModal, cbErr) => {
        //Create a session
        await fetch(`${sessionURL}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: user.name,
                password: user.password
            }),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.err) {
                    cbErr('login')
                } else {
                    this.setUserInState(data)
                    closeModal()
                }
            })
    }

    setUserInState = (user) => {
        if (user && !user.err) {
            this.setState({
                loggedIn: true,
                admin: user.admin,
                name: user.name
            })
        } else {
            this.setState({
                loggedIn: false,
                admin: false,
                name: ""
            })
        }
    }

    logoutUser = async () => {
        // destroy session
        await fetch(`${sessionURL}logout`, {
            method: "DELETE",
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setUserInState()
            })
    }

    async componentDidMount() {
        let user = await fetch(sessionURL, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        this.setUserInState(user)
    }

    render() {
        return (
            <UserContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserContextProvider;
