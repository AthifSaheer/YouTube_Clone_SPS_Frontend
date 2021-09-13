import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'

import './Channels.css'

function UserList() {
    const [channelApi, setChannelApi] = useState([])
    const [videoApi, setVideoApi] = useState([])
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
        fetch('https://ytdj.athifsaheer.online/api/v1/admin/channels/', {method: 'GET'})
        .then(responce => responce.json())
        .then(res => setChannelApi(res))
        .catch(res => setApiError(true))
    }, [])

    function videoPopupFunc(channelID) {
        setVideoPopup(true);
        fetch(`https://ytdj.athifsaheer.online/api/v1/admin/popup/video/${channelID}/`, {method: 'GET'})
        .then(responce => responce.json())
        .then(res => {
            console.log(res);
            setVideoApi(res)
        })
        .catch(res => setApiError(true))
    }

    const videoPopdownFunc = () => {
        setVideoPopup(false)
    }

    function blockChannelFunc(channelID) {
        axios.get(`https://ytdj.athifsaheer.online/api/v1/admin/block/channel/${channelID}/`)
        .then(res => {
            fetch('https://ytdj.athifsaheer.online/api/v1/admin/channels/', {method: 'GET'})
            .then(responce => responce.json())
            .then(res => setChannelApi(res))
        })
        .catch(err => channelApi.map(data => {
            if (channelID == data.id) {
                data.is_active = false
            }
        }))
    }

    function unBlockChannelFunc(channelID) {
        axios.get(`https://ytdj.athifsaheer.online/api/v1/admin/unblock/channel/${channelID}/`)
        .then(res => {
            fetch('https://ytdj.athifsaheer.online/api/v1/admin/channels/', {method: 'GET'})
            .then(responce => responce.json())
            .then(res => setChannelApi(res))
        })
        .catch(err => channelApi.map(data => {
            if (channelID == data.id) {
                data.is_active = false
            }
        }))
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

                        <div className="admin-table">

                            <table style={{ width: '99%'}}>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th style={{textAlign: 'left'}}>Channel</th>
                                        <th>Channel owner</th>
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
                                                <td onClick={() => videoPopupFunc(data.id)} className="admin-channel-name">{ data.channel_name }</td>
                                                <td style={{textAlign: 'left'}}>{ data.user.username }</td>
                                                <td className="channel_about">{ data.about }</td>
                                                <td>{ data.created_at }</td>
                                                {data.is_active?
                                                    <td id="block-td"><button onClick={() => blockChannelFunc(data.id)} id="channel-block-btn">BLOCK</button></td>
                                                :
                                                    <td id="block-td"><button onClick={() => unBlockChannelFunc(data.id)} id="channel-unblock-btn">UNBLOCK</button></td>
                                                }
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
                    <div className="channel-popup-main-div" id="dropdown" >
                        <div className="channel-popup-inner-div">
                            <button onClick={videoPopdownFunc} className="close-btn">x</button>
            
                            <div className="tabe">

                                <table style={{ width: '100%'}}>
                                    <thead>
                                        <tr>
                                            <th>NO</th>
                                            <th>Thumbnail</th>
                                            <th>Title</th>
                                            <th>Visibility</th> 
                                            <th>Category</th> 
                                            <th>View count</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody style={{ textAlign: 'center', marginTop:'100px' } }>
                                        {videoApi && videoApi.map((data, index) => {
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td><img src={data.thumbnail} alt="Thmbnl" style={{width:'100px', height:'50px'}} /></td>
                                                    <td>{data.title}</td>
                                                    <td>{data.visibility}</td>
                                                    <td>{data.category}</td>
                                                    <td>{data.view_count}</td>
                                                </tr>
                                            )
                                        })}
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
