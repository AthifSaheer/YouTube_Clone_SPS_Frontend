import React from 'react'
import img from '../../../image/youtube2.jpg'

function ChannelDetailsCommentBox(props) {
    return (
        <div>
            <hr />
            <div className="main" style={{display: 'flex', marginTop:'10px' }}>
                <div className="blankDiv" style={{ width:'100px' }}>
                </div>
                <div className="channelLogoDiv" style={{ width:'100px' }}>
                    <img src={img} alt="" style={{width:'60px', borderRadius: '100%'}} />
                </div>
                <div className="ChannelTitleDiv" style={{ width:'600px', height:'300px', marginTop:'5px' }}>
                    <h4>Shareef M</h4>
                    <p style={{ fontSize:'14px' }}>5M Subscribers</p> <br />
                    <p style={{ fontSize:'18px' }}>{props.description}</p>
                </div>
                <div className="channelDescriptionDiv" style={{ BackgroundColor:'red' }}>
                    <h3 style={{ color:'red', BackgroundColor:'red', marginTop:'14px', }}>SUBSCRIBE</h3>
                </div>

                {/* SIDE VIDEOS */}
                <div style={{padding:'10px', margin:'14px', width:'500px', border: '1px solid gry', display: 'flex'}}>
                    <div className="sideVideoDiv">
                        <img src={props.thumbnail} alt="" style={{width:'140px'}} />
                    </div>
                    <div className="channelTitleDiv" style={{paddingLeft:'8px'}}>
                        <p style={{fontSize:'px'}}>{props.title}</p>
                        <h6>Shareef M</h6>
                        <h6>1M views . 1 month ago</h6>
                    </div>
                </div>

            </div>
            
            <hr />
            <br />
            <br />
            <br />
        </div>
    )
}

export default ChannelDetailsCommentBox
