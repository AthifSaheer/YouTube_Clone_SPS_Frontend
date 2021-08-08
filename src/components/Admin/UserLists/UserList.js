import React from 'react'
import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import { useState, useEffect } from 'react';
import './UserList.css'
// import img from '../../../image/crossroads.jpg'

function UserList() {
    const [userData, setUserData] = useState([])
    const [apiError, setApiError] = useState(false)

    // SESSION HANDLE -----
    const [token, setToken] = useCookies(['admintoken'])
    const history = useHistory()
    
    // SESSION HANDLE -----
    useEffect(() => {
        if(!token['admintoken']) {
            history.push('/admin/login')
        } else {
            history.push('/admin/users')
        }
    }, [token])

    useEffect(() => {
        fetch('/api/v1/admin/users/', {
            method: 'GET',
        })
        .then(responce => responce.json())
        .then(res => setUserData(res))
        .catch(res => setApiError(true))
    }, [])

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />

                <div className="main-content-div">
                    {apiError?
                        <h3 className='error-txt'>Error Accrued</h3>
                    :
                        <div className="table">

                            <table style={{ width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Is active</th>
                                        <th>Is staff</th>
                                        <th>Join date</th> 
                                        <th>Last login</th> 
                                        <th>Block</th>
                                    </tr>
                                </thead>
                                
                                <tbody style={{ textAlign: 'center', marginTop:'100px' } }>
                                    {userData && userData.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{data.id}</td>
                                                <td>{data.username}</td>
                                                <td>{data.is_active? 'True' : 'False'}</td>
                                                <td>{data.is_staff? 'True' : 'False'}</td>
                                                <td>{data.date_joined}</td>
                                                <td>{data.last_login}</td>
                                                <td style={{color:'red'}}><span className="material-icons">block</span></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}


export default UserList
