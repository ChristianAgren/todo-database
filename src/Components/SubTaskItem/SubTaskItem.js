// @ts-nocheck
import React, { useEffect } from 'react'
import {
    Typography,
    FormControl,
    TextField,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import useStyles from "./SubTaskItemStyles"

function SubTaskItem(props) {
    const classes = useStyles()
    const [shouldEdit, setShouldEdit] = React.useState(false)
    const [inputValues, setInputValues] = React.useState({
        desc: props.subtask.desc,
        status: props.subtask.status
    })

    const handleInputChange = (event, anchor) => {
        setInputValues({
            ...inputValues,
            [anchor]: event.target.value
        })
    }

    const progressStatusInState = (subtask) => {
        setInputValues({
            ...inputValues,
            status: subtask.status
        })
    }

    const handleProgressClick = () => {
        let newStatus;
        if (inputValues.status === 'new') {
            newStatus = 'ongoing'
            handleUpdateSubTaskValues(newStatus)
        } else if (inputValues.status === 'ongoing') {
            newStatus = 'done'
            handleUpdateSubTaskValues(newStatus)
        }
    }
    
    useEffect(() => {
    })

    const handleUpdateSubTaskValues = (newStatus) => {
        if(newStatus) {
            props.editSubtask(props.subtask, { desc: inputValues.desc, status: newStatus, assignmentParentId: props.assignmentParentId }, progressStatusInState)
        } else {
            props.editSubtask(props.subtask, {desc: inputValues.desc, status: inputValues.status, assignmentParentId: props.assignmentParentId})
        }
        
    }

    const handleEditClick = () => {
        
        if(shouldEdit) {
            handleUpdateSubTaskValues()
        }
        setShouldEdit(!shouldEdit)
        
    }

    const handleDeleteClick = () => {
        props.deleteSubtasks(props.subtask, {assignmentParentId: props.assignmentParentId})
    }

    return (
        <ListItem button>
            {(shouldEdit) ?
                <FormControl fullWidth>
                    <TextField 
                        id="outlined-basic" 
                        label="Edit subtask" 
                        onChange={(event) => handleInputChange(event, 'desc')}
                        value={inputValues.desc}
                    />
                </FormControl>
                :
                <ListItemText
                    primary={
                        <Typography
                            component="h4"
                            className={classes.inline}
                        >
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
                        </Typography>}
                />
            }
            <ListItemSecondaryAction className={classes.listItemSecondary}>
                {(shouldEdit) ?
                    <IconButton 
                        onClick={handleEditClick} 
                        edge="end" 
                        aria-label="edit"
                        disabled={inputValues.desc.length < 3}
                    >
                        <DoneIcon />
                    </IconButton>
                    :
                    <>
                        <IconButton onClick={() => handleProgressClick()} edge="end" aria-label="complete">
                            <DoneIcon />
                        </IconButton>
                        <IconButton onClick={handleEditClick} edge="end" aria-label="edit">
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={handleDeleteClick} edge="end" aria-label="delete">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default SubTaskItem