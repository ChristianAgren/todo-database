// @ts-nocheck
import React, { createContext, Component } from "react";

export const UserContext = createContext();

const apiURL = "http://localhost:3000/api/";

class UserContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            admin: false,
            name: "",
            registerUser: this.registerUser,
            loginUser: this.loginUser,

            assignmentToDb: this.assignmentToDb
        }

    }

    async registerUser(data) {
        console.log("register", data);

        // POST
        fetch(apiURL + "users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                role: "user"
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
    }

    loginUser = (data) => {
        this.setState({
            loggedIn: true,
            admin: data.admin,
            name: data.name
        }, () => console.log(this.state)
        )


    }

    async assignmentToDb(data) {
        console.log(data);
        
        fetch(apiURL + "assignments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
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
