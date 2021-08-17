import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import './Contents.css';


function Contents() {
    const [videosAPI, setVideosAPI] = useState([])
    const [ApiError, setApiError] = useState(false)

    // SESSION HANDLE 
    const [token, setToken] = useCookies() // ['mytoken']
    const history = useHistory()

    // SESSION HANDLE -----
    useEffect(() => {
        if(!token['mytoken']) {
        history.push('/login')
    }
    }, [token]);

    useEffect(() => {
        axios.get(`/api/v1/studio/videos/${token['channelCookie']}/`)
        .then(res => {setVideosAPI(res.data)})
        .catch(res => setApiError(true))
    }, [])

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />

                <div className="main">
                    
                    <h3>Channel contents</h3>
                    {ApiError?
                        <div>
                            <p style={{color: 'red', marginTop: '10px'}}>Error Accrued*</p>
                        <p style={{color: 'gray', fontSize: '12px'}}>*Incase please select a channel</p>
                        </div>
                    :
                        <div className="studio-table">

                            <table style={{ width: '99%'}}>
                                <thead>
                                    <tr>
                                        <th>Video</th> 
                                        <th>Title</th>
                                        <th>Visibility</th>
                                        {/* <th>Commentcount</th> */}
                                        <th>Category</th>
                                        <th>View count</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                
                                <tbody style={{ textAlign: 'center' }}>

                                {videosAPI.length == 0?
                                    <div>
                                        <p style={{color: 'red', marginTop: '10px'}}>No videos</p>
                                    </div>
                                :
                                    videosAPI.map((data, index) => {
                                        let videoDeletePostData = {"user_token": token['mytoken'], "channel_id": token['channelCookie'], "video": data.id}

                                        function deleteVideoFunc() {
                                            let deleteConfirm = window.confirm("Do you want to delete this video?")
                                            
                                            if (deleteConfirm) {
                                                axios.post(`/api/v1/studio/delete/videos/`, videoDeletePostData)
                                                .then(res => {
                                                    if (res.data.video_deleted == "video_deleted") {
                                                        alert("Video deleted successfully")
                                                        axios.get(`/api/v1/studio/videos/${token['channelCookie']}/`)
                                                        .then(res => {setVideosAPI(res.data)})
                                                        .catch(res => setApiError(true))
                                                    } else if (res.data.video_deleted_error == "video_deleted_error") {
                                                        alert("Error occured!")
                                                    }
                                                })
                                                .catch(err => alert(err))
                                            }
                                        }
                                        let style = {
                                            hoverStyle: {
                                                color: 'red',
                                                '&:hover': { color: 'blue !important' },
                                              }
                                        }

                                        return (
                                            <tr key={index}>
                                                <td><img src={data.thumbnail} width='100px' alt="" /></td>
                                                <td>{data.title}</td> 
                                                <td>{data.visibility}</td>
                                                <td>{data.category}</td>
                                                <td>{data.view_count}</td>
                                                <td data-hover="button"> <span className="material-icons video-dlt-icon" onClick={deleteVideoFunc}>delete</span></td>
                                            </tr>
                                        )
                                    })
                                    
                                }

                                </tbody>
                            </table>
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}

export default Contents
