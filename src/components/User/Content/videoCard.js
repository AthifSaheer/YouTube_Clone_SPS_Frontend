import React, {useState, useEffect} from "react";
import classes from "./VideoCard.module.css";
import {Link} from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';
import * as timeago from 'timeago.js';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const VideoCard = (props) => {
  const [token, setToken] = useCookies('')
  const [APIWatchLater, setAPIWatchLater] = useState([])
  
  let user_token = token['mytoken']? token['mytoken'] : null
  let user_channel = token['channelCookie']? token['channelCookie'] : 0
  let watch_later_video = props.id
  
  const getData = {"token": user_token, "applied_channel": user_channel, "watch_later_video": watch_later_video, "method":"get"}
  const postData = {"token": user_token, "applied_channel": user_channel, "watch_later_video": watch_later_video, "method":"post"}

  function watchLaterFunc() {
    if (!user_token) {
      alert('Please login!')
    } else if (!user_channel) {
      alert('Please select or create your channel!')
    } else {
      axios.post(`https://ytdj.athifsaheer.online/api/v1/user/watch/later/${user_channel}/`, postData)
      .then(response => {
          if (response.data.watch_later_applied) {
              setAPIWatchLater(response.data.watch_later_applied)
          } else if (response.data.watch_later_disapplied) {
              setAPIWatchLater(response.data.watch_later_disapplied)
          } else if (response.data.created_watch_later_applied) {
              setAPIWatchLater(response.data.created_watch_later_applied)
          }
      })
      .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    axios.post(`https://ytdj.athifsaheer.online/api/v1/user/watch/later/${user_channel}/`, getData)
    .then(response => {
        if (response.data.watch_later_applied) {
            setAPIWatchLater(response.data.watch_later_applied)
        } else if (response.data.watch_later_disapplied) {
            setAPIWatchLater(response.data.watch_later_disapplied)
        }
    })
    .catch(err => console.log(err));
  }, [])
let node = "2016-06-30 09:20:00"
  return (
    <div className={classes.video_card} >
        <Link to={`/watch/video/${props.id}`} style={{ textDecoration: 'none' }}>
          <div className={classes.video_card__image}>
            <img src={props.image} alt="video thumbnail" /> {/*  onMouseOver={(e) => document.getElementById('watch-later-icon').style.display = 'block'} onMouseOut={() => document.getElementById('watch-later-icon').style.display = 'none'} */}
          </div>
        </Link>
        
        {/* <span className="material-icons" key={props.id} id="watch-later-icon" style={props.style}>watch_later</span> */}
        
      <div className={classes.video_card__content}>
        <div className={classes.video_card__channelpicture}>
          <img src={props.channelLogo} alt="Channel logo" width='21px' height="21px" style={{borderRadius:'50%'}} />
        </div>
        <div className={classes.video_card_info} style={{ width: '100%' }}>
          <span className={classes.video_card__title}>{props.title}</span>
          
          <Link to={`/channel/${props.channelId}`} style={{ textDecoration: 'none' }}>
            <span className={classes.video_card__channelname}>{props.channel}</span>
          
          </Link>
          <span className={classes.video_card__view}>{props.view}</span>
          <span className={classes.video_card__date}>{timeago.format(props.date, 'en_US')}</span>
          
          

        </div>

        <div className={classes.video_card_info}>
          <Popup trigger={<span className="material-icons" style={{cursor: 'pointer'}} >more_vert</span>} position="right center">
              {APIWatchLater == 'watch_later_applied' || APIWatchLater == 'created_watch_later_applied'?
                <div className={classes.watch_later_div_active} onClick={watchLaterFunc}>
                  <span className="material-icons">done</span>
                  <p>ADDED</p> 
              </div>
            :
              <div className={classes.watch_later_div} onClick={watchLaterFunc}>
                <span className="material-icons">watch_later</span>
                <p>WATCH LATER</p> 
              </div>
            }
          </Popup>
        </div>


      </div>
    </div>
  );
};

export default VideoCard;
