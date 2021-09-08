import React, {useState} from "react";
import SidebarRow from "./SidebarRow";
import classes from "./Sidebar.module.css";
import { Link ,useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__fixed}>
        
        {location.pathname == "/studio/dashboard"?
          <ul>
            <Link to="/studio/dashboard" style={{ textDecoration: 'none' }}><SidebarRow key={1} selected icon="home" title="Dashboard" /></Link>
            <Link to="/studio/contents" style={{ textDecoration: 'none' }}><SidebarRow key={2} icon="subscriptions" title="Contents" /></Link>
            <Link to="/studio/my/channels" style={{ textDecoration: 'none' }}><SidebarRow key={3} icon="notes" title="My Channels" /></Link>
            {/* <SidebarRow key={3} icon="comment" title="Comments" /> */}
            <Link to="/studio/send/feedback" style={{ textDecoration: 'none' }}><SidebarRow key={4} icon="feedback" title="Send feedback" /></Link>
          </ul>
        :
          location.pathname == "/studio/contents"?
            <ul>
              <Link to="/studio/dashboard" style={{ textDecoration: 'none' }}><SidebarRow key={1} icon="home" title="Dashboard" /></Link>
              <Link to="/studio/contents" style={{ textDecoration: 'none' }}><SidebarRow key={2} selected icon="subscriptions" title="Contents" /></Link>
              <Link to="/studio/my/channels" style={{ textDecoration: 'none' }}><SidebarRow key={3} icon="notes" title="My Channels" /></Link>
              {/* <SidebarRow key={3} icon="comment" title="Comments" /> */}
              <Link to="/studio/send/feedback" style={{ textDecoration: 'none' }}><SidebarRow key={4} icon="feedback" title="Send feedback" /></Link>
            </ul>
          :
            location.pathname == "/studio/my/channels"?
              <ul>
                <Link to="/studio/dashboard" style={{ textDecoration: 'none' }}><SidebarRow key={1} icon="home" title="Dashboard" /></Link>
                <Link to="/studio/contents" style={{ textDecoration: 'none' }}><SidebarRow key={2} icon="subscriptions" title="Contents" /></Link>
                <Link to="/studio/my/channels" style={{ textDecoration: 'none' }}><SidebarRow key={3} selected icon="notes" title="My Channels" /></Link>
                {/* <SidebarRow key={3} icon="comment" title="Comments" /> */}
                <Link to="/studio/send/feedback" style={{ textDecoration: 'none' }}><SidebarRow key={4} icon="feedback" title="Send feedback" /></Link>
              </ul>
            :
              location.pathname == "/studio/send/feedback"?
                <ul>
                  <Link to="/studio/dashboard" style={{ textDecoration: 'none' }}><SidebarRow key={1} icon="home" title="Dashboard" /></Link>
                  <Link to="/studio/contents" style={{ textDecoration: 'none' }}><SidebarRow key={2} icon="subscriptions" title="Contents" /></Link>
                  <Link to="/studio/my/channels" style={{ textDecoration: 'none' }}><SidebarRow key={3} icon="notes" title="My Channels" /></Link>
                  {/* <SidebarRow key={3} icon="comment" title="Comments" /> */}
                  <Link to="/studio/send/feedback" style={{ textDecoration: 'none' }}><SidebarRow key={4} selected icon="feedback" title="Send feedback" /></Link>
                </ul>
              :
                <ul>
                  <Link to="/studio/dashboard" style={{ textDecoration: 'none' }}><SidebarRow key={1} icon="home" title="Dashboard" /></Link>
                  <Link to="/studio/contents" style={{ textDecoration: 'none' }}><SidebarRow key={2} icon="subscriptions" title="Contents" /></Link>
                  <Link to="/studio/my/channels" style={{ textDecoration: 'none' }}><SidebarRow key={3} icon="notes" title="My Channels" /></Link>
                  {/* <SidebarRow key={3} icon="comment" title="Comments" /> */}
                  <Link to="/studio/send/feedback" style={{ textDecoration: 'none' }}><SidebarRow key={4} icon="feedback" title="Send feedback" /></Link>
                </ul>
        }

      </div>
    </div>
  );
};

export default Sidebar;
