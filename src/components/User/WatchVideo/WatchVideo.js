import {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import moment from "moment";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import Moment from 'react-moment';

import Header from "../Header/Header";
import classes from "../../../App.module.css";
import VideoDetails from "./VideoDetails"
import img from "../../../image/youtube2old.jpg"

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

    useEffect(() => {
        fetch(`/api/v1/user/watch/video/${videoID}`, {
            method: 'GET',
        })
        .then(responce => responce.json())
        .then(res => setVideoData(res))
    }, [videoLikeData, videoDislikeData])

    function videoLikeFunc() {
        if (user_token == null) {
            alert("Please login...?")
        } else if (liked_channel == 0) {
            alert("Please select or create channel...?")
        } else {
            axios.post(`/api/v1/user/like/video/`, postData)
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
            .catch(err => alert(err));
        }
    }

    function videoDislikeFunc() {
        if (user_token == null) {
            alert("Please login...?")
        } else if (liked_channel == 0) {
            alert("Please select or create channel...?")
        } else {
            axios.post(`/api/v1/user/dislike/video/`, postData)
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
            .catch(err => alert(err));
        }
    }

    useEffect(() => {
        // LIKE -----------
        axios.post(`/api/v1/user/like/video/`, getData)
        .then(response => {
            if (response.data.liked) {
                setVideoLikeData(response.data.liked)
            } else if (response.data.disliked) {
                setVideoLikeData(response.data.disliked)
            }
        })
        .catch(err => alert(err));

        // DISLIKE -----------
        axios.post(`/api/v1/user/dislike/video/`, getData)
        .then(response => {
            if (response.data.disliked_true) {
                setVideoDislikeData(response.data.disliked_true)
            } else if (response.data.disliked_false) {
                setVideoDislikeData(response.data.disliked_false)
            }
        })
        .catch(err => alert(err));
    }, [])

    function shareVideoFunc() {
        alert(window.location.href)
    }

    return (
        <div className="app">
            <Header />
            
            { videoData && videoData.map((data, index) => {
                if (data.id==videoID){
                    return(
                        <div key={index}>
                            <div className={classes.app__section}>
                                <video width="320" height="240" style={{ width:'1600px', height:'600px', backgroundColor:'black' }} autoPlay controls>
                                    <source src={data.video} type="video/mp4" />
                                </video>
                            </div>

                            <div className="main__" style={{ display:'flex', marginTop:'15px', marginBottom:'20px', padding:'4px' }}>

                                <div className="first" style={{ width:'100px' }}>
                                </div>

                                <div className="left" style={{ width:'1000px' }}>
                                    <h3>{data.title}</h3>
                                    <p>{data.view_count} views . <Moment fromNow ago>{data.upload_date}</Moment> </p>
                                    {/* {moment(data.upload_date).format("LL")} */}
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

                                    <span className="material-icons" style={{ marginLeft:'30px', fontSize:'30px', cursor: 'pointer' }} onClick={shareVideoFunc}>share</span>
                                    <span className="material-icons" style={{ marginLeft:'30px', fontSize:'30px', cursor: 'pointer' }}>more_vert</span>
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
                            />
                        </div>
                    )
                }
            })}

        </div>
      );
}

export default WatchVideo
