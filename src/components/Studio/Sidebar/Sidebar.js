import React from "react";
import SidebarRow from "./SidebarRow";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__fixed}>
        <ul>
          <Link to="/studio/dashboard" style={{ textDecoration: 'none' }}><SidebarRow key={1} selected icon="home" title="Dashboard" /></Link>
          <Link to="/studio/contents" style={{ textDecoration: 'none' }}><SidebarRow key={2} icon="subscriptions" title="Contents" /></Link>
          <Link to="/studio/my/channels" style={{ textDecoration: 'none' }}><SidebarRow key={3} icon="notes" title="My Channels" /></Link>
          {/* <SidebarRow key={3} icon="comment" title="Comments" /> */}
          {/* <SidebarRow key={4} icon="feedback" title="Send feedback" /> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
