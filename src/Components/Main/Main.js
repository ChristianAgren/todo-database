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

  useEffect(() => props.user.getAssignments(setAssignments), [props.user]);

  const updateAssignmentsInState = (newAssignment) => {
    const state = [...assignments];
    state.push(newAssignment)
    setAssignments(state);
  };

  const updateChangedAssignmentInState = (changedAssignment) => {
    const state = [...assignments];
    const assignmentIndex = state.findIndex((a) => a._id === changedAssignment._id);
    state.splice(assignmentIndex, 1, changedAssignment);
    setAssignments(state)
  }

  //State for alert
  const [openAlert, setopenAlert] = React.useState(false);

  const handleAlertClick = () => {
    setopenAlert(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setopenAlert(false);
  };

  // async function getAssignments() {
  //   fetch(apiURL + "assignments", {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAssignments(data);
  //     });
  // }


  const addAssignment = async (data) => {
    const newAssignment = await props.user.postAssignment(data)

    if (data.message === "Unauthorized") {
      handleAlertClick()
    } else {
      // getAssignments()
      updateAssignmentsInState(newAssignment);
    }
  }

  const changeAssignment = async (assignment, data) => {
    console.log("in changeAssignment", data);

    const changedAssignment = await props.user.editAssignment(assignment, data)
    console.log("changed assignment", changedAssignment)

    if (data.message === "Unauthorized") {
      handleAlertClick()
    } else {
      // getAssignments()
      updateChangedAssignmentInState(changedAssignment);
    }
  }



  const updateSubtasks = async () => {
    const newSubtaskList = await props.user.getAssignments()
    console.log(newSubtaskList);
  }

  useEffect(() => {
    // getAssignments();
    props.user.getAssignments(setAssignments)
    getSubtasks();
    props.user.getUsers(setUsers);
  }, []);

  // async function assignmentToDb(data) {
  //   fetch(apiURL + "assignments", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       if (data.message === "Unauthorized") {
  //         handleAlertClick()
  //       } else {
  //         // getAssignments()
  //         updateAssignments();
  //       }
  //   })
  // }



  async function subtaskToDb(subtask) {
    const newSubtask = await props.user.postSubtask(apiURL, subtask)
    if (newSubtask.message === "Unauthorized") {
      handleAlertClick()
    } else {
      updateSubtasks()
    }
  }
  async function deleteAssignment(data, subtasks) {
    subtasks.forEach((subtask) => {
      if (subtask.parentId === data)
        fetch(apiURL + "subtasks/" + subtask._id, {
          method: "DELETE",
        });
    });
    fetch(apiURL + "assignments/" + data, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        if (data.message === "Unauthorized") {
          handleAlertClick()
        } else {
          // getAssignments()
          // updateAssignments();
          updateAssignmentsInState()
          getSubtasks()
        }
      })
  }

  async function deleteSubtasks(subtask, authorId) {
    const deleteSubtask = await props.user.deleteSubtask(apiURL, subtask, authorId)
    if (deleteSubtask.message === "Unauthorized") {
      handleAlertClick()
    } else {
      updateSubtasks()
    }
  }
  async function editSubtask(subtask, authorId) {
    const editSubTask = await props.user.editSubTask(apiURL, subtask, authorId)
    if (editSubTask.message === "Unauthorized") {
      handleAlertClick()
    } else {
      updateSubtasks()
    }
  }
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        if (data.message === "Unauthorized") {
          handleAlertClick()
        } else {
          // getAssignments()
          updateAssignments();
        }


  }

  return (
    <UserContext.Consumer>
      {(user) => (
        <div className={classes.mainContainer}>
          <Container maxWidth="lg">
            <Typography className={classes.title} variant="h4"></Typography>
            <Grid container spacing={2}>
              {user.loggedIn ? (
                <Grid item xs={12} md={4}>
                  <Paper className={classes.paper}>
                    New assignment
                    <AddSection
                      name={user.name}
                      // assignmentToDb={assignmentToDb}
                      addAssignment={addAssignment}
                    // handleSaveClick={handleSaveClick}
                    />
                  </Paper>
                </Grid>
              ) : null}
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <FilterSection
                    // handleSearch={getAssignmentsFromJson}
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
                        deleteAssignment={deleteAssignment}
                        users={users}
                        subtasks={subtasks}
                        // users={Users.users}
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
