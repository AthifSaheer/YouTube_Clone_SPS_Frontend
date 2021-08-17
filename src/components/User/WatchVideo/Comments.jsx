import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {Link} from 'react-router-dom'

import './WatchVideo.css'
import img from "../../../image/youtube2old.jpg"

function Comments(props) {
    const [token, setToken] = useCookies()
    const [replyApiData, setReplyApiData] = useState([])
    const [replyApiError, setReplyApiError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const [reply, setReply] = useState("")
    const [replyInput, setReplyInput] = useState(false)
    const [replayHidden, setReplayHidden] = useState(false)

    let videoID = props.videoID
    let user_token = token['mytoken']? token['mytoken'] : null
    let user_channel = token['channelCookie']? token['channelCookie'] : 0
    let commentID = props.commentID
    
    const replyDataGet = {"reply_received_video": videoID, "received_parent_comment": commentID, "method": "get"}
    const replyDataPost = {"token": user_token, "reply_received_channel": props.channelID, "reply_received_video": videoID, "replied_channel": user_channel, "received_parent_comment": commentID, "reply": reply, "method": "post"}
    
    function replyInpuOpenFunc() {
        // var t  = document.getElementsByClassName("reply-main-div")
        // t.style.css.display = "block"
        setReplyInput(true)
        // setStyle({display: "block"})
    }
    function replyInputCloseFunc() {
        setReplyInput(false)
        // setStyle({display: "none"})
    }
    function showReplayFunc() {
        setReplayHidden(true)
    }
    function hideReplayFunc() {
        setReplayHidden(false)
    }
    const replySubmitFunc = () => {
        if (!user_token) {
            alert("Please login!")
        } else if (!user_channel) {
            alert("Please select or create channel.")
        } else if (reply != "") {
            // POST REPLY COMMENTS ----------------
            axios.post(`/api/v1/user/add/replay/`, replyDataPost)
            .then(response => {
                setReply("")
                setReplyInput(false)
            })
            .catch(error => console.log(error))

            // RERENDER REPLY COMMENTS ----------------
            setTimeout(function() {
                axios.post(`/api/v1/user/add/replay/`, replyDataGet)
                .then(response => {
                    console.log(response.data);
                    setReplyApiData(response.data)
                }).catch(err => {setReplyApiError(true)})
            }, 1000)
        } else if (reply == "") {
            console.log("Reply value empty.");
        }
    }

    useEffect(() => {
        axios.post(`/api/v1/user/add/replay/`, replyDataGet)
        .then(response => {
            if (response.data[0].no_comments == "no_comments") {
                setReplayHidden(true)
            } else {
                console.log(response.data);
                setReplyApiData(response.data)
            }
        }).catch(err => {setReplyApiError(true)})
    }, [])

    return (
        <div id="mainsection">

            <div className="video-comments-main-div">
                <div className="sid-blank-div">
                </div>
                <div className="comments-showing-div">
                    {props.error?
                        <p className="comment" style={{color: 'gray'}}>{props.error}</p>
                    :
                        props.noComment?
                            <p className="comment" style={{color: 'gray'}}>{props.noComment}</p>
                        :
                            <div id="">
                                <div className="comments-showing-inner-div">
                                    <div className="commented-user-image">
                                        <img src={props.commentedChannelLogo} alt="" />
                                    </div>
                                    <div className="commented-user-comment">
                                        <p className="user"> {props.commentedChannel} <span className="date">{props.uploadDate}</span> </p>
                                        <p className="comment">{props.comment}</p>
                                        <span className="material-icons like">thumb_up_alt</span>
                                        <span className="like-count">99</span>
                                        <span className="material-icons dislike">thumb_down_alt</span>
                                        <span className="replay" onClick={replyInpuOpenFunc}>REPLY</span>
                                    </div>
                                </div>

                                {replyInput?
                                    <div className="comments-posting-div reply-main-div" >

                                        <div className="comments-posting-inner-div reply-inner-div">
                                            <input type="text" placeholder="Add a public reply..." value={reply} onChange={e => setReply(e.target.value)} />
                                        </div>

                                        <div className="comments-posting-inner-div-buttons reply-inner-div-buttons">
                                            <button className="cancle-btn" value="" onClick={replyInputCloseFunc}>CANCLE</button>
                                            <button className="submit-btn" onClick={replySubmitFunc} >REPLY</button>
                                        </div>

                                    </div>
                                :
                                    null
                                } 
                                
                                {replayHidden == false?
                                    <p className="show-reply" onClick={showReplayFunc}>View all reply</p>
                                :
                                    replyApiError == false?
                                        replyApiData && replyApiData.map((val, index) => {
                                            return (
                                                <div>
                                                    {index == 0?
                                                        <p className="show-reply" onClick={hideReplayFunc}>Hide reply</p>
                                                    :
                                                        null
                                                    }
                                                    <div className="comments-showing-inner-div reply-showing-inner-div">
                                                        <div className="commented-user-image">
                                                            <img src={val.replied_channel.logo} alt="" />
                                                        </div>
                                                        <div className="commented-user-comment">
                                                            <p className="user"> {val.replied_channel.channel_name} <span className="date">{val.created_at}</span> </p>
                                                            <p className="comment">{val.reply}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    :
                                        <p style={{color: 'gray', margin: '5px 0px 80px 102px'}}>Error occured!</p>
                                }

                            </div>
                            
                    }

                </div>
            </div>

        </div>
    )
}

export default Comments

// {
//     "id": 1,
//     "replied_channel": {
//         "id": 3,
//         "user": 3,
//         "about": "about new channel",
//         "created_at": "07 08 2021",
//         "channel_name": "Debug media",
//         "token": "1a1df72c4bca906ac794615c8d48f0159beececb",
//         "logo": "/media/logo/Debug%20media/1.jpg",
//         "subscribers": 0,
//         "banner": "/media/logo/M4%20Tech/1432_sXQ2GEL.jpg",
//         "is_active": true,
//         "video_count": null
//     },
//     "reply": "hjk",
//     "created_at": "11 08 2021",
//     "token": "1a1df72c4bca906ac794615c8d48f0159beececb",
//     "user": 3,
//     "reply_received_channel": 1,
//     "reply_received_video": 1,
//     "received_parent_comment": 21
// }
// var x = 