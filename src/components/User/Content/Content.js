import React from "react";

import VideoChategory from "./VideoChategory";
import MainPageVideos from "./MainPageVideos";
import classes from "./Content.module.css";

const Content = () => {
  return (
    <div className={classes.content}>
      <VideoChategory />
      <MainPageVideos />
    </div>
  );
};

export default Content;
