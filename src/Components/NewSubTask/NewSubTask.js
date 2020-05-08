// @ts-nocheck
import React from 'react';
import {
    List,
    ListItem,
    TextField,
    makeStyles,
    Collapse,
    Button,
    Typography,
    FormControl,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { UserContext } from "../../Contexts/UserContext";

const useStyles = makeStyles((theme) => ({
    inputWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    nested: {
        width: '80%',
    },
    addAssignmentBtn: {
        margin: theme.spacing(0, 2, 3),
        display: 'flex',
        justifyContent: 'center',
        '& .MuiTypography-overline': {
            fontSize: '.9rem',
            marginLeft: '.4rem',
            color: 'rgba(0, 0, 0, 0.54)'
        },
        color: 'rgb(92,182,96)'
    },
}))

function NewSubTask(props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState({
        desc: ''
    })

    const handleInputChange = (event) => {
        setInputValue({
            desc: event.target.value
        })
    }

    const handleSubTaskSave = () => {
        // props.subTasksSave(props.sectionId, inputValue)
        handleClick()
    }

    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <UserContext.Consumer>
            {user => (
                <>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List className={classes.inputWrapper} component="div">
                            <ListItem className={classes.nested}>
                                <FormControl fullWidth>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Add subtask" 
                                        value={inputValue.desc}
                                        onChange={(event) => handleInputChange(event)}
                                    />
                                </FormControl>
                            </ListItem>
                        </List>
                    </Collapse>
                    {(!open) ?
                        <Button onClick={handleClick} color="default" className={classes.addAssignmentBtn}>
                            <AddCircleIcon fontSize="small" />
                            <Typography variant="overline">Add subtask</Typography>
                        </Button>
                        :
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button 
                                onClick={handleClick} 
                                color="default" 
                                className={classes.addAssignmentBtn}
                            >
                                <CancelIcon fontSize="small" style={{ color: 'rgb(245,84,72)' }} />
                                <Typography variant="overline">Close</Typography>
                            </Button>
                            <Button 
                            onClick={() => user.subtaskToDb({ desc: inputValue.desc, status: 'new' })}
                                // onClick={handleSubTaskSave}
                                color="default" 
                                className={classes.addAssignmentBtn}
                                disabled={inputValue.desc < 3}
                            >
                                <SaveIcon fontSize="small" />
                                <Typography variant="overline">Save</Typography>
                            </Button>
                        </div>
                    }
                </>
            )}
        </UserContext.Consumer>
    )
}

export default NewSubTask;