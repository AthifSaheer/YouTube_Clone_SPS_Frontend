import React from "react";
import SidebarRow from "./SidebarRow";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__fixed}>
        <ul>
          <SidebarRow key={1} selected icon="home" title="Home" />
          <SidebarRow key={2} icon="explore" title="Explore" />
          <SidebarRow key={3}icon="subscriptions" title="Subscriptions" />
          <SidebarRow key={3}icon="comment" title="Comments" />
          <hr />
          <SidebarRow key={4}icon="video_library" title="Library" />
          <SidebarRow key={5}icon="restore" title="History" />
          <SidebarRow key={6} icon="smart_display" title="My videos" />
          <SidebarRow key={7} icon="watch_later" title="Watch laater" />
          <SidebarRow key={8} icon="thumb_up_alt" title="Liked videos" />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
