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
                    <p style={{fontSize: '13px'}}>{props.viewCount} views . {props.uploadDate}</p>

                    <Link to={`/channel/${props.channelId}`} style={{ textDecoration: 'none' }}>
                        <div className="channelWarpper">
                            <div className="channelLogo">
                                <img src={props.channelLogo} alt="" width='30px' style={{borderRadius: '50%'}} />
                            </div>
                            <div className="channelName">
                                <p style={{fontSize: '13px', color: 'black'}}>{props.channel}</p>
                            </div>
                        </div>
                    </Link>

                    <p className="search-video-description">{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoSearchResult
