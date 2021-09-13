import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {Link} from 'react-router-dom'

import img from '../../../image/crossroads.jpg'
import './ChannelSearchResult.css'

function ChannelSearchResult(props) {
    const [token, setToken] = useCookies()
    const [APIData, setAPIData] = useState()
    const [subCount, setSubCount] = useState(props.subscribers)

    let channelID = props.channelID
    let user_token = token['mytoken']? token['mytoken'] : null
    let user_channel = token['channelCookie']? token['channelCookie'] : 0
    
    const getData = {"token": user_token, "user_channel": user_channel, "which_channels": channelID, "method":"get"}
    const postData = {"token": user_token, "user_channel": user_channel, "which_channels": channelID, "method":"post"}

    const subscribeFunc = () => {
        if (user_channel == 0) {
            alert("Choose or create your channel.")
        } else {
            axios.post(`https://ytdj.athifsaheer.online/api/v1/user/subscribe/channel/`, postData)
            .then(response => {
                if (response.data.subscribed) {
                    setAPIData(response.data.subscribed)
                    setSubCount(subCount + 1)
                } else if (response.data.unsubscribed) {
                    setAPIData(response.data.unsubscribed)
                    setSubCount(subCount - 1)
                } else if (response.data.same_channel) {
                    setAPIData(response.data.same_channel)
                } else if (response.data.created_subscribed) {
                    setAPIData(response.data.created_subscribed)
                    setSubCount(subCount + 1)
                } else if (response.data.channel_does_not_exists) {
                    alert(response.data.channel_does_not_exists)
                } else if (response.data.your_own_channel) {
                    alert(response.data.your_own_channel)
                }
            })
            .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        axios.post(`https://ytdj.athifsaheer.online/api/v1/user/subscribe/channel/`, getData)
        .then(response => {
            if (response.data.subscribed) {
                setAPIData(response.data.subscribed)
            } else if (response.data.unsubscribed) {
                setAPIData(response.data.unsubscribed)
            }
        })
        .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <div className="channelSearchDiv">
                <div className="channelLogo" style={{marginLeft: '130px'}}>
                <Link to={`/channel/${props.channelID}`} style={{ textDecoration: 'none', color: 'black'}}>
                    <img src={props.logo} width='130px' height="130px" alt="" style={{borderRadius:'50%'}}/>
                    </Link>
                </div>
                <div className="channelName" >
                    <Link to={`/channel/${props.channelID}`} style={{ textDecoration: 'none', color: 'black'}}>
                        <p>{props.channelName}</p>
                    </Link>
                    <small style={{fontSize: '13px'}}>{subCount} subscribers . {props.videoCount} videos</small>
                </div>
                <div className="subscribeButtonDiv" >
                    {APIData == "subscribed" || APIData == "created_subscribed"?
                        <button className='subscribedBtn' onClick={subscribeFunc}>SUBSCRIBED</button>
                    :
                        user_token?
                            <button className='subscribeBtn' onClick={subscribeFunc} >SUBSCRIBE</button>
                    :
                            <button className='subscribeBtn' onClick={()=>alert("Please Login")} >SUBSCRIBE</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChannelSearchResult
