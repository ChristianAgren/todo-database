// @ts-nocheck
import React from 'react'
import {
    Backdrop,
    Button,
    Fade,
    FormControl,
    Modal,
    TextField,
    Typography,
    makeStyles,
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        height: '90%',
        maxHeight: '40rem',
        width: '95%',
        maxWidth: '30rem',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    addAssignmentBtn: {
        margin: theme.spacing(2, 2, 3),
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

function EditAssignment(props) {
    const classes = useStyles()
    const [inputValues, setInputValues] = React.useState(props.assignment)

    const shouldSaveEdit = () => {
        console.log(props.assignment)
        props.editAssignment(props.assignment._id, inputValues)
        props.handleEditClose()
    }

    const handleInputChange = (event, anchor) => {
        setInputValues({
            ...inputValues,
            [anchor]: event.target.value
        })
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            // onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">{`Edit: ${props.assignment.title}`}</h2>
                    <p id="transition-modal-id">{`ID: ${props.assignment._id}`}</p>
                    {/* <p id="transition-modal-assignee">{`Assigned to: ${props.section.name}`}</p> */}
                    {/* {(props.section.subtasks && props.section.subtasks.length > 0) ?
                        <p id="transition-modal-subtasks">{`There are ${props.section.subtasks.length} subtasks`}</p>
                        : null
                    } */}
                    <FormControl fullWidth>
                        <TextField 
                            onChange={(event) => handleInputChange(event, 'title')}
                            style={{ margin: '1rem 0' }} 
                            value={inputValues.title} 
                            />
                        {/* <TextField 
                            onChange={(event) => handleInputChange(event, 'name')}
                            style={{ margin: '1rem 0' }} 
                            value={inputValues.name} 
                        /> */}
                    </FormControl>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button 
                            onClick={props.handleEditClose} 
                            color="default" 
                            className={classes.addAssignmentBtn}
                        >
                            <CancelIcon fontSize="small" style={{ color: 'rgb(245,84,72)' }} />
                            <Typography variant="overline">Close</Typography>
                        </Button>
                        <Button 
                            onClick={() => shouldSaveEdit()}
                            color="default" 
                            className={classes.addAssignmentBtn}
                            disabled={inputValues.title.length < 3}
                        >
                            <SaveIcon fontSize="small" />
                            <Typography variant="overline">Save</Typography>
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default EditAssignment