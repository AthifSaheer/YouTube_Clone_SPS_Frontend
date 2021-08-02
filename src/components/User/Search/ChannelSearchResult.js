import React from 'react'
import img from '../../../image/crossroads.jpg'
import './ChannelSearchResult.css'

function ChannelSearchResult() {
    return (
        <div>
            <div className="channelSearchDiv">
                <div className="channelLogo" style={{marginLeft: '130px'}}>
                    <img src={img} width='130px'  alt="" style={{borderRadius:'50%'}}/>
                </div>
                <div className="channelName" >
                    <p>Crossroads</p>
                    <small style={{fontSize: '13px'}}>103K subscribers . 123 videos</small>
                </div>
                <div className="subscribeButtonDiv" >
                    <button className='subscribeBtn' >SUBSCRIBE</button>
                    {/* <button className='subscribedBtn'>SUBSCRIBED</button> */}
                    {/* <span className="material-icons">notifications_active_icon</span> */}
                </div>
            </div>
        </div>
    )
}

export default ChannelSearchResult
