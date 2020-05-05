// @ts-nocheck
import React, { createContext, Component } from "react";


export const UserContext = createContext();

class UserContextProvider extends Component {
    state = {
        status: 0,
        name: "Filip",
    }

    render() {
        return (
            <UserContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserContextProvider;