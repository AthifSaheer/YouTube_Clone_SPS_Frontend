import {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import moment from "moment";

import Header from "../Header/Header";
import classes from "../../../App.module.css";
import VideoDetails from "./VideoDetails"
import img from "../../../image/youtube2old.jpg"

function WatchVideo() {
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
                                    <p>{data.view_count} views .  {moment(data.upload_date).format("LL")} </p>
                                </div>

                                <div className="right">
                                    <span className="material-icons" style={{ marginLeft:'30px', fontSize:'30px' }}>thumb_up_alt</span>
                                    <span className="material-icons" style={{ marginLeft:'30px', fontSize:'30px' }}>thumb_down_alt</span>
                                    <span className="material-icons" style={{ marginLeft:'30px', fontSize:'30px' }}>share</span>
                                    <span className="material-icons" style={{ marginLeft:'30px', fontSize:'30px' }}>more_vert</span>
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
