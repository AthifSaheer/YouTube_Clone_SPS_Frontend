import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import * as timeago from 'timeago.js'

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import classes from "../../../App.module.css";
import './ChannelView.css'

function ChannelView() {


    const [token, setToken] = useCookies()
    const [APIData, setAPIData] = useState()
    let { channelID } = useParams();

    // let x = token? null : alert("kl")
    let user_token = token['mytoken']? token['mytoken'] : null
    let user_channel = token['channelCookie']? token['channelCookie'] : 0
    
    const getData = {"token": user_token, "user_channel": user_channel, "which_channels": channelID, "method":"get"}
    const postData = {"token": user_token, "user_channel": user_channel, "which_channels": channelID, "method":"post"}

    
    let currentUserChannel = token['channelCookie']

    const [videoData, setVideoData] = useState([])
    const [videosNotFound, setVideosNotFound] = useState(false)

    const [channelData, setChannelData] = useState([])
    const [channelNotFound, setChannelNotFound] = useState(false)
    
    useEffect(() => {
        // CHANNEL --------
        axios.get(`/api/v1/user/channel/${channelID}/`) // 
        // .then(res => res.json())
        .then(res => {
            console.log(res);
            setChannelData(res)
            setChannelNotFound(false)
        })
        .catch(error => {
            setChannelNotFound(true);
            setChannelData([])
            alert(error.message)
        })

        // VIDEOS ------
        axios.get(`/api/v1/user/channel/video/${channelID}/`)
        .then(res => {
            console.log(res.data.videos_not_found);
            if (res.data.videos_not_found != undefined) {
                setVideosNotFound(true)
            } else {
                setVideosNotFound(false)
                setVideoData(res.data)
            }
        })
        .catch(error => {
            setVideosNotFound(true);
            setVideoData([])
            alert(error.message)
        })

        // CHANNEL SUBSCRIBE -------
        axios.post(`/api/v1/user/subscribe/channel/`, getData)
        .then(response => {
            if (response.data.subscribed) {
                setAPIData(response.data.subscribed)
            } else if (response.data.unsubscribed) {
                setAPIData(response.data.unsubscribed)
            }
        })
        .catch(err => alert(err));

        
    }, [channelID])

    const subscribeFunc = () => {
        if (user_channel == 0) {
            alert("Choose or create your channel.")
        } else {
            axios.post(`/api/v1/user/subscribe/channel/`, postData)
            .then(response => {
                if (response.data.subscribed) {
                    setAPIData(response.data.subscribed)
                } else if (response.data.unsubscribed) {
                    setAPIData(response.data.unsubscribed)
                } else if (response.data.same_channel) {
                    setAPIData(response.data.same_channel)
                } else if (response.data.created_subscribed) {
                    setAPIData(response.data.created_subscribed)
                } else if (response.data.channel_does_not_exists) {
                    alert(response.data.channel_does_not_exists)
                } else if (response.data.your_own_channel) {
                    alert(response.data.your_own_channel)
                }
            })
            .catch(err => alert(err));
        }
    }
    

  return (
    <div className="app">
        <Header />
        <div className={classes.app__section}>
            <Sidebar />
        </div>

        <div className={classes.app__section}>
            <div className="empty-div"></div>

            <div className="channel-wrapper">

                { Object.values(channelData).map((data, index) => {
                    if (index === 0) {
                    return (
                        <div key={data.id}>
                            <div className="channel-banner">
                                <img src={data.banner} alt="channel banner" />
                            </div>

                            <div className="channel-details">
                                <img src={data.logo} alt="channel logo" />

                                <div className="channel-name-div">
                                    <p>{data.channel_name}</p>
                                    <span>{data.subscribers} subscribers</span>
                                </div>

                                {/* {subscribersData.map((data, index) => {
                                    if(data.which_channels == channelID && data.user_channel == currentUserChannel && data.subscribe == false) {
                                        return (
                                            <div className="subscribe-btn-div">
                                                <button className="subscribe-btn">SUBSCRIBE</button>
                                            </div>
                                        )
                                    } else if (data.which_channels == channelID && data.user_channel == currentUserChannel && data.subscribe == true) {
                                        return (
                                            <div className="subscribe-btn-div">
                                                <button className="subscribed-btn">SUBSCRIBED</button>
                                            </div>
                                        )
                                    } else if(index == 0) {
                                        return (
                                            <div className="subscribe-btn-div">
                                                <button className="subscribe-btn">SUBSCRIBE</button>
                                            </div>
                                        )
                                    }
                                })} */}


                                {APIData == "subscribed" || APIData == "created_subscribed"?
                                    <div className="subscribe-btn-div" >
                                        <button className="subscribed-btn" onClick={subscribeFunc}>SUBSCRIBED</button>
                                        {/* <span className="material-icons notfc-icon">notifications_active</span> */}
                                    </div>
                                :
                                    user_token?
                                        <div className="subscribe-btn-div" >
                                            <button className="subscribe-btn" onClick={subscribeFunc}>SUBSCRIBE</button>
                                        </div>
                                    :
                                        <div className="subscribe-btn-div" >
                                            <button className="subscribe-btn" onClick={()=>alert("Please Login")}>SUBSCRIBE</button>
                                        </div>
                                }

                            </div>
                        </div>
                    )
                    }
                })}

                <div className="channel-navbar">
                    <p className="home">HOME</p>
                    <p className="videos">VIDEOS</p>
                    <p className="about">ABOUT</p>
                </div>

                <div className="content-body">
                    {videosNotFound?
                        <p style={{color: 'red'}}>Video not found...!</p>
                    :
                        videoData && videoData.map((data, index) => {
                            return (
                                <div className="video-card" key={data.id}>
                                    <Link to={`/watch/video/${data.id}`}>
                                        <img src={data.thumbnail} width="240px" height="125px" alt="" />
                                    </Link>
                                    <p className="title">{data.title}</p>
                                    <p className="view-date">{data.view_count} views . {timeago.format(data.upload_date)}</p>
                                </div>
                            )
                        } ) 
                    }
                </div>
                

            </div>

        </div>

    </div>
  );
}

export default ChannelView;
