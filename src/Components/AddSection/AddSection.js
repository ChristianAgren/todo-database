// @ts-nocheck
import React, { useState } from 'react'
import {
    makeStyles,
    TextField,
    FormControl,
    Button,
    Typography
} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    newAssignmentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    inputWrapper: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2, 1)
        }
    },
    newAssignmentBtnWrapper: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    assignmentBtn: {
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

function AddSection(props) {
    const classes = useStyles()
    const [inputValues, setInputValues] = useState({
        name: '',
        desc: ''
    })

    const handleInputChange = (event, anchor) => {
        setInputValues({
            ...inputValues,
            [anchor]: event.target.value
        })
    }

    const handleClearClick = () => {
        setInputValues({
            name: '',
            desc: ''
        })
    }
    
    return (
        <div className={classes.newAssignmentWrapper}>
            <FormControl className={classes.inputWrapper} fullWidth>
                <TextField
                    required
                    id="outlined-assignee"
                    label="Assignee"
                    value={inputValues.name}
                    variant="outlined"
                    helperText="Who will perform the assignment?"
                    onChange={(event) => handleInputChange(event, 'name')}
                />
                <TextField
                    required
                    id="outlined-assignmentDesc"
                    label="Assignment description"
                    value={inputValues.desc}
                    variant="outlined"
                    helperText="Keep it short and sweet"
                    onChange={(event) => handleInputChange(event, 'desc')}
                />
            </FormControl>
            <div className={classes.newAssignmentBtnWrapper}>
                <Button
                    color="default"
                    className={classes.assignmentBtn}
                    onClick={handleClearClick}
                >
                    <CancelIcon fontSize="small" style={{ color: 'rgb(245,84,72)' }} />
                    <Typography variant="overline">Clear</Typography>
                </Button>
                <Button
                    color="default"
                    className={classes.assignmentBtn}
                    disabled={!(inputValues.desc.length >= 3) ? true : false}
                    onClick={() => props.handleSaveClick(inputValues)}
                >
                    <SaveIcon fontSize="small" />
                    <Typography variant="overline">Save</Typography>
                </Button>
            </div>
        </div>
    )
}

export default AddSection