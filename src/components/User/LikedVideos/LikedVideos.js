import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import * as timeago from 'timeago.js';

import {Link} from 'react-router-dom'
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import classes from "../Content/VideoCard.module.css";
import '../Subscription/Subscription.css'

function LikedVideos() {
    const [apiLikedVideos, setApiLikedVideos] = useState([])
    const [token, setToken] = useCookies('')
    let loginedChannel = token['channelCookie']? token['channelCookie'] : 0

    useEffect(() => {
        axios.get(`/api/v1/user/feed/liked/videos/${loginedChannel}/`)
        .then((response) => {
            console.log(response.data[0].no_videos);
            console.log(response.data);

            if (response.data[0].no_videos == "no_videos") {
                setApiLikedVideos(response.data[0].no_videos);
            } else {
                setApiLikedVideos(response.data);
            }
        })
        .catch((error) => setApiLikedVideos("no_videos"))
    }, [])
    return (
        <div className="app">
            <Header />
            <div className={classes.app__section}>
                <Sidebar />
            </div>
            {apiLikedVideos == "no_videos"?
                <p  className="please-login-text">No Videos!</p>
            :
                apiLikedVideos&& apiLikedVideos.map((data, index) => {
                    return (
                        <div style={{display: 'flex'}}>
                            <div style={{width: '233px'}}></div>

                            <div className="videoSearchDiv">
                                <div className="thumbnail">
                                    <Link to={`/watch/video/${data.liked_video.id}`} style={{ textDecoration: 'none' }}>
                                        <img src={data.liked_video.thumbnail}  alt=""  />
                                    </Link>
                                </div>
                                <div className="videoDetails" >
                                    <p className="title">{data.liked_video.title}</p>
                                    <p style={{fontSize: '13px'}}>{data.liked_video.view_count} views . {timeago.format(data.liked_video.upload_date)}</p>

                                    <Link to={`/channel/${data.liked_video.id}`} style={{ textDecoration: 'none' }}>
                                        <div className="channelWarpper">
                                            <div className="channelLogo">
                                                <img src={data.liked_video.channel.logo} alt="" width='30px' style={{borderRadius: '50%'}} />
                                            </div>
                                            <div className="channelName">
                                                <p style={{fontSize: '13px', color: 'black'}}>{data.liked_video.channel.channel_name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <p className="search-video-description">{data.liked_video.description}</p>

                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default LikedVideos
