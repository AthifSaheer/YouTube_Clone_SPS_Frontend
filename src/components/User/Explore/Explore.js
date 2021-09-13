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

function Explore() {
    const [apiExploreVideos, setApiExploreVideos] = useState([])

    useEffect(() => {
        axios.get(`https://ytdj.athifsaheer.online/api/v1/user/feed/explore/`)
        .then((response) => {
            console.log(response.data[0].no_videos);
            console.log(response.data);

            if (response.data[0].no_videos == "no_videos") {
                setApiExploreVideos(response.data[0].no_videos);
            } else {
                setApiExploreVideos(response.data);
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
            {apiExploreVideos == "no_videos"?
                <p  className="please-login-text">No Videos!</p>
            :
                apiExploreVideos && apiExploreVideos.map((data, index) => {
                    return (
                        <div style={{display: 'flex'}}>
                            <div style={{width: '233px'}}></div>

                            <div className="videoSearchDiv">
                                <div className="thumbnail">
                                    <Link to={`/watch/video/${data.id}`} style={{ textDecoration: 'none' }}>
                                        <img src={data.thumbnail} alt="" />
                                    </Link>
                                </div>
                                <div className="videoDetails" >
                                    <p className="title">{data.title}</p>
                                    <p style={{fontSize: '13px'}}>{data.view_count} views . {timeago.format(data.upload_date)}</p>

                                    <Link to={`/channel/${data.channel.id}`} style={{ textDecoration: 'none' }}>
                                        <div className="channelWarpper">
                                            <div className="channelLogo">
                                                <img src={data.channel.logo} alt="" width='30px' height='30px' style={{borderRadius: '50%'}} />
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
            }
        </div>
    )
}

export default Explore
