// @ts-nocheck
import React, { useEffect } from 'react'
import { Container, Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AssigneeListGeneration from '../Components/AssigneeListGeneration/AssigneeListGeneration';
import FilterSection from '../Components/FilterSection/FilterSection'
import AddSection from '../Components/AddSection/AddSection';
import Topbar from '../Components/TopBar/Topbar';
import UserManager from "../Components/UserManager/UserManager"

import { UserContext } from '../Contexts/UserContext';
import Main from '../Components/Main/Main'


// temp database
import Users from "../database/Users.json"
import Assignments from "../database/Assignments.json"
import Subtasks from "../database/Subtasks.json"
import { set } from 'mongoose';
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

function Layout() {
    const classes = useStyles()
    const [assignments, setAssignments] = React.useState(null)
    const apiURL = 'http://localhost:3000/api/assignments/'

    // useEffect(() => {
    //     getAssignmentsFromJson()
    // }, [])

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

    // const handleSaveClick = (inputValues) => {
    //     postAssignment(apiURL, inputValues)
    //         .then((data) => {
    //             setAssignments(data)
    //         });
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

    const [view, setView] = React.useState('main')

    const handleChangeView = () => {
        view === 'main' ? setView('manage users') : setView('main')
    }



    return (

        <UserContext.Consumer>
            {user => (
                <div className={classes.mainContainer}>

                    <Topbar changeView={handleChangeView} />


                    {view === 'main' ?
                        <Main /> : <UserManager />
                    }



                </div>

            )}
        </UserContext.Consumer>

    )
}

export default Layout