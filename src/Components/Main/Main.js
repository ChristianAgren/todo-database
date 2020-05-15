import React, { useEffect } from "react";
import { Container, Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssigneeListGeneration from "../AssigneeListGeneration/AssigneeListGeneration";
import FilterSection from "../FilterSection/FilterSection";
import AddSection from "../AddSection/AddSection";
import { UserContext } from "../../Contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: "100vh",
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
  title: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
function Main(props) {
  const classes = useStyles();
  const [assignments, setAssignments] = React.useState(null);
  const [subtasks, setSubtasks] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const apiURL = "http://localhost:3000/api/";

  const addAssignmentsInState = (newAssignment) => {
    const state = [...assignments];
    state.push(newAssignment)
    setAssignments(state);
  };
  const editAssignmentInState = (changedAssignment) => {
    const state = [...assignments];
    const assignmentIndex = state.findIndex((a) => a._id === changedAssignment._id);
    state.splice(assignmentIndex, 1, changedAssignment);
    setAssignments(state)
  }
  const deleteAssignmentsInState = (deletedAssignment) => {
    const assignmentsState = [...assignments]
    const subtasksState = [...subtasks];
    const assignmentIndex = assignmentsState.findIndex((a) => a._id === deletedAssignment._id);

    for (let i = subtasksState.length - 1; i > 0; i--) {
      if (subtasksState[i].parentId === deletedAssignment._id) {
        subtasksState.splice(i, 1)
      }
    }

    assignmentsState.splice(assignmentIndex, 1)
    setSubtasks(subtasksState)
    setAssignments(assignmentsState)

  }



  const addSubtasksInState = (newSubtask) => {
    const state = [...subtasks];
    state.push(newSubtask)
    setSubtasks(state);
  };
  const editSubtasksInState = (changedSubtask) => {
    const state = [...subtasks];
    const subtasksIndex = state.findIndex((s) => s._id === changedSubtask._id);
    state.splice(subtasksIndex, 1, changedSubtask);
    setSubtasks(state)
  }
  const deleteSubtasksInState = (deletedSubtask) => {
    const state = [...subtasks];
    const subtasksIndex = state.findIndex((a) => a._id === deletedSubtask._id);
    state.splice(subtasksIndex, 1);
    setSubtasks(state)
  }





  const addAssignment = async (data) => {
    const newAssignment = await props.user.postAssignment(apiURL, data)
    if (newAssignment.err) {
      handleErrors(newAssignment.err)
    } else {
      addAssignmentsInState(newAssignment);
    }
  }

  const changeAssignment = async (assignment, data) => {
    const changedAssignment = await props.user.editAssignment(apiURL, assignment, data)
    if (changeAssignment.err) {
      handleErrors(changeAssignment.err)
    } else {
      editAssignmentInState(changedAssignment);
    }
  }

  const setupAssignments = async () => {
    const assignments = await props.user.getAssignments(apiURL)
    setAssignments(assignments)
  }

  const setupSubtasks = async () => {
    const subtasks = await props.user.getSubtasks(apiURL)
    setSubtasks(subtasks)
  }




  async function subtaskToDb(subtask) {
    const newSubtask = await props.user.postSubtask(apiURL, subtask)
    if (newSubtask.err) {
      handleErrors(newSubtask.err)
    } else {
      addSubtasksInState(newSubtask)
    }
  }

  async function removeAssignment(assignment) {
    const deletedAssignment = await props.user.deleteAssignment(apiURL, assignment)
    if (deletedAssignment.err) {
      handleErrors(deletedAssignment.err)
    } else {
      deleteAssignmentsInState(deletedAssignment)
    }
  }

  async function deleteSubtasks(subtask, authorId) {
    const deleteSubtask = await props.user.deleteSubtask(apiURL, subtask, authorId)
    if (deleteSubtask.err) {
      handleErrors(deleteSubtask.err)
    } else {
      deleteSubtasksInState(deleteSubtask)
    }
  }

  async function editSubtask(subtask, authorId) {
    const editSubtask = await props.user.editSubtask(apiURL, subtask, authorId)
    if (editSubtask.err) {
      handleErrors(editSubtask.err)
    } else {
      editSubtasksInState(editSubtask)
    }
  }

  

  // search  
  const handleSearch = (condition) => {
    console.log(condition);
    
  }



  //State for alert
  const [openAlert, setopenAlert] = React.useState({
    open: false,
    message: ""
  });
  const handleAlertClick = (reason) => {
    setopenAlert({
      open: true,
      message: reason
    });
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenAlert({
      open: false,
      message: ""
    });
  };
  const handleErrors = (error) => {
    if (error.login) {
      handleAlertClick(error.login)
      props.user.logoutUser()
    } else if (error.invalid) {
      handleAlertClick(error.invalid)
    }
  }


  useEffect(() => {
    setupAssignments()
    setupSubtasks()
    props.user.getUsers(setUsers);
  }, []);


  return (
    <UserContext.Consumer>
      {(user) => (
        <div className={classes.mainContainer}>
          <Container maxWidth="lg">
            <Typography className={classes.title} variant="h4"></Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  New assignment
                    <AddSection
                    name={user.name}
                    addAssignment={addAssignment}
                  // handleSaveClick={handleSaveClick}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <FilterSection
                      search={handleSearch}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Paper
                      style={{ marginBottom: "2rem" }}
                      className={classes.paper}
                    >
                      {assignments != null
                        ? `Assignments${
                        assignments.length !== undefined
                          ? `: ${assignments.length}`
                          : ``
                        }`
                        : null}
                      <AssigneeListGeneration
                        assignments={assignments}
                        changeAssignment={changeAssignment}
                        removeAssignment={removeAssignment}
                        users={users}
                        subtasks={subtasks}
                        subtaskToDb={subtaskToDb}
                        editSubtask={editSubtask}
                        deleteSubtasks={deleteSubtasks}
                        handleAlertClose={handleAlertClose}
                        handleAlertClick={handleAlertClick}
                        openAlert={openAlert}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </UserContext.Consumer>
  );
}
export default Main;
