import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useCookies} from 'react-cookie';
import * as timeago from 'timeago.js';

import './WatchVideo.css'

function Comments(props) {
    const [token, setToken] = useCookies()
    const [replyApiData, setReplyApiData] = useState([])
    const [replyApiError, setReplyApiError] = useState(false)
    
    const [reply, setReply] = useState("")
    const [replyInput, setReplyInput] = useState(false)
    const [replayHidden, setReplayHidden] = useState(false)
    
    // const [commentLike, setCommentLike] = useState(false)
    const [commentLikeData, setCommentLikeData] = useState(false)
    const [commentDislikeData, setCommentDislikeData] = useState(false)
    
    const [tog, settog] = useState(false)

    let videoID = props.videoID? props.videoID : 0
    let user_token = token['mytoken']? token['mytoken'] : null
    let user_channel = token['channelCookie']? token['channelCookie'] : 0
    let commentID = props.commentID? props.commentID : 0
    
    const replyDataGet = {"reply_received_video": videoID, "received_parent_comment": commentID, "method": "get"}
    const replyDataPost = {"token": user_token, "reply_received_channel": props.channelID, "reply_received_video": videoID, "replied_channel": user_channel, "received_parent_comment": commentID, "reply": reply, "method": "post"}
    
    const commentLikeDataPost = {"token": user_token, "comment_liked_channel": user_channel, "which_comment_like": commentID, "method": "post"}
    const commentLikeDataGet = {"token": user_token, "comment_liked_channel": user_channel, "which_comment_like": commentID, "method": "get"}
    
    const commentDislikeDataPost = {"token": user_token, "comment_disliked_channel": user_channel, "which_comment_dislike": commentID, "method": "post"}
    const commentDislikeDataGet = {"token": user_token, "comment_disliked_channel": user_channel, "which_comment_dislike": commentID, "method": "get"}
    
    const commentDataGet = {"received_video": props.videoID_, "method": "get"}
    const [commentCountGettingData, setCommentCountGettingData] = useState([])
    
    function replyInpuOpenFunc() {
        setReplyInput(true)
    }
    function replyInputCloseFunc() {
        setReplyInput(false)
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

    function commentLikeFunc() {
        if (user_token == null) {
            alert("Please login...?")
        } else if (user_channel == 0) {
            alert("Please select or create channel...?")
        } else {
            axios.post(`/api/v1/user/like/comment/`, commentLikeDataPost)
            .then(response => {
                console.log(response.data.comment_liked);

                if (response.data.comment_liked && response.data.disliked_false) {
                    setCommentLikeData(response.data.comment_liked)
                    setCommentDislikeData(response.data.disliked_false)
                } 
                else if (response.data.comment_liked) {
                    setCommentLikeData(response.data.comment_liked)
                } 
                else if (response.data.comment_disliked) {
                    setCommentLikeData(response.data.comment_disliked)
                } 
                else if (response.data.comment_created_liked) {
                    setCommentLikeData(response.data.comment_created_liked)
                } 
                else if (response.data.invalid_request) {
                    alert(response.data.invalid_request)
                }
            })
            .catch(err => alert(err));
        }        
    }

    function commentDislikeFunc() {
        if (user_token == null) {
            alert("Please login...?")
        } else if (user_channel == 0) {
            alert("Please select or create channel...?")
        } else {
            axios.post(`/api/v1/user/dislike/comment/`, commentDislikeDataPost)
            .then(response => {
                if (response.data.disliked_true && response.data.disliked) {
                    setCommentLikeData(response.data.comment_disliked)
                    setCommentDislikeData(response.data.disliked_true)
                }
                else if (response.data.disliked_true) {
                    setCommentDislikeData(response.data.disliked_true)
                }
                else if (response.data.disliked_false) {
                    setCommentDislikeData(response.data.disliked_false)
                }
                else if (response.data.created_disliked_true) {
                    setCommentDislikeData(response.data.created_disliked_true)
                }
                else if (response.data.invalid_request) {
                    alert(response.data.invalid_request)
                }
            })
            .catch(err => alert(err));
        }        
    }

    useEffect(() => {
        axios.post(`/api/v1/user/add/replay/`, replyDataGet)
        .then(response => {
            if (response.data[0].no_comments == "no_comments") {
                setReplayHidden(true)
            } else {
                setReplyApiData(response.data)
            }
        }).catch(err => {setReplyApiError(true)})

        // COMMENT LIKE -----------
        axios.post(`/api/v1/user/like/comment/`, commentLikeDataGet)
        .then(response => {
            if (response.data.comment_liked) {
                setCommentLikeData(response.data.comment_liked)
            } else if (response.data.comment_disliked) {
                setCommentLikeData(response.data.comment_disliked)
            }
        })
        .catch(err => alert(err));

        // COMMENT DISLIKE -----------
        axios.post(`/api/v1/user/dislike/comment/`, commentDislikeDataGet)
        .then(response => {
            if (response.data.disliked_true) {
                setCommentDislikeData(response.data.disliked_true)
            } else if (response.data.disliked_false) {
                setCommentDislikeData(response.data.disliked_false)
            }
        })
        .catch(err => alert(err));

    }, [])


    // COMMENT LIKE & DISLIKE COUNT FETCHING DATA (only this purpose) -----------
    function commentLikeManageFunc() {
        axios.post(`/api/v1/user/add/comment/`, commentDataGet)
        .then(response => {
            setCommentCountGettingData(response.data)
        }).catch(err => console.log("error from - user/comment.jsx line:172", err))
    }
    // COMMENT LIKE & DISLIKE COUNT FETCHING DATA (only this purpose) -----------
    useEffect(() => {
        axios.post(`/api/v1/user/add/comment/`, commentDataGet)
        .then(response => {
            setCommentCountGettingData(response.data)
        }).catch(err => console.log("error from - user/comment.jsx line:172", err))
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
                            <div>
                                {commentCountGettingData && commentCountGettingData.map((data, index) => {
                                    if (data.id == commentID) {
                                    return (
                                    <div className="comments-showing-inner-div">
                                        <div className="commented-user-image">
                                            <img src={props.commentedChannelLogo} alt="" />
                                        </div>
                                        <div className="commented-user-comment">
                                        
                                            <p className="user"> {props.commentedChannel} <span className="date">{timeago.format(props.uploadDate)}</span> </p>
                                            <p className="comment">{props.comment}</p>
                                            
                                            <div className="cmnt-dis_like-main-div">
                                                {commentLikeData == "comment_liked" || commentLikeData == "comment_created_liked"?
                                                    <div>
                                                        <span className="material-icons comment-like-active" onClick={commentLikeManageFunc} style={{ color:'#065fd4', cursor: 'pointer' }} onClick={commentLikeFunc}>thumb_up_alt </span>
                                                        <span className="comment-like-count">{data.like}</span>
                                                    </div>
                                                :
                                                    <div>
                                                        <span className="material-icons comment-like" onClick={commentLikeFunc} style={{ cursor: 'pointer' }}>thumb_up_alt</span>
                                                        <span className="comment-like-count">{data.like}</span>
                                                    </div>
                                                }
                                                
                                                {commentDislikeData == "disliked_true" || commentDislikeData == "created_disliked_true"?
                                                    <div>
                                                        <span className="material-icons comment-dislike-active" onClick={commentDislikeFunc}  style={{ cursor: 'pointer' }}>thumb_down_alt</span>
                                                    </div>
                                                :
                                                    <div>
                                                        <span className="material-icons comment-dislike" onClick={commentDislikeFunc}  style={{ cursor: 'pointer' }}>thumb_down_alt</span>
                                                    </div>
                                                }

                                            <span className="replay" onClick={replyInpuOpenFunc} style={{ cursor: 'pointer' }}>REPLY</span>

                                            </div>

                                        </div>
                                    </div>
                                    )}
                                })}

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
                                                            <img src={val.replied_channel.logo? val.replied_channel.logo : 0} alt="" />
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