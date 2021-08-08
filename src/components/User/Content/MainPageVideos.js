import React from 'react';
import VideoCard from './videoCard';
import classes from './MainPageVideos.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const MainPageVideos = () => {
    const [videoData, setVideoData] = useState([])

    useEffect(() => {
        fetch('/api/v1/user/display/video/', {
            method: 'GET',
        })
        .then(responce => responce.json())
        .then(res => setVideoData(res)) // console.log(res)
    }, [])

    return(
        <div className={classes.main_page_videos}>

            { videoData && videoData.map((data, index) => {
                return(
                    <div key={index}>
                        <VideoCard 
                        id={data.id}
                        image={data.thumbnail}
                        title={data.title} 
                        channel={data.channel.channel_name}
                        channelLogo={data.channel.logo}
                        view={`${data.view_count} views-`}
                        date={data.upload_date}
                        video={data.video}
                        channelId={data.channel.id}
                        />
                    </div>
                )
            }) }
        </div>
    )
}

export default MainPageVideos;