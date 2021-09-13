import { useState, useEffect } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import * as timeago from 'timeago.js';  

import {Link} from 'react-router-dom'
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import classes from "../Content/VideoCard.module.css";
import '../Subscription/Subscription.css'

function WatchLater() {
    const [token, setToken] = useCookies('')
    const [apiWatchLaterVideos, setApiWatchLaterVideos] = useState([])
    let user_channel = token['channelCookie']? token['channelCookie'] : 0

    useEffect(() => {
        axios.get(`https://ytdj.athifsaheer.online/api/v1/user/watch/later/${user_channel}/`)
        .then((response) => {
            console.log(response.data);
            console.log(response.data.no_watch_later_videos);

            if (response.data.no_watch_later_videos == "no_watch_later_videos") {
                setApiWatchLaterVideos(response.data.no_watch_later_videos);
            } else {
                setApiWatchLaterVideos(response.data);
            }
        })
        .catch((error) => {console.log(error)})
    }, [])

    return (
        <div className="app">
            <Header />
            <div className={classes.app__section}>
                <Sidebar />
            </div>
            {apiWatchLaterVideos == "no_watch_later_videos"?
                <p  className="please-login-text">No Videos!</p>
            :
                apiWatchLaterVideos && apiWatchLaterVideos.map((data, index) => {
                    return (
                        <div style={{display: 'flex'}}>
                            <div style={{width: '233px'}}></div>

                            <div className="videoSearchDiv">
                                <div className="thumbnail">
                                    <Link to={`/watch/video/${data.watch_later_video.id}`} style={{ textDecoration: 'none' }}>
                                        <img src={data.watch_later_video.thumbnail}  alt=""  />
                                    </Link>
                                </div>
                                <div className="videoDetails" >
                                    <p className="title">{data.watch_later_video.title}</p>
                                    <p style={{fontSize: '13px'}}>{data.watch_later_video.view_count} views . {timeago.format(data.watch_later_video.upload_date)}</p>

                                    <Link to={`/channel/${data.applied_channel.id}`} style={{ textDecoration: 'none' }}>
                                        <div className="channelWarpper">
                                            <div className="channelLogo">
                                                <img src={data.applied_channel.logo} alt="" width='30px' style={{borderRadius: '50%'}} />
                                            </div>
                                            <div className="channelName">
                                                <p style={{fontSize: '13px', color: 'black'}}>{data.applied_channel.channel_name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <p className="search-video-description">{data.watch_later_video.description}</p>

                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default WatchLater
