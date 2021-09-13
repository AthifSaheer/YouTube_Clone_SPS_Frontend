import React from 'react'
import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

import TableUI from '../TableUI/TableUI'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import './UserList.css'

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
        fetch('https://ytdj.athifsaheer.online/api/v1/admin/users/', { method: 'GET'})
        .then(responce => responce.json())
        .then(res => setUserData(res))
        .catch(res => setApiError(true))
    }, [])

    function blockUserFunc(userID) {
        axios.get(`https://ytdj.athifsaheer.online/api/v1/admin/block/user/${userID}/`)
        .then(res => {
            fetch('https://ytdj.athifsaheer.online/api/v1/admin/users/', { method: 'GET'})
            .then(responce => responce.json())
            .then(res => setUserData(res))
        })
        .catch(err => userData.map(data => {
            if (userID == data.id) {
                data.is_active = false
            }
        }))
    }

    function unBlockUserFunc(userID) {
        axios.get(`https://ytdj.athifsaheer.online/api/v1/admin/unblock/user/${userID}/`)
        .then(res => {
            fetch('https://ytdj.athifsaheer.online/api/v1/admin/users/', { method: 'GET'})
            .then(responce => responce.json())
            .then(res => setUserData(res))
        })
        .catch(err => userData.map(data => {
            if (userID == data.id) {
                data.is_active = false
            }
        }))
    }

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />

                <div className="main-content-div">
                    <h3>All users</h3>
                    {apiError?
                        <h3 className='error-txt'>Error Accrued</h3>
                    :
                    
                    <div className="admin-table">
                            

                            <table style={{ width: '99%'}}>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th style={{textAlign: 'left'}}>Username</th>
                                        <th>Active</th>
                                        <th>Staff</th>
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
                                                <td style={{textAlign: 'left'}}>{data.username}</td>
                                                <td>{data.is_active? 'True' : 'False'}</td>
                                                <td>{data.is_staff? 'True' : 'False'}</td>
                                                <td>{data.date_joined}</td>
                                                <td>{data.last_login}</td>

                                                {data.is_active?
                                                    <td id="block-td"><button onClick={() => blockUserFunc(data.id)} id="channel-block-btn">BLOCK</button></td>
                                                :
                                                    <td id="block-td"><button onClick={() => unBlockUserFunc(data.id)} id="channel-unblock-btn">UNBLOCK</button></td>
                                                }

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
