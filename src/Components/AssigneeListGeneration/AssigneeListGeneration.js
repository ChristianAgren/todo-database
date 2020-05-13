// @ts-nocheck
import React, { useEffect } from 'react';
import {
    Box,
    Divider,
    IconButton,
    List,
    ListSubheader,
    Menu,
    MenuItem,
    Typography,
    useScrollTrigger,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SadSmiley from '../../Assets/sadsmiley.svg'
import SettingsIcon from '@material-ui/icons/Settings';
import SubTaskItem from '../SubTaskItem/SubTaskItem';
import NewSubTask from '../NewSubTask/NewSubTask'
import EditAssignment from '../EditAssignment/EditAssignment'
import DateManager from '../DateManager/DateManager.js'
const apiURL = "http://localhost:3000/api/";

const useStyles = makeStyles((theme) => ({
    removeScrollbar: {
        width: '100%',
        overflowX: 'hidden'
    },
    error: {
        width: '100%',
        margin: '3rem 0 3rem 0',
        display: 'flex',
        flexDirection: 'column'
    },
    root: {
        width: 'calc(100% + 34px)',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        left: '50%',
        transform: 'translateX(calc(-50% + 8px))',
        overflowY: 'scroll',
        maxHeight: 'calc(100vh - 18rem)',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    listTitle: {
        fontSize: '1.1rem',
        '& > button': {
            position: 'absolute',
            right: '1rem',
            color: 'rgba(0, 0, 0, 0.26)'
        }
    },
    userName: {
        fontSize: '0.9rem',
        position: 'absolute',
        left: '1rem',
        [theme.breakpoints.down(510)]: {
            display: "none",
        },

    },
    userNameMobile: {
        fontSize: '0.9rem',
        position: 'absolute',
        left: '1rem',
        [theme.breakpoints.up(510)]: {
            display: "none",
        },
    },
    editAssignment: {
        margin: theme.spacing(1, 6),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    ul: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'inherit',
        padding: 0,
    },
    subInfo: {
        position: 'relative',
        margin: theme.spacing(1, 5),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    subTasks: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
    }
}));

function AssigneeListGeneration(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [shouldEdit, setShouldEdit] = React.useState(false)
    const [editSection, setEditSection] = React.useState(null)
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = () => {
        const editThis = getAssignment()
        
        if (editThis) {
            setEditSection(editThis)
        } else {
            setEditSection(null)
        }
        setShouldEdit(!shouldEdit)
    }


    const handleClose = (event) => {
        if (event.currentTarget.id === 'delete') {
            props.deleteAssignment(anchorEl.id, props.subtasks)
        } else if (event.currentTarget.id === 'edit') {
            handleEdit()
        }
        setAnchorEl(null);
    };

    const getAssignment = () => {
        if (anchorEl != null) {          
            return props.assignments.find(assignment => assignment._id === anchorEl.id)
        } else {
            return undefined
        }
    }

    const manageDate = (date) => {
        const currentDate = DateManager()
        if (date === currentDate) {
            return "Today"
        } else {
            return date
        }
    }

    useEffect(() => {
        manageDate()
    }, [])

    const findAssignee = (assignment) => {
        let userName;
        if(props.users !== null) {
            props.users.map(user => {
                if(assignment.parentId === user._id) {
                    userName = user.name
                    
                }
            })
        }  
        return userName            
    }

    return (
        <div className={classes.removeScrollbar}>
            <List className={classes.root} subheader={<li />}>
                {(props.assignments === null) ?
                    <h3>Loading</h3>
                    : (props.assignments === undefined) ?
                        <h3>Something went wrong, try reloading the page</h3>
                        : (props.assignments.error) ?
                            <div className={classes.error}>
                                <h3>{props.assignments.error.message}</h3>
                                <img src={SadSmiley}></img>
                            </div>
                            : (props.assignments.length === 0) ?
                                <div style={{ margin: '4rem' }}>
                                    <h4>Seems like there's nothing here...</h4>
                                    <h2>Good job!</h2>
                                </div>
                                : props.assignments.map(assignment => (
                                    <li key={`assignment-${assignment._id}`} className={classes.listSection}>
                                        <ul className={classes.ul}>
                                            <ListSubheader color="primary" className={classes.listTitle}>
                                                <span className={classes.userName}>{`Assignee: ${findAssignee(assignment)}`}</span>
                                                <span className={classes.userNameMobile}>{`${findAssignee(assignment)}`}</span>
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
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={open}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem id="edit" onClick={(event) => handleClose(event)}>Edit</MenuItem>
                                                    {
                                                        (shouldEdit) ?
                                                            <EditAssignment
                                                                handleEditClose={handleEdit}
                                                                editAssignment={props.editAssignment} 
                                                                open={shouldEdit}
                                                                editSection={editSection}
                                                                />
                                                            : null
                                                    }
                                                    <MenuItem id="delete" onClick={(event) => handleClose(event)}>Delete</MenuItem>
                                                </Menu>
                                            </ListSubheader>
                                            <Box className={classes.subInfo}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                    <Typography variant="overline">{`ID: ${assignment._id}`}</Typography>
                                                </div>
                                                <Typography variant="overline">{`Added: ${manageDate(assignment.assignmentDate.substring(0, 10))}`}</Typography>
                                            </Box>
                                            {(props.subtasks !== null) ?
                                                props.subtasks.map(subtask => (
                                                    subtask.parentId === assignment._id ?
                                                        <SubTaskItem
                                                            key={subtask._id}
                                                            assignment={assignment._id}
                                                            assignmentParentId={assignment.parentId}
                                                            // item={subtask}
                                                            id={subtask._Id}
                                                            subtask={subtask}
                                                            deleteSubtasks={props.deleteSubtasks}
                                                            editSubtask={props.editSubtask}
                                                        // subTasksDel={props.subTasksDel}
                                                        // subTasksEdit={props.subTasksEdit}
                                                        />
                                                        : null
                                                )) : null
                                            }
                                            <NewSubTask
                                                sectionId={assignment._id}
                                                assignment={assignment}
                                                subtaskToDb={props.subtaskToDb}
                                            // subTasksSave={props.subTasksSave}
                                            />
                                            <Divider
                                                light
                                                style={{ margin: '.2rem' }}
                                                component="li"
                                            />
                                        </ul>
                                    </li>
                                ))
                }
            </List>
        </div>
    );
}

export default AssigneeListGeneration