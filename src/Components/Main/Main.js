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


  const updateAssignments = async () => {
    const newAssigmentList = await props.user.getAssignments()
    console.log(newAssigmentList);

  }


  // async function updateSubtasks() {
  //   fetch(apiURL + "subtasks", {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSubtasks(data);
  //     });
  // }

  const updateSubtasks = async () => {
    const newSubtaskList = await props.user.getAssignments()
    console.log(newSubtaskList);

  }

  useEffect(() => {
    // getAssignments();
    updateAssignments();
    updateSubtasks()
    props.user.getUsers(setUsers);
  }, []);

  async function assignmentToDb(data) {
    fetch(apiURL + "assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      })
  }
  async function subtaskToDb(subtask) {
    const newSubtask = await props.user.postSubtask(apiURL, subtask)
    if (newSubtask.message === "Unauthorized") {
      handleAlertClick()
    } else {
      updateSubtasks()
    }
    // fetch(apiURL + "subtasks", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((data) => {
    //     console.log(data)
    //     if (data.message === "Unauthorized") {
    //       handleAlertClick()
    //     } else {
    //       updateSubtasks()
    //     }
    // })
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
          updateAssignments();
          updateSubtasks()
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
    // fetch(apiURL + "subtasks/" + subtask._id, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((data) => {
    //     console.log(data)
    //     if (data.message === "Unauthorized") {
    //       handleAlertClick()
    //     } else {
    //       updateSubtasks()
    //     }
    // })
  }

  async function editSubtask(subtask, authorId) {
    const editSubTask = await props.user.editSubTask(apiURL, subtask, authorId)
    if (editSubTask.message === "Unauthorized") {
      handleAlertClick()
    } else {
      updateSubtasks()
    }
    //   fetch(apiURL + "subtasks/" + subtask._id, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((data) => {
    //     console.log(data)
    //     if (data.message === "Unauthorized") {
    //       handleAlertClick()
    //     } else {
    //       updateSubtasks()
    //     }
    // })
  }

  async function editAssignment(assignment, data) {
    fetch(apiURL + "assignments/" + assignment, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      })

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
                      assignmentToDb={assignmentToDb}
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
                        editAssignment={editAssignment}
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
