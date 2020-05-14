import React, { useState } from "react";

// MATERIAL UI
import {
  TextField,
  FormControl,
  Button,
  Typography,
} from "@material-ui/core";

// ICONS
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";

// STYLES
import useStyles from "./AddSectionStyles";

// -- -- --

function AddSection(props) {
  const classes = useStyles();
  const [inputValues, setInputValues] = useState({
    name: props.name,
    desc: "",
  });

  const handleInputChange = (event, anchor) => {
    setInputValues({
      ...inputValues,
      [anchor]: event.target.value,
    });
  };

  const handleClearClick = () => {
    setInputValues({
      name: "",
      desc: "",
    });
  };

  return (
    <div className={classes.newAssignmentWrapper}>
      <FormControl className={classes.inputWrapper} fullWidth>
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
          onClick={() => props.addAssignment(
            { title: inputValues.desc }
          )}
        >
          <SaveIcon fontSize="small" />
          <Typography variant="overline">Save</Typography>
        </Button>
      </div>
    </div>
  )
}

export default AddSection;
