// @ts-nocheck
import React, { createContext, Component } from "react";

export const UserContext = createContext();

const apiURL = "http://localhost:3000/api/";
const loginURL = "http://localhost:3000/login";
const logoutURL = "http://localhost:3000/logout";

class UserContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            admin: false,
            name: "",
            clientRegisterUser: this.clientRegisterUser,
            // registerUser: this.registerUser,
            loginUser: this.loginUser,
            logoutUser: this.logoutUser,
        }

    }

    clientRegisterUser = async (user) => {
        const newUser = await this.registerUser(user)
        this.loginUser(newUser)
    }

    async registerUser(user) {
        console.log("register", user);

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
                console.log(`Logged in: ${response.headers.get('userLoggedIn')}`);
                return response.json()
            })
            .then((data) => { return data })
        return { ...newUser, password: user.password }
    }


    loginUser = async (user, closeModal) => {
        //Create a session
        await fetch(loginURL, {
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
                console.log(`Logged in: ${response.headers.get('userLoggedIn')}`);
                return response.json()
            })
            .then((data) => {
                console.log(data);

                if (data.err) {
                    console.log(data.err);
                } else {
                    this.setState({
                        loggedIn: true,
                        admin: data.admin,
                        name: data.name
                    }, () => {
                        if (closeModal) {
                            closeModal()
                        }
                    })
                }
            })
    }

    logoutUser = async () => {

        // destroy session
        await fetch(logoutURL, {
            method: "DELETE",
        })
            .then((response) => {
                console.log(`Logged in: ${response.headers.get('userLoggedIn')}`);
                return response.json()
            })
            .then((data) => {
                this.setState({
                    loggedIn: false,
                    admin: false,
                    name: ""
                }, () => console.log(data)
                )
            })
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
