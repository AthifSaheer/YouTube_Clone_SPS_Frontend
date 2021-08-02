import React from 'react'
import img from '../../../image/youtube2.jpg'
import crlogo from '../../../image/crossroads.jpg'
import './VideoSearchResult.css'
import {Link} from 'react-router-dom'

function VideoSearchResult(props) {
    return (
        <div>
            <div className="videoSearchDiv">
                <div className="thumbnail">
                    <Link to={`/watch/video/${props.id}`} style={{ textDecoration: 'none' }}>
                        <img src={props.thumbnail}  alt=""  />
                    </Link>
                </div>
                <div className="videoDetails" >
                    <p className="title">{props.title}</p>
                    <p style={{fontSize: '13px'}}>103K views . 5 days ago</p>

                    <div className="channelWarpper">
                        <div className="channelLogo">
                            <img src={props.channelLogo} alt="" width='30px' style={{borderRadius: '50%'}} />
                        </div>
                        <div className="channelName">
                            <p style={{fontSize: '13px'}}>{props.channel}</p>
                        </div>
                    </div>

                    <p style={{fontSize: '13px'}}>Most Freelance Software developers are not aware of how to price their software works. this video will help you learn how to price ...</p>
                </div>
            </div>
        </div>
    )
}

export default VideoSearchResult
