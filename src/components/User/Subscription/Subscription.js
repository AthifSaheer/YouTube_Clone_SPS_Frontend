import { useState, useEffect } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';

import {Link} from 'react-router-dom'
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import classes from "../Content/VideoCard.module.css";
import './Subscription.css'

// import classes from "../../../App.module.css";
// import VideoSearchResult from "./VideoSearchResult";
// import './Search.css'
import MainPageVideos from '../Content/MainPageVideos'

function Subscription(data) {
    const [apiSubrsVideo, setApiSubrsVideo] = useState([])
    const [token, setToken] = useCookies()
    let loginedChannel = token['channelCookie']
    let loginedUser = token['mytoken']

    useEffect(() => {
        if(loginedUser && loginedChannel)  {
            axios.get(`/api/v1/user/feed/subscribers/video/${loginedChannel}`)
            .then((response) => {
                console.log(response.data[0]);

                if (response.data[0].no_videos == "no_videos") {
                    alert('no_videos')
                    setApiSubrsVideo(response.data[0].no_videos);
                } else {
                    // alert('video found')
                    setApiSubrsVideo(response.data);
                    // apiSubrsVideo.map((video) => {
                    //     video.map((data) => {
                    //         console.log(data.channel.channel_name);
                    //     })
                    // })

                }
            })
            .catch((error) => {alert(error)})
        }
    }, [])

    return (
        <div className="app">
            <Header />
            <div className={classes.app__section}>
                <Sidebar />
            </div>

            {!loginedUser?
                    <p className="please-login-text">Please login</p>
                    :
                        !loginedChannel?
                            <p className="please-login-text">Please select or create channel!</p>
                        :
                            apiSubrsVideo == "no_videos"?
                                <p className="please-login-text">No Videos!</p>
                            :
                                // apiSubrsVideo && apiSubrsVideo.map((video, index) => {
                                    apiSubrsVideo.map((data, index) => {
                                        return (
                                            <div style={{display: 'flex'}}>
                                                <div style={{width: '233px'}}></div>

                                                <div className="videoSearchDiv">
                                                    <div className="thumbnail">
                                                        <Link to={`/watch/video/${data.id}`} style={{ textDecoration: 'none' }}>
                                                            <img src={data.thumbnail}  alt=""  />
                                                        </Link>
                                                    </div>
                                                    <div className="videoDetails" >
                                                        <p className="title">{data.title}</p>
                                                        <p style={{fontSize: '13px'}}>{data.view_count} views . {data.upload_date}</p>

                                                        <Link to={`/channel/${data.channel.id}`} style={{ textDecoration: 'none' }}>
                                                            <div className="channelWarpper">
                                                                <div className="channelLogo">
                                                                    <img src={data.channel.logo} alt="" width='30px' style={{borderRadius: '50%'}} />
                                                                </div>
                                                                <div className="channelName">
                                                                    <p style={{fontSize: '13px', color: 'black'}}>{data.channel.channel_name}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <p className="search-video-description">{data.description}</p>

                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })
                                // })
            }

        </div>


        // </div>
    )
}

export default Subscription

