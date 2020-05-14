import React from "react";

// COMPONENTS
import EditUserModal from "../../UserManager/EditUserModal/EditUserModal";

// MATERIAL UI
import { Button, Menu, MenuItem } from "@material-ui/core";

// ICONS
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

// STYLES
import useStyles from "./UserMenuStyles";

// -- -- --

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
      return "Admin";
    } else {
      return "User";
    }
  };

  const handleSettingsClick = (props) => {
    handleCloseMenu()
    if (props.user.admin) {
      props.changeView('manage users')
    }
  }


  const handleLogoutClick = (props) => {
    handleCloseMenu();
    props.changeView("main");
    props.user.logoutUser();
  };

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
        <p style={{ textAlign: "center" }}>{`Role: ${returnUserRole(props.user.admin)}`}</p>
        {props.user.admin ? (
          <MenuItem onClick={() => handleSettingsClick(props)}>
            Manage users
          </MenuItem>
        ) : (
            <EditUserModal
              name={props.user.name}
              closeUserMenu={handleCloseMenu}
              userContext={props.user}
            />
          )}
        <MenuItem onClick={() => handleLogoutClick(props)}> Logout </MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;
