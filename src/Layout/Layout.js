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
  const handleChangeView = (view) => {
    setView(view);
  };

  return (
    <UserContext.Consumer>
      {(user) => (
        <div className={classes.mainContainer}>
          <Topbar changeView={handleChangeView} />
          {view === "main" ? <Main /> : <UserManager user={user} />}
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Layout;
