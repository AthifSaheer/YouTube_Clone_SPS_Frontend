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
    const [channelBody, setChannelBody] = useState("home")
    let { channelID } = useParams();

    // let x = token? null : alert("kl")
    let user_token = token['mytoken']? token['mytoken'] : null
    let user_channel = token['channelCookie']? token['channelCookie'] : 0
    
    const getData = {"token": user_token, "user_channel": user_channel, "which_channels": channelID, "method":"get"}
    const postData = {"token": user_token, "user_channel": user_channel, "which_channels": channelID, "method":"post"}

    
    let currentUserChannel = token['channelCookie']
    const [subCount, setSubCount] = useState(0)

    const [videoData, setVideoData] = useState([])
    const [videosNotFound, setVideosNotFound] = useState(false)

    const [channelHomevideoData, setChannelHomeVideoData] = useState([])
    const [channelHomevideoNotFount, setChannelHomeVideoNotFount] = useState([])

    const [channelData, setChannelData] = useState([])
    const [channelNotFound, setChannelNotFound] = useState(false)
    
    useEffect(() => {
        // CHANNEL --------
        axios.get(`https://ytdj.athifsaheer.online/api/v1/user/channel/${channelID}/`) // 
        // .then(res => res.json())
        .then(res => {
            console.log(res.data.subscribers);
            setChannelData(res)
            setChannelNotFound(false)
            setSubCount(res.data.subscribers)
        })
        .catch(error => {
            setChannelNotFound(true);
            setChannelData([])
        })

        // VIDEOS ------
        axios.get(`https://ytdj.athifsaheer.online/api/v1/user/channel/video/${channelID}/`)
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
            console.log(error.message)
        })

        // CHANNEL HOME VIDEOS ------
        axios.get(`https://ytdj.athifsaheer.online/api/v1/user/channel/home/${channelID}/`)
        .then(res => {
            console.log(res.data.videos_not_found);
            if (res.data.videos_not_found != undefined) {
                setChannelHomeVideoNotFount(true)
            } else {
                setChannelHomeVideoNotFount(false)
                setChannelHomeVideoData(res.data)
            }
        })
        .catch(error => {
            setChannelHomeVideoNotFount(true);
            setChannelHomeVideoData([])
            console.log(error.message)
        })

        // CHANNEL SUBSCRIBE -------
        axios.post(`https://ytdj.athifsaheer.online/api/v1/user/subscribe/channel/`, getData)
        .then(response => {
            if (response.data.subscribed) {
                setAPIData(response.data.subscribed)
            } else if (response.data.unsubscribed) {
                setAPIData(response.data.unsubscribed)
            }
        })
        .catch(err => console.log(err));

        
    }, [channelID])

    const subscribeFunc = () => {
        if (user_channel == 0) {
            alert("Choose or create your channel.")
        } else {
            axios.post(`/api/v1/user/subscribe/channel/`, postData)
            .then(response => {
                if (response.data.subscribed) {
                    setAPIData(response.data.subscribed)
                    setSubCount(subCount + 1)
                } else if (response.data.unsubscribed) {
                    setSubCount(subCount - 1)
                    setAPIData(response.data.unsubscribed)
                } else if (response.data.same_channel) {
                    setAPIData(response.data.same_channel)
                } else if (response.data.created_subscribed) {
                    setSubCount(subCount + 1)
                    setAPIData(response.data.created_subscribed)
                } else if (response.data.channel_does_not_exists) {
                    alert(response.data.channel_does_not_exists)
                } else if (response.data.your_own_channel) {
                    alert(response.data.your_own_channel)
                }
            })
            .catch(err => console.log(err));
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

            {channelNotFound?
                <p style={{color: 'red'}}>Channel not found...!</p>
            :
                Object.values(channelData).map((data, index) => {
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
                                        <span>{subCount} subscribers</span>
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

                {channelBody == "home"?
                    <div className="channel-navbar">
                        <p className="active" onClick={() => setChannelBody("home")}>HOME</p>
                        <p className="videos" onClick={() => setChannelBody("video")}>VIDEOS</p>
                        <p className="about" onClick={() => setChannelBody("about")}>ABOUT</p>
                    </div>
                :
                    channelBody == "video"?
                        <div className="channel-navbar">
                            <p className="home" onClick={() => setChannelBody("home")}>HOME</p>
                            <p className="active" onClick={() => setChannelBody("video")}>VIDEOS</p>
                            <p className="about" onClick={() => setChannelBody("about")}>ABOUT</p>
                        </div>
                    :
                        channelBody == "about"?
                            <div className="channel-navbar">
                                <p className="home" onClick={() => setChannelBody("home")}>HOME</p>
                                <p className="videos" onClick={() => setChannelBody("video")}>VIDEOS</p>
                                <p className="active" onClick={() => setChannelBody("about")}>ABOUT</p>
                            </div>
                    :
                        null
                }

                {channelBody == "home"?
                    <div className="content-body">
                        {channelHomevideoNotFount?
                            <p style={{color: 'red'}}>Video not found...!</p>
                        :
                            channelHomevideoData && channelHomevideoData.map((data, index) => {
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
                :
                    channelBody == "video"?
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
                    :
                        channelBody == "about"?
                            <div className="content-body">
                                {videosNotFound?
                                    <p style={{color: 'red'}}>About not found...!</p>
                                :
                                    // videoData && videoData.map((data, index) => {
                                    Object.values(channelData).map((data, index) => {
                                        if (index == 0) {
                                            return (
                                                <div className="about_main_div" key={data.id}>
                                                    
                                                    <div className="left_div">
                                                        <h5>About channel: {data.about}</h5>
                                                        <br />
                                                        <h6>Stats</h6>
                                                        <p>{data.video_view_count? data.video_view_count : 0} views</p>
                                                        <p>{data.subscribers} subscribers</p>
                                                        <p>{data.video_count? data.video_count : 0} videos</p>
                                                        <p>Joined {data.created_at}</p>
                                                    </div>
                                                    
                                                </div>
                                            )
                                        }
                                    } ) 
                                }
                            </div>
                    :
                        null
                }

            </div>

        </div>

    </div>
  );
}

export default ChannelView;
