import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import { useState, useEffect } from 'react';


function UserList() {
    const [userData, setUserData] = useState([])
    
    useEffect(() => {
        fetch('/admin/users/', {
            method: 'GET',
        })
        .then(responce => responce.json())
        .then(res => setUserData(res))
    }, [])

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />

                <div className="main">
                    <h3>All Users</h3>

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
                                    {/* <th>Action</th> */}
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
                                            {/* <td>90k</td> */}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    )
}


export default UserList
