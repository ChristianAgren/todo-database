
import React from 'react'
import { Container, Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AssigneeListGeneration from '../AssigneeListGeneration/AssigneeListGeneration';
import FilterSection from '../FilterSection/FilterSection'
import AddSection from '../AddSection/AddSection';

import { UserContext } from '../../Contexts/UserContext';

// temp database
import Users from "../../database/Users.json"
import Assignments from "../../database/Assignments.json"
import Subtasks from "../../database/Subtasks.json"
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
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Main() {
    const classes = useStyles()
    const [assignments, setAssignments] = React.useState(null)
    const apiURL = 'http://localhost:3000/api/assignments/'

    return (
        <UserContext.Consumer>
            {user => (

                <Container maxWidth="lg">
                    <Typography className={classes.title} variant="h4">

                    </Typography>
                    <Grid container spacing={2}>
                        {user.loggedIn ?
                            <Grid item xs={12} md={4}>
                                <Paper className={classes.paper}>New assignment
                                    <AddSection
                                        name={user.name}
                                    // handleSaveClick={handleSaveClick} 
                                    />
                                </Paper>
                            </Grid>
                            : null
                        }


                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <FilterSection
                                    // handleSearch={getAssignmentsFromJson}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Paper style={{ marginBottom: '2rem' }} className={classes.paper}>
                                        {(assignments != null) ?
                                            `Assignments${(assignments.length !== undefined) ? `: ${assignments.length}` : ``}`
                                            : null
                                        }
                                        <AssigneeListGeneration
                                            assignments={Assignments.assignments}
                                            subtasks={Subtasks.subtasks}
                                            users={Users.users}
                                        // editAssignment={handleEditSave}
                                        // removeAssignment={deleteAssignmentFromJson}
                                        // subTasksSave={handleSubTaskSave}
                                        // subTasksDel={handleSubTaskDelete}
                                        // subTasksEdit={handleEditSubtaskSave}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </UserContext.Consumer>


    )
}

export default Main