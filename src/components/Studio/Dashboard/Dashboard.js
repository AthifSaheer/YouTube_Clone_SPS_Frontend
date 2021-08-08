import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {useCookies} from 'react-cookie';

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";

function Dashboard() {
    // SESSION HANDLE 
    const [token, setToken] = useCookies(['mytoken'])
    const history = useHistory()

    // SESSION HANDLE -----
    useEffect(() => {
        if(!token['mytoken']) {
        history.push('/login')
    }
    }, [token]);

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />
                Dashboard
            </div>
        </div>
    )
}

export default Dashboard
