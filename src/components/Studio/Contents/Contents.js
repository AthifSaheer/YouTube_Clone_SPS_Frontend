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
        // axios.get(`/api/v1/studio/videos/${token['mytoken']}/`)
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
                        <div className="table">

                            <table style={{ width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th>Video</th> 
                                        <th>Title</th>
                                        <th>Visibility</th>
                                        {/* <th>Commentcount</th> */}
                                        <th>Category</th>
                                        <th>View count</th>
                                        <th>Block</th>
                                    </tr>
                                </thead>
                                
                                <tbody style={{ textAlign: 'center' }}>

                                {videosAPI.length == 0?
                                    <div>
                                        <p style={{color: 'red', marginTop: '10px'}}>No videos</p>
                                    </div>
                                :
                                    videosAPI.map((data, index) => {
                                        let count = 0;
                                        console.log(data.id)
                                        return (
                                            <tr>
                                                <td><img src={data.thumbnail} width='100px' alt="" /></td>
                                                <td>{data.title}</td> 
                                                <td>{data.visibility}</td>
                                                <td>{data.category}</td>
                                                <td>{data.view_count}</td>
                                                <td>Block</td>
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
