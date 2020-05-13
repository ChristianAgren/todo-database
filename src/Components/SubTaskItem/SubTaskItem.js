import React, { useEffect } from "react";

// MATERIAL UI
import {
  Typography,
  FormControl,
  TextField,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

// ICONS
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

// STYLES
import useStyles from "./SubTaskItemStyles";

// -- -- --

function SubTaskItem(props) {
  const classes = useStyles();
  const [shouldEdit, setShouldEdit] = React.useState(false);
  const [inputValues, setInputValues] = React.useState({
    desc: props.subtask.desc,
    status: props.subtask.status,
  });

  const handleInputChange = (event, anchor) => {
    setInputValues({
      ...inputValues,
      [anchor]: event.target.value,
    });
  };

  const handleProgressClick = (anchor) => {
    let newStatus;
    if (inputValues.status === "new") {
      newStatus = "ongoing";
    } else {
      newStatus = "done";
    }
    handleUpdateSubTaskValues(newStatus);
    setInputValues({
      ...inputValues,
      [anchor]: newStatus,
    });
  };

  useEffect(() => {});

  const handleUpdateSubTaskValues = (newStatus) => {
    if (newStatus) {
      props.editSubtask(props.subtask, {
        desc: inputValues.desc,
        status: newStatus,
        assignmentparentId: props.assignmentParentId,
      });
      // props.subTasksEdit(props.section, props.item.subId, { desc: inputValues.desc, status: newStatus })
    } else {
      props.editSubtask(props.subtask, {
        desc: inputValues.desc,
        status: inputValues.status,
        assignmentparentId: props.assignmentParentId,
      });
      // props.subTasksEdit(props.section, props.item.subId, inputValues)
    }
    // console.log(inputValues);
  };

  const handleEditClick = () => {
    if (shouldEdit) {
      handleUpdateSubTaskValues();
    }
    setShouldEdit(!shouldEdit);
  };

  const handleDeleteClick = () => {
    props.deleteSubtasks(props.subtask, {
      assignmentParentId: props.assignmentParentId,
    });
    // props.subTasksDel(props.section, props.item.subId)
  };

  return (
    <ListItem button>
      {shouldEdit ? (
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Edit subtask"
            onChange={(event) => handleInputChange(event, "desc")}
            value={inputValues.desc}
          />
        </FormControl>
      ) : (
        <ListItemText
          primary={
            <Typography component="h4" className={classes.inline}>
              {props.subtask.desc}
            </Typography>
          }
          secondary={
            <Typography
              component="span"
              variant="overline"
              className={classes.inline}
            >
              {inputValues.status}
            </Typography>
          }
        />
      )}
      <ListItemSecondaryAction className={classes.listItemSecondary}>
        {shouldEdit ? (
          <IconButton
            onClick={handleEditClick}
            edge="end"
            aria-label="edit"
            disabled={inputValues.desc.length < 3}
          >
            <DoneIcon />
          </IconButton>
        ) : (
          <>
            <IconButton
              onClick={() => handleProgressClick("status")}
              edge="end"
              aria-label="complete"
            >
              <DoneIcon />
            </IconButton>
            <IconButton onClick={handleEditClick} edge="end" aria-label="edit">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleDeleteClick}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default SubTaskItem;
