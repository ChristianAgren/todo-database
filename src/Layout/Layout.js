// @ts-nocheck
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Topbar from '../Components/TopBar/Topbar';
import UserManager from "../Components/UserManager/UserManager"
import Main from '../Components/Main/Main'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        minHeight: "100vh",
        height: "100%",
        backgroundColor: "#F5F5F5",
    },
}));

function Layout() {
    const classes = useStyles()
    const [view, setView] = React.useState('main')
    const handleChangeView = () => {
        view === 'main' ? setView('manage users') : setView('main')
    }

    return (
        <div className={classes.mainContainer}>
            <Topbar changeView={handleChangeView} />
            {view === 'main' ?
                <Main /> : <UserManager />
            }
        </div>
    )
}

export default Layout
