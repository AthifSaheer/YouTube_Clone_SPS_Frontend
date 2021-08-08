import React from "react";

import VideoChategory from "./VideoChategory";
import MainPageVideos from "./MainPageVideos";
import classes from "./Content.module.css";
import Popup from '../Popup/Popup'

const Content = () => {
  return (
    <div className={classes.content}>
      <VideoChategory />
      <MainPageVideos />
      {/* <Popup trigger={false} /> */}
    </div>
  );
};

export default Content;
