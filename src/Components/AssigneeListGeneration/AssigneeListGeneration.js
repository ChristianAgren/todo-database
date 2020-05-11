import React, { useEffect } from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListSubheader,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SadSmiley from "../../Assets/sadsmiley.svg";
import SettingsIcon from "@material-ui/icons/Settings";
import SubTaskItem from "../SubTaskItem/SubTaskItem";
import NewSubTask from "../NewSubTask/NewSubTask";
import EditAssignment from "../EditAssignment/EditAssignment";
import DateManager from "../DateManager/DateManager.js";

const useStyles = makeStyles((theme) => ({
  removeScrollbar: {
    width: "100%",
    overflowX: "hidden",
  },
  error: {
    width: "100%",
    margin: "3rem 0 3rem 0",
    display: "flex",
    flexDirection: "column",
  },
  root: {
    width: "calc(100% + 34px)",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    left: "50%",
    transform: "translateX(calc(-50% + 8px))",
    overflowY: "scroll",
    maxHeight: "calc(100vh - 18rem)",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  listTitle: {
    fontSize: "1.1rem",
    "& > button": {
      position: "absolute",
      right: "1rem",
      color: "rgba(0, 0, 0, 0.26)",
    },
  },
  editAssignment: {
    margin: theme.spacing(1, 6),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  ul: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "inherit",
    padding: 0,
  },
  subInfo: {
    position: "relative",
    margin: theme.spacing(1, 5),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  subTasks: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

function AssigneeListGeneration(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [shouldEdit, setShouldEdit] = React.useState(false);
  const [editSection, setEditSection] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    const editThis = getAssignment();
    if (editThis) {
      setEditSection(editThis);
    } else {
      setEditSection(null);
    }
    setShouldEdit(!shouldEdit);
  };

  const handleClose = (event) => {
    if (event.currentTarget.id === "delete") {
      // props.removeAssignment(anchorEl.id)
    } else if (event.currentTarget.id === "edit") {
      handleEdit();
    }
    setAnchorEl(null);
  };

  const getAssignment = () => {
    if (anchorEl != null) {
      return props.assignments.find((i) => i.id === anchorEl.id);
    } else {
      return undefined;
    }
  };

  const manageDate = (date) => {
    const currentDate = DateManager();
    if (date === currentDate) {
      return "Today";
    } else {
      return date;
    }
  };

  useEffect(() => {
    manageDate();
  });

  const returnName = (assignment) => {
    const assignee = props.users.find(
      (user) => user._id === assignment.parentId
    );

    return assignee.name;
  };

  return (
    <div className={classes.removeScrollbar}>
      <List className={classes.root} subheader={<li />}>
        {props.assignments === null ? (
          <h3>Loading</h3>
        ) : props.assignments === undefined ? (
          <h3>Something went wrong, try reloading the page</h3>
        ) : props.assignments.error ? (
          <div className={classes.error}>
            <h3>{props.assignments.error.message}</h3>
            <img src={SadSmiley}></img>
          </div>
        ) : props.assignments.length === 0 ? (
          <div style={{ margin: "4rem" }}>
            <h4>Seems like there's nothing here...</h4>
            <h2>Good job!</h2>
          </div>
        ) : (
          props.assignments.map((assignment) => (
            <li
              key={`assignment-${assignment._id}`}
              className={classes.listSection}
            >
              <ul className={classes.ul}>
                <ListSubheader color="primary" className={classes.listTitle}>
                  <span>{`${assignment.title}`}</span>
                  <IconButton
                    id={assignment._id}
                    aria-controls="menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenu(event)}
                    color="inherit"
                  >
                    <SettingsIcon edge="end" />
                  </IconButton>
                  <Menu
                    id={`Menu-${assignment._id}`}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem id="edit" onClick={(event) => handleClose(event)}>
                      Edit
                    </MenuItem>
                    {shouldEdit ? (
                      <EditAssignment
                        handleEditClose={handleEdit}
                        // handleEditSave={props.editAssignment}
                        open={shouldEdit}
                        assignment={editSection}
                      />
                    ) : null}
                    <MenuItem
                      id="delete"
                      onClick={(event) => handleClose(event)}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </ListSubheader>
                <Box className={classes.subInfo}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="overline">{`Assignee: ${returnName(
                      assignment
                    )}`}</Typography>
                    <Typography variant="overline">{`ID: ${assignment._id}`}</Typography>
                  </div>
                  {/* {(assignment.subtasks && assignment.subtasks.length > 0) ?
                                                    <>
                                                        <Typography className={classes.subTasks} variant="overline">{`Subtasks: ${assignment.subtasks.length}`}</Typography>
                                                    </>
                                                    : (assignment.subtasks) ?
                                                        <Typography className={classes.subTasks} variant="overline">All out of subtasks!</Typography>
                                                        : <Typography className={classes.subTasks} variant="overline">Add some subtasks...</Typography>
                                                } */}
                  <Typography variant="overline">{`Added: ${manageDate(
                    assignment.date
                  )}`}</Typography>
                </Box>

                {props.subtasks.map((item, index) =>
                  item.parentId === assignment._id ? (
                    <SubTaskItem
                      key={`${item._Id}-${index}`}
                      assignment={assignment._id}
                      item={item}
                      id={item._Id}
                      // subTasksDel={props.subTasksDel}
                      // subTasksEdit={props.subTasksEdit}
                    />
                  ) : null
                )}

                <NewSubTask
                  sectionId={assignment._id}
                  // subTasksSave={props.subTasksSave}
                />

                <Divider light style={{ margin: ".2rem" }} component="li" />
              </ul>
            </li>
          ))
        )}
      </List>
    </div>
  );
}

export default AssigneeListGeneration;
