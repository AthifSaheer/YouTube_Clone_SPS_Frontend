import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import classes from "../../../App.module.css";
import crBanner from "../../../image/crBanner.png";
import crLogo from "../../../image/crossroads.jpg";
import './ChannelView.css'

function ChannelView() {
    let { searchKeyword } = useParams();
    const [videoData, setVideoData] = useState([])
    const [noResultFount, setNoResultFount] = useState(false)
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/search/video/${searchKeyword}`, {
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

        <div className={classes.app__section}>
            <div style={{minWidth:'233px'}}></div>
            <img src={crBanner} width='1300px' alt="channel banner" />

            <div className="channelWrapper">
                <div className="channelLogo">
                    <img src={crLogo} alt="channel logo" />
                </div>
            </div>

        </div>

    </div>
  );
}

export default ChannelView;
