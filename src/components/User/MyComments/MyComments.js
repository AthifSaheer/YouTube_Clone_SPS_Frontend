import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import img from '../../.../../../image/avatar.jpg'
import img1 from '../../.../../../image/youtube2.jpg'
import './MyComments.css'

function MyComments() {
    const [commentsAPI, setCommentsAPI] = useState([])
    const [ApiError, setApiError] = useState(false)
    const [token, setToken] = useCookies() 

    let loginedChannel = token['channelCookie']
    let loginedUser = token['mytoken']

    useEffect(() => {
        if(loginedUser && loginedChannel)  {
            axios.get(`https://ytdj.athifsaheer.online/api/v1/user/feed/my/comments/${loginedChannel}`)
            .then((response) => {
                if (response.data[0].no_comments == "no_comments") {
                    setCommentsAPI(response.data[0].no_comments);
                } else {
                    setCommentsAPI(response.data);
                }
            })
            .catch((error) => setApiError(true))
        }
    }, [])

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />

                <div className="main">
                    
                    <h3 className="my-cmnt-txt">My comments</h3>

                    {!loginedUser?
                        <p style={{color: 'gray', fontSize: '19px', padding: '14px 0 0 0'}}>Please login!</p>
                    :
                        !loginedChannel?
                            <p style={{color: 'gray', fontSize: '19px', padding: '14px 0 0 0'}}>Please select or create channel!</p>
                        :
                            ApiError?
                                <div>
                                    <p style={{color: 'red', marginTop: '10px'}}>Error Accrued*</p>
                                    <p style={{color: 'gray', fontSize: '12px'}}>*Incase please select a channel</p>
                                </div>
                            :
                                commentsAPI == "no_comments"?
                                    <p style={{color: 'gray', fontSize: '19px', padding: '14px 0 0 0'}}>No Comments!</p>
                                :
                                    commentsAPI && commentsAPI.map((data, index) => {
                                        return(
                                            <div className="my-comments-main-div" key={data.id}>
                                                <div className="channel-logo">
                                                    <img src={data.commented_channel.logo} alt="channel_logo" />
                                                </div>
                                                <div className="channel-and-comment-details">
                                                    <p className="channel_name">{data.commented_channel.channel_name}</p>
                                                    <p className="comment">{data.comment}</p>
                                                </div>

                                                <div className="video-thumbnail">
                                                    <img src={data.received_video.thumbnail} alt="video_thumbnail" />
                                                </div>
                                                <div className="video-title">
                                                    <p>{data.received_video.title}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                    }

                </div>

            </div>
        </div>
    )
}

export default MyComments
