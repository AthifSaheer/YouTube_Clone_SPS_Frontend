import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import { Link } from "react-router-dom";
import axios from 'axios';

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import './Channel.css'
import chnlLogo from '../../../image/crossroads.jpg'

function Channels() {
    const [channelsAPI, setChannelsAPI] = useState([])
    const [ApiError, setApiError] = useState(false)
    const [channelCookie, setChannelCookie] = useCookies()
    const getChannelCookieID = channelCookie['channelCookie']

    // SESSION HANDLE 
    const [token, setToken] = useCookies(['mytoken'])
    const history = useHistory()
    // alert(token['mytoken'])

    // SESSION HANDLE -----
    useEffect(() => {
        if(!token['mytoken']) {
            history.push('/login')
        }
    }, [token]);

    useEffect(() => {
        axios.get(`https://ytdj.athifsaheer.online/api/v1/studio/channels/${token['mytoken']}/`)
        .then(res => {setChannelsAPI(res.data)})
        .catch(res => setApiError(true))
    }, [])

    function channelCookieAdd(id) {
        setChannelCookie("channelCookie", id)
        // history.push('/')
    }

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />
                <h3>Your Channels</h3>
            </div>

            {ApiError?
                <div className={classes.app__section}>
                    <div className="sidebar-space-div"></div>
                    <p style={{color: 'red', marginTop: '10px'}}>Error Accrued</p>
                </div>
            :
                <div className={classes.app__section}>
                
                    <div className="sidebar-space-div"></div>
                
                    <div className="studio-channel-main-div">
                        
                        <div className="studio-create-channel-card">
                            <div className="create-channel-icon">
                            <span className="material-icons">add</span>
                            </div>
                            <Link to="/studio/create/channel" style={{textDecoration: 'none' }}>
                                <div className="create-channel-card-text">
                                    <p>Create Channel</p>
                                </div>
                            </Link>
                        </div>

                        {channelsAPI.map((data, index) => {
                            // for (let i = 0; i < index; i++){
                            return(
                                <div className="studio-channel-card" key={index+1}
                                    onClick={() => channelCookieAdd(data.id)}>
                                    <div className="channel-card-img">
                                        <img src={data.logo} alt="channel logo" />
                                    </div>
                                    <div className="channel-card-text">
                                        <p>{data.channel_name}</p>
                                        <span>{data.subscribers} Subscribers</span>
                                    </div>

                                    {getChannelCookieID == data.id?
                                        <div className="channel-card-tick-icon">
                                            <span className="material-icons">done</span>
                                        </div>
                                    :
                                        null
                                    }

                                </div>
                            )
                            // }
                        })
                        }

                    </div>
                </div>
            }
        </div>
    )
}

export default Channels
