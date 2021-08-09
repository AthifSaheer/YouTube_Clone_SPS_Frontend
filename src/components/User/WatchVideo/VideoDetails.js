import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {Link} from 'react-router-dom'

import './WatchVideo.css'
import SideVideos from './SideVideos'
import Comments from './Comments'

function VideoDetails(props) {
    const [token, setToken] = useCookies()
    const [APIData, setAPIData] = useState()

    let channelID = props.channelId
    let user_token = token['mytoken']? token['mytoken'] : null
    let user_channel = token['channelCookie']? token['channelCookie'] : 0
    
    const getData = {"token": user_token, "user_channel": user_channel, "which_channels": channelID, "method":"get"}
    const postData = {"token": user_token, "user_channel": user_channel, "which_channels": channelID, "method":"post"}

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

    useEffect(() => {
        axios.post(`/api/v1/user/subscribe/channel/`, getData)
        .then(response => {
            if (response.data.subscribed) {
                setAPIData(response.data.subscribed)
            } else if (response.data.unsubscribed) {
                setAPIData(response.data.unsubscribed)
            }
        })
        .catch(err => alert(err));
    }, [])
    
    return (
        <div>
            <div className="video-detilas-main-div">
                <div className="sid-blank-div">
                </div>
                <div className="channel-logo-div">
                    <img src={props.channelLogo} alt="" />
                </div>
                <div className="channel-title-div">
                    <Link to={`/channel/${props.channelId}`} style={{ textDecoration: 'none', color: 'black'}}>
                        <p>{props.channelName}</p>
                    </Link>
                    <p className="sub-count">{props.subscribers} Subscribers</p> <br />
                    <p className="description">{props.description}</p>
                </div>

                {APIData == "subscribed" || APIData == "created_subscribed"?
                    <div className="channel-subscribed-btn-div" >
                        <button onClick={subscribeFunc}>SUBSCRIBED</button>
                    </div>
                :
                    user_token?
                        <div className="channel-subscribe-btn-div" >
                            <button onClick={subscribeFunc}>SUBSCRIBE</button>
                        </div>
                    :
                        <div className="channel-subscribe-btn-div" >
                            <button onClick={()=>alert("Please Login")}>SUBSCRIBE</button>
                        </div>
                }
                
                <div>
                    <SideVideos 
                    category={props.category}
                    videoID={props.videoID}
                    channelId={props.channelId}
                    />
                </div>

            </div>
            
            <br />
            <hr className="middle-hr" />


            {/* ====== COMMENT SUBMIT DIV ====== */}
            <div className="video-comments-main-div">
                <div className="sid-blank-div">
                </div>
                <div className="comments-posting-div">
                    <p>1,232 Comments</p>

                    <div className="comments-posting-inner-div">
                        <img src={props.channelLogo} alt="" />
                        <input type="text" placeholder="Add a public comment..." />
                    </div>

                    <div className="comments-posting-inner-div-buttons">
                        <button className="cancle-btn">CANCLE</button>
                        <button className="submit-btn">COMMENT</button>
                    </div>

                </div>
            </div>

            {/* ====== COMMENT SHOWING DIV ====== */}
            <Comments img={props.channelLogo} />
            <Comments img={props.channelLogo} />
            <Comments img={props.channelLogo} />

        </div>
    )
}

export default VideoDetails
