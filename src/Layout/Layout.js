import React from "react";

// COMPONENTS
import Topbar from "../Components/TopBar/Topbar";
import UserManager from "../Components/UserManager/UserManager";
import Main from "../Components/Main/Main";

// CONTEXTS
import { UserContext } from "../Contexts/UserContext";

// STYLES
import useStyles from "./LayoutStyles";

// -- -- --

function Layout() {
  const classes = useStyles();
  const [view, setView] = React.useState("main");
  const [users, setUsers] = React.useState(null);
  const handleChangeView = (view) => {
    setView(view);
  };

    return (
        <UserContext.Consumer>
            {user => (
                <div className={classes.mainContainer}>
                    <Topbar changeView={handleChangeView} setUsers={setUsers} />
                    {view === 'main' ?
                        <Main user={user} usersList={users} setUsers={setUsers} /> : <UserManager user={user} redirectToMain={setView} />
                    }
                </div>
            )}
        </UserContext.Consumer>
    )
}

export default Layout;
