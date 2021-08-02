import React from "react";
import classes from "./VideoCard.module.css";
import image from "../../../image/youtube2.jpg";
import {Link} from 'react-router-dom'

const VideoCard = (props) => {

  const autoPlayVideoWhileMouseOver = () => {
    // alert('mouse over')
  }

  return (
    <div className={classes.video_card} >
        <Link to={`watch/video/${props.id}`} style={{ textDecoration: 'none' }}>
          <div className={classes.video_card__image}>
            <img src={props.image} alt="video thumbnail" onMouseOver={autoPlayVideoWhileMouseOver}  />
            {/* <video width="320" height="240" style={{ backgroundColor:'black' }} autoPlay controls>
                <source src={props.video} type="video/mp4" />
            </video> */}
          </div>
        </Link>
      <div className={classes.video_card__content}>
        <div className={classes.video_card__channelpicture}>
          <img src={props.channelLogo} alt="Channel logo" width='20px' style={{borderRadius:'50%'}} />
          {/* <span className="material-icons">account_circle</span> */}
        </div>
        <div className={classes.video_card_info}>
          <span className={classes.video_card__title}>{props.title}</span>
          <span className={classes.video_card__channelname}>{props.channel}</span>
          <span className={classes.video_card__view}>{props.view}</span>
          <span className={classes.video_card__date}>{props.date}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
