import React from "react";
import SidebarRow from "./SidebarRow";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__fixed}>
        <ul>
          <SidebarRow key={1} selected icon="home" title="Home" />
          <Link to="/admin/users" style={{ textDecoration: 'none' }}><SidebarRow key={2} icon="person" title="Users" /></Link>
          <Link to="/admin/videos" style={{ textDecoration: 'none' }}><SidebarRow key={3}icon="videocam" title="Videos" /></Link>
          <SidebarRow key={3}icon="notes" title="Feedback" />
          {/* <hr /> */}
          {/* <SidebarRow key={4}icon="video_library" title="Library" />
          <SidebarRow key={5}icon="restore" title="History" />
          <SidebarRow key={6} icon="smart_display" title="My videos" />
          <SidebarRow key={7} icon="watch_later" title="Watch laater" />
          <SidebarRow key={8} icon="thumb_up_alt" title="Liked videos" /> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
