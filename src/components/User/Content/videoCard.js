import React, {useState, useEffect} from "react";
import classes from "./VideoCard.module.css";
import image from "../../../image/youtube2.jpg";
import {Link} from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

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
      axios.post(`/api/v1/user/watch/later/${user_channel}/`, postData)
      .then(response => {
          if (response.data.watch_later_applied) {
              setAPIWatchLater(response.data.watch_later_applied)
          } else if (response.data.watch_later_disapplied) {
              setAPIWatchLater(response.data.watch_later_disapplied)
          } else if (response.data.created_watch_later_applied) {
              setAPIWatchLater(response.data.created_watch_later_applied)
          } 
          // else if (response.data.channel_does_not_exists) {
          //     alert(response.data.channel_does_not_exists)
          // } 
      })
      .catch(err => alert(err));
    }
  }

  useEffect(() => {
    axios.post(`/api/v1/user/watch/later/${user_channel}/`, getData)
    .then(response => {
        if (response.data.watch_later_applied) {
            setAPIWatchLater(response.data.watch_later_applied)
        } else if (response.data.watch_later_disapplied) {
            setAPIWatchLater(response.data.watch_later_disapplied)
        }
    })
    .catch(err => alert(err));
  }, [])

  return (
    <div className={classes.video_card} >
        <Link to={`/watch/video/${props.id}`} style={{ textDecoration: 'none' }}>
          <div className={classes.video_card__image}>
            <img src={props.image} alt="video thumbnail" onMouseOver={(e) => document.getElementById('watch-later-icon').style.display = 'block'} onMouseOut={() => document.getElementById('watch-later-icon').style.display = 'none'} />
          </div>
        </Link>
        
        <span className="material-icons" onClick={watchLaterFunc} key={props.id} id="watch-later-icon" style={props.style}>watch_later</span>
        
      <div className={classes.video_card__content}>
        <div className={classes.video_card__channelpicture}>
          <img src={props.channelLogo} alt="Channel logo" width='20px' style={{borderRadius:'50%'}} />
        </div>
        <div className={classes.video_card_info}>
          <span className={classes.video_card__title}>{props.title}</span>
          
          <Link to={`/channel/${props.channelId}`} style={{ textDecoration: 'none' }}>
            <span className={classes.video_card__channelname}>{props.channel}</span>
          
          </Link>
          <span className={classes.video_card__view}>{props.view}</span>
          <span className={classes.video_card__date}>{props.date}</span>
          {APIWatchLater == 'watch_later_applied' || APIWatchLater == 'created_watch_later_applied'?
            <span className="material-icons" onClick={watchLaterFunc} style={{color: 'blue'}}>watch_later</span>
          :
            <span className="material-icons" onClick={watchLaterFunc}>watch_later</span>
          }
        </div>

      </div>
    </div>
  );
};

export default VideoCard;
