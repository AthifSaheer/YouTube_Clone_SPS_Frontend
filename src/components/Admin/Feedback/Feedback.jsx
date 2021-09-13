import React from 'react'
import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import './Feedback.css'

function Feedback() {
    const [feedbackData, setFeedbackData] = useState([])
    const [apiError, setApiError] = useState(false)

    // SESSION HANDLE -----
    const [token, setToken] = useCookies(['admintoken'])
    const history = useHistory()
    
    // SESSION HANDLE -----
    useEffect(() => {
        if(!token['admintoken']) {
            history.push('/admin/login')
        } else {
            history.push('/admin/feedback')
        }
    }, [token])

    useEffect(() => {
        fetch('https://ytdj.athifsaheer.online/api/v1/studio/send/feedback/')
        .then(responce => responce.json())
        .then(res => {
            setFeedbackData(res)
            console.log(feedbackData)
        })
        .catch(res => setApiError(true))
    }, [])

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />

                <div className="main-content-div">
                    <h3>Feedbacks</h3>
                    {apiError?
                        <h3 className='error-txt'>Error Accrued</h3>
                    :
                    
                    <div className="admin-table">
                            

                            <table style={{ width: '99%'}}>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th style={{textAlign: 'left'}}>Channel</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Date</th> 
                                    </tr>
                                </thead>
                                
                                <tbody style={{ textAlign: 'center', marginTop:'100px' } }>
                                    {feedbackData && feedbackData.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td style={{textAlign: 'left'}}>{data.channel.channel_name}</td>
                                                <td style={{ overflow: 'hidden', textOverflow: 'ellipsis'}}>{data.subject}</td>
                                                <td style={{ overflow: 'hidden', textOverflow: 'ellipsis'}}>{data.message}</td>
                                                <td>{data.created_at}</td>
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


export default Feedback
