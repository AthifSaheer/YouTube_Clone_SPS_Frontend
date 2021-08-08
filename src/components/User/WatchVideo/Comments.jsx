import React from 'react'
import './WatchVideo.css'
import img from "../../../image/youtube2old.jpg"

function Comments(props) {
    return (
        <div>
            

            <div className="video-comments-main-div">
                <div className="sid-blank-div">
                </div>
                <div className="comments-showing-div">

                    <div className="commented-user-image">
                        <img src={props.img} alt="" />
                    </div>
                    <div className="commented-user-comment">
                        <p className="user">Lite book <span className="date">6 months ago</span> </p>
                        <p className="comment">Premam,Bangalore days are the reason people started watching Malayalam cinema. Celebrating 6 years of Premam today❤️</p>

                        <span className="material-icons like">thumb_up_alt</span>
                        <span className="like-count">99</span>
                        <span className="material-icons dislike">thumb_down_alt</span>
                        <span className="replay">REPLAY</span>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Comments
