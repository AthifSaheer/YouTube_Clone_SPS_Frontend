import {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import {Link} from 'react-router-dom'
import { format } from 'timeago.js';

import img from "../../../image/youtube2old.jpg"

function SideVideos(props) {
    const [videoData, setVideoData] = useState([])
    let { videoID } = useParams();

    useEffect(() => {
        fetch(`/api/v1/user/watch/video/${videoID}`, {
            method: 'GET',
        })
        .then(responce => responce.json())
        .then(res => setVideoData(res))
    }, [])


    return (
        <div className="app">
            
            { videoData && videoData.map((data, index) => {
                if (data.id != props.videoID && index < 5) {
                    return(
                        <div className="side-video-div">
                            <Link to={`/watch/video/${data.id}`} style={{ textDecoration: 'none' }}>
                                <div className="side-video-img-div">
                                    <img src={data.thumbnail} alt="" />
                                </div>
                            </Link>
                            <div className="side-video-details-div">
                                <p className="title">{data.title}</p>
                                <Link to={`/channel/${props.channelId}`} style={{ textDecoration: 'none' }}>
                                    <p className="channel">{data.channel.channel_name}</p>
                                </Link>
                                <p className="view-and-date">{data.view_count} views . {format(data.upload_date)}</p>
                            </div>
                        </div>
                    )
                }
            })}

            
        </div>
      );
}

export default SideVideos





// import React from 'react'
// import img from '../../../image/youtube2.jpg'
// import './WatchVideo.css'

// function SideVideos() {
//     return (
        // <div className="side-video-div">
        //     <div className="side-video-img-div">
        //         <img src={img} alt="" />
        //     </div>
        //     <div className="side-video-details-div">
        //         <p className="title">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, nobis?</p>
        //         <p className="channel">Shareef M</p>
        //         <p className="view-and-date">1M views . 1 month ago</p>
        //     </div>
        // </div>
//     )
// }

// export default SideVideos
