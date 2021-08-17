import React from "react";
import SidebarRow from "./SidebarRow";
import classes from "./Sidebar.module.css";
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__fixed}>
        <ul>
          <Link to="/" style={{textDecoration: 'none'}}><SidebarRow key={1} selected icon="home" title="Home" /></Link>
          <Link to="/feed/explore" style={{textDecoration: 'none'}}> <SidebarRow key={2} icon="explore" title="Explore" /> </Link>
          <Link to="/feed/subscriptions" style={{textDecoration: 'none'}}> <SidebarRow key={3}icon="subscriptions" title="Subscriptions" /></Link>
          <SidebarRow key={3} icon="comment" title="Comments" />
          <hr />
          <SidebarRow key={4} icon="video_library" title="Library" />
          <SidebarRow key={5} icon="restore" title="History" />
          <Link to="/studio/contents" style={{textDecoration: 'none'}}> <SidebarRow key={6} icon="smart_display" title="My videos" /> </Link>
          <Link to="/feed/watch/later" style={{textDecoration: 'none'}}><SidebarRow key={7} icon="watch_later" title="Watch later" /> </Link>
          <Link to="/feed/liked/videos" style={{textDecoration: 'none'}}> <SidebarRow key={8} icon="thumb_up_alt" title="Liked videos" /> </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
