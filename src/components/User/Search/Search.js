import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import ChannelSearchResult from "./ChannelSearchResult";
import VideoSearchResult from "./VideoSearchResult";
import classes from "../../../App.module.css";
import noResultFountIMG from "../../../image/noRsltPage.png";

function Search() {
    let { searchKeyword } = useParams();
    const [videoData, setVideoData] = useState([])
    const [noResultFount, setNoResultFount] = useState(false)
    
    useEffect(() => {
        fetch(`/api/v1/user/search/video/${searchKeyword}`, {
            method: 'GET',
        })
        .then(responce => responce.json())
        .then(res => {
            setVideoData(res)
            setNoResultFount(false)
        })
        .catch(error => {
            setNoResultFount(true);
            setVideoData([])
        })
    }, [searchKeyword])

  return (
    <div className="app">
        <Header />
        <div className={classes.app__section}>
            <Sidebar />
        </div>

        {/* ----------------- CHANNEL VIEW ----------------- */}
        {/* <div className={classes.app__section}>
            <div style={{minWidth:'233px'}}></div>
            <ChannelSearchResult />
        </div> */}

        {/* ----------------- HR ----------------- */}
        {/* <div className={classes.app__section}>
            <div style={{minWidth:'233px'}}></div>
            <hr style={{width: '1270px'}} />
        </div> */}

        {/* ----------------- VIDEO VIEW ----------------- */}
        { videoData && videoData.map((data, index) => {
            return(
                <div className={classes.app__section} key={data.id}>
                    <div style={{minWidth:'233px'}}></div>
                    <VideoSearchResult
                    id={data.id} 
                    title={data.title}
                    thumbnail={data.thumbnail}
                    channel={data.channel.channel_name}
                    channelLogo={data.channel.logo} 
                    channelLogo={data.channel.logo} 
                    channelId={data.channel.id}
                    />
                </div>
            )
        })}

        {noResultFount?
            <div className={classes.app__section}>
                <div style={{minWidth:'233px'}}></div>
                <img src={noResultFountIMG} alt="he" 
                style={{display: 'block', marginLeft: '340px', marginRight: 'auto', width: '500px', marginTop: '80px'}} />
            </div>
        :
            null
        }

    </div>
  );
}

export default Search;
