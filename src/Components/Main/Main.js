import React, { useEffect } from "react";
import { Container, Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssigneeListGeneration from "../AssigneeListGeneration/AssigneeListGeneration";
import FilterSection from "../FilterSection/FilterSection";
import AddSection from "../AddSection/AddSection";
import { UserContext } from "../../Contexts/UserContext";
// temp database
// import Users from "../database/Users.json"
// import Assignments from "../database/Assignments.json"
// import Subtasks from "../database/Subtasks.json"
// - - - - - -
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
function Main() {
  const classes = useStyles();
  const [assignments, setAssignments] = React.useState(null);
  const [subtasks, setSubtasks] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const apiURL = "http://localhost:3000/api/";


  async function getUsers() {
    fetch(apiURL + "users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setUsers(data);
        });
  }
  async function getAssignments() {
    fetch(apiURL + "assignments", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setAssignments(data);
      });
  }
  async function getSubtasks() {
    fetch(apiURL + "subtasks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setSubtasks(data);
      });
  }
  useEffect(() => {
    getAssignments();
    getSubtasks();
    getUsers();
  }, []);
  
  async function assignmentToDb(data) {
    fetch(apiURL + "assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(getAssignments);
  }
  async function subtaskToDb(data) {
    fetch(apiURL + "subtasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(getSubtasks);
  }
  async function deleteAssignment(data, subtasks) {
    subtasks.map((subtask) => {
      if (subtask.parentId === data)
        fetch(apiURL + "subtasks/" + subtask._id, {
          method: "DELETE",
        });
    });
    fetch(apiURL + "assignments/" + data, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(getAssignments)
      .then(getSubtasks);
  }

  async function deleteSubtasks(subtask, data) {
        
        fetch(apiURL + "subtasks/" + subtask._id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(getSubtasks);
    }

    async function editSubtask(subtask, data) {
      
      fetch(apiURL + "subtasks/" + subtask._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(getSubtasks)
    }

    async function editAssignment(assignment, data) {
      fetch(apiURL + "assignments/" + assignment, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(getAssignments)
    }

  //   async function editSubTask(url, target, subTarget, data) {
  //     const response = await fetch(`${url + target}/${subTarget}`, {
  //         method: 'PUT',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data)
  //     })
  //     return response.json();
  // }
  // const handleEditSubtaskSave = (target, subTarget, data) => {
  //     // console.log(target, subTarget, data);
  //     editSubTask(apiURL, target, subTarget, data)
  //         .then((data) => {
  //             setAssignments(data)
  //         })
  // }

  // async function deleteSubtasks(subtasksToRemove) {
  //     console.log(subtasksToRemove);
  //     fetch(apiURL + "subtasks/" + subtasksToRemove, {
  //         method: "DELETE",
  //     })
  //         .then((response) => response.json())
  //         .then((data) => console.log(data))
  // }
  // //Delete assignment
  // async function deleteAssignment(url, target) {
  //     const response = await fetch(url + target, {
  //         method: 'DELETE',
  //     });
  //     return response.json();
  // }
  // const deleteAssignmentFromJson = (target) => {
  //     deleteAssignment(apiURL, target)
  //         .then((data) => {
  //             setAssignments(data)
  //         });
  // }
  //Get assignments
  // async function getAssignment(url, target) {
  //     const response = await fetch((target) ? url + target : url, {
  //         method: 'GET'
  //     });
  //     return response.json();
  // }
  // const getAssignmentsFromJson = (target) => {
  //     if (typeof target === 'string') {
  //         target = target.toLowerCase()
  //         getAssignment(apiURL, target)
  //             .then((data) => {
  //                 console.log(data);
  //                 setAssignments(data)
  //             });
  //     } else {
  //         getAssignment(apiURL)
  //             .then((data) => {
  //                 console.log(data);
  //                 setAssignments(data)
  //             });
  //     }
  // }
  // //Post assignment
  // async function postAssignment(url, data) {
  //     const response = await fetch(url, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data)
  //     });
  //     return response.json();
  // }
  // //Post subtask to assignment
  // async function postSubTask(url, target, data) {
  //     const response = await fetch(url + target, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data)
  //     });
  //     return response.json();
  // }
  // const handleSubTaskSave = (target, inputValues) => {
  //     postSubTask(apiURL, target, inputValues)
  //         .then((data) => {
  //             setAssignments(data)
  //         });
  // }
  // //Delete subtask from assignment
  // async function deleteSubTask(url, target, subTarget) {
  //     const response = await fetch(`${url + target}/${subTarget}`, {
  //         method: 'DELETE',
  //     });
  //     return response.json();
  // }
  // const handleSubTaskDelete = (target, subTarget) => {
  //     deleteSubTask(apiURL, target, subTarget)
  //         .then((data) => {
  //             setAssignments(data)
  //         });
  // }
  // // Edit assignment
  // async function editAssignment(url, target, data) {
  //     const response = await fetch(url + target, {
  //         method: 'PUT',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data)
  //     })
  //     return response.json();
  // }
  // const handleEditSave = (target, inputValues) => {
  //     editAssignment(apiURL, target, inputValues)
  //         .then((data) => {
  //             setAssignments(data)
  //         })
  // }
  // //Edit subtask in assignment
  // async function editSubTask(url, target, subTarget, data) {
  //     const response = await fetch(`${url + target}/${subTarget}`, {
  //         method: 'PUT',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data)
  //     })
  //     return response.json();
  // }
  // const handleEditSubtaskSave = (target, subTarget, data) => {
  //     // console.log(target, subTarget, data);
  //     editSubTask(apiURL, target, subTarget, data)
  //         .then((data) => {
  //             setAssignments(data)
  //         })
  // }
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