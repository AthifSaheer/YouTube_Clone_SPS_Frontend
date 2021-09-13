import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { format } from 'timeago.js';
import Popup from 'reactjs-popup';
import ReactPlayer from 'react-player'

import Header from "../Header/Header";
import classes from "../../../App.module.css";
import VideoDetails from "./VideoDetails"


function WatchVideo() {
    const [token, setToken] = useCookies()
    const [videoLikeData, setVideoLikeData] = useState()
    const [videoDislikeData, setVideoDislikeData] = useState()

    const [videoData, setVideoData] = useState([])
    let { videoID } = useParams();
    

    let user_token = token['mytoken']? token['mytoken'] : null
    let liked_channel = token['channelCookie']? token['channelCookie'] : 0

    const getData = {"token": user_token, "liked_channel": liked_channel, "liked_video": videoID, "method":"get"}
    const postData = {"token": user_token, "liked_channel": liked_channel, "liked_video": videoID, "method":"post"}

    function watchVideoFunc() {
        fetch(`https://ytdj.athifsaheer.online/api/v1/user/watch/video/${videoID}/`, {
            method: 'GET',
        })
        .then(responce => responce.json())
        .then(res => setVideoData(res))
    }

    useEffect(() => {
        watchVideoFunc()
    }, [videoLikeData, videoDislikeData])

    function videoLikeFunc() {
        if (user_token == null) {
            alert("Please login...?")
        } else if (liked_channel == 0) {
            alert("Please select or create channel...?")
        } else {
            axios.post(`https://ytdj.athifsaheer.online/api/v1/user/like/video/`, postData)
            .then(response => {
                if (response.data.liked && response.data.disliked_false) {
                    setVideoLikeData(response.data.liked)
                    setVideoDislikeData(response.data.disliked_false)
                } else if (response.data.liked) {
                    setVideoLikeData(response.data.liked)
                } else if (response.data.disliked) {
                    setVideoLikeData(response.data.disliked)
                } else if (response.data.created_liked) {
                    setVideoLikeData(response.data.created_liked)
                } else if (response.data.invalid_request) {
                    alert(response.data.invalid_request)
                }
            })
            .catch(err => console.log(err));
        }
    }

    function videoDislikeFunc() {
        if (user_token == null) {
            alert("Please login...?")
        } else if (liked_channel == 0) {
            alert("Please select or create channel...?")
        } else {
            axios.post(`https://ytdj.athifsaheer.online/api/v1/user/dislike/video/`, postData)
            .then(response => {
                if (response.data.disliked_true && response.data.disliked) {
                    setVideoLikeData(response.data.disliked)
                    setVideoDislikeData(response.data.disliked_true)
                } else if (response.data.disliked_true) {
                    setVideoDislikeData(response.data.disliked_true)
                } else if (response.data.disliked_false) {
                    setVideoDislikeData(response.data.disliked_false)
                } else if (response.data.created_disliked_true) {
                    setVideoDislikeData(response.data.created_disliked_true)
                } else if (response.data.invalid_request) {
                    alert(response.data.invalid_request)
                }
            })
            .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        // LIKE -----------
        axios.post(`https://ytdj.athifsaheer.online/api/v1/user/like/video/`, getData)
        .then(response => {
            if (response.data.liked) {
                setVideoLikeData(response.data.liked)
            } else if (response.data.disliked) {
                setVideoLikeData(response.data.disliked)
            }
        })
        .catch(err => console.log(err));

        // DISLIKE -----------
        axios.post(`https://ytdj.athifsaheer.online/api/v1/user/dislike/video/`, getData)
        .then(response => {
            if (response.data.disliked_true) {
                setVideoDislikeData(response.data.disliked_true)
            } else if (response.data.disliked_false) {
                setVideoDislikeData(response.data.disliked_false)
            }
        })
        .catch(err => console.log(err));
    }, [])

    
    function videoViewCountFunc(e) {
        console.log(e.target.currentTime)
        var currentTime = e.target.currentTime;
        if (currentTime > 5 && currentTime < 5.5) {
            axios.get(`https://ytdj.athifsaheer.online/api/v1/user/update/video/count/${videoID}/`)
            watchVideoFunc()
        }
    }

    function videoShareLinkCopy() {
        var copyText = document.getElementById("shareLink");
        var copyBtn = document.getElementsByClassName("copy_btn")[0];
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        copyBtn.innerText = "COPIED"
    }
    
    // export const countPlusFunc = () => {
    //     setSubCountRerender(subCountRerender + 1)
    // }

    
    
    return (
        <div className="">
            <Header />
            
            { videoData && videoData.map((data, index) => {
                if (data.id==videoID){
                    return(
                        <div key={index}>
                            <div className={classes.app__section}>
                                <video className="video" autoPlay controls onTimeUpdate={(e) => videoViewCountFunc(e)} >
                                    <source src={data.video} type="video/mp4" />
                                </video>
                                {/* <ReactPlayer url={data.video} playing controls onTimeUpdate={(e) => videoViewCountFunc(e)} /> */}
                                {/* .split('?')[0] */}
                            </div>

                            <div className="main__">

                                <div className="first"></div>

                                <div className="left">
                                    <h3>{data.title}</h3>
                                    <p>{data.view_count} views . {format(data.upload_date)} </p>
                                </div>

                                <div className="right">
                                    {videoLikeData == "liked" || videoLikeData == "created_liked"?
                                        <div className="like-section-active">
                                            <span className="material-icons like-icon-active" style={{ color:'#065fd4', cursor: 'pointer' }} onClick={videoLikeFunc}>thumb_up_alt </span>
                                            <span className="like-count-active">{data.like}</span>
                                        </div>
                                    :
                                        <div className="like-section">
                                            <span className="material-icons like-icon" onClick={videoLikeFunc} style={{ cursor: 'pointer' }}>thumb_up_alt</span>
                                            <span className="like-count">{data.like}</span>
                                        </div>
                                    } 
                                    
                                    {videoDislikeData == "disliked_true" || videoDislikeData == "created_disliked_true"?
                                        <div className="like-section-active">
                                            <span className="material-icons like-icon-active" style={{ color:'#065fd4', cursor: 'pointer' }} onClick={videoDislikeFunc}>thumb_down_alt </span>
                                            <span className="like-count-active">{data.dislike}</span>
                                        </div>
                                    :
                                        <div className="like-section">
                                            <span className="material-icons like-icon" onClick={videoDislikeFunc} style={{ cursor: 'pointer' }}>thumb_down_alt</span>
                                            <span className="like-count">{data.dislike}</span>
                                        </div>
                                    }

                                    <Popup trigger={<span className="material-icons" style={{ marginLeft:'30px', fontSize:'30px', cursor: 'pointer' }}>share</span>} position="left" >
                                        <input  type="text" value={(window.location.href)} id="shareLink" className="share_link"></input>
                                        <button class="copy_btn" onClick={videoShareLinkCopy}>COPY</button>
                                    </Popup>
                                    
                                </div>

                            </div>
                            <hr />
                                <VideoDetails 
                                videoID={data.id}
                                title={data.title}
                                description={data.description}
                                channelLogo={data.channel.logo}
                                channelName={data.channel.channel_name}
                                subscribers={data.channel.subscribers}
                                category={data.category}
                                channelId={data.channel.id}
                                commentVisibility={data.comment_visibility}
                                />
                        </div>
                    )
                }
            })}

        </div>
      );
}

export default WatchVideo;