import React from 'react';
import VideoCard from './videoCard';
import classes from './MainPageVideos.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const MainPageVideos = (props) => {
    const [videoData, setVideoData] = useState([])

    useEffect(() => {
        axios.get('https://ytdj.athifsaheer.online/api/v1/user/display/video/')
        .then(res => {
            console.log(res)
            setVideoData(res.data)
        }) 
    }, [])

    return(
        <div className={classes.main_page_videos}>

            { videoData && videoData.map((data, index) => {
                if(data.channel.is_active) {
                    if(props.category) {
                        if (data.category == props.category) {
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
                        } else if (props.category == "All") {
                            var style = {
                                position: 'absolute',
                                margin: '0px 0px 0px -26px',
                                color: 'white',
                                backgroundColor: 'black',
                                cursor: 'pointer',
                            }
                            
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

                                    style={style}
                                    />
                                </div>
                            )
                        }
                    } else {
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
                    }
                }
            }) }
        </div>
    )
}

export default MainPageVideos;