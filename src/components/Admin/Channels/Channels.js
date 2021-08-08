import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import { useState, useEffect } from 'react';

import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'

import './Channels.css'

function UserList() {
    const [channelApi, setChannelApi] = useState([])
    const [videoDiv, setVideoDiv] = useState(false)
    const [videoPopup, setVideoPopup] = useState(false)
    const [apiError, setApiError] = useState(false)

    // SESSION HANDLE -----
    const [token, setToken] = useCookies(['admintoken'])
    const history = useHistory()

    // SESSION HANDLE -----
    useEffect(() => {
        if(!token['admintoken']) {
            history.push('/admin/login')
        }
    }, [token])
    
    useEffect(() => {
        fetch('/api/v1/admin/channels', {
            method: 'GET',
        })
        .then(responce => responce.json())
        .then(res => setChannelApi(res))
        .catch(res => setApiError(true))
    }, [])

    function onClick() {
        setVideoDiv(true);
    }

    const videoPopdownFunc = () => {
        setVideoPopup(false)
    }

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />
                
                {apiError?
                    <h3 style={{textAlign: 'center', justifyContent: 'center', margin: 'auto', color: 'red', padding: '15px'}}>Error Accrued...</h3>
                :
                    <div className="main">
                        <h3>All Channels</h3>

                        <div className="table">

                            <table style={{ width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th onClick={onClick}>Channel</th>
                                        <th>User</th>
                                        <th>About</th>
                                        <th>Created at</th>
                                        <th>Block</th>
                                    </tr>
                                </thead>
                                
                                <tbody style={{ textAlign: 'center', marginTop:'100px' } }>
                                    {channelApi && channelApi.map((data, index) => {
                                        return (
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{ data.channel_name }</td>
                                                <td>{ data.token.user }</td>
                                                <td>{ data.about }</td>
                                                <td>{ data.created_at }</td>
                                                {/* <td><img src={data.thumbnail} alt="Thmbnl" style={{width:'100px', height:'50px'}} /></td> */}
                                                <td style={{color:'red'}}><span className="material-icons">block</span></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                }

                {/* Video popup */}
                {videoPopup?
                    <div className="channel-popup-main-div" id="dropdown" onClick={videoPopdownFunc} >
                        <div className="channel-popup-inner-div">
                            <button onClick={videoPopdownFunc}>x</button>
            
                        <div className="tabe">

                            <table style={{ width: '70%'}}>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>User</th>
                                        <th>Channel</th>
                                        <th onClick={onClick}>Thumbnail</th>
                                        <th>Title</th>
                                        <th>Visibility</th> 
                                        <td>kjl</td>
                                        <th>Category</th> 
                                        <th>View count</th>
                                        <th>Block</th>
                                    </tr>
                                </thead>
                                
                                <tbody style={{ textAlign: 'center', marginTop:'100px' } }>
                                    {/* {videosData && videosData.map((data, index) => {
                                        return (
                                            <tr>
                                                <td>{data.id}</td>
                                                <td>{ data.user.username }</td>
                                                <td>{ data.channel.channel_name }</td>
                                                <td><img src={data.thumbnail} alt="Thmbnl" style={{width:'100px', height:'50px'}} /></td>
                                                <td>{data.title}</td>
                                                <td>{data.visibility}</td>
                                                <td>{data.category}</td>
                                                <td>{data.view_count}</td>
                                                <td style={{color:'red'}}><span className="material-icons">block</span></td>
                                            </tr>
                                        )
                                    })} */}
                                    <tr>
                                        <td>kjl</td>
                                        <td>kjl</td>
                                        <td>kjl</td>
                                        <td>kjl</td>
                                        <td>kjl</td>
                                        <td>kjl</td>
                                        <td>kjl</td>
                                        <td>kjl</td>
                                        <td>kjl</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>

                        </div>
                    </div>
                :
                    null
                }

            </div>
        </div>
    )
}


export default UserList
