import React from "react";
import SidebarRow from "./SidebarRow";
import classes from "./Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__fixed}>

        {location.pathname == "/admin/users"?
          <ul>
            {/* <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}><SidebarRow key={1} selected icon="home" title="Home" /></Link> */}
            <Link to="/admin/users" style={{ textDecoration: 'none' }}><SidebarRow key={2} selected icon="person" title="Users" /></Link>
            <Link to="/admin/channels" style={{ textDecoration: 'none' }}><SidebarRow key={3} icon="subscriptions" title="Channels" /></Link>
            <Link to="/admin/feedback" style={{ textDecoration: 'none' }}><SidebarRow key={3}icon="notes" title="Feedback" /></Link>
          </ul>
        :
          location.pathname == "/admin/channels"?
            <ul>
              {/* <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}><SidebarRow key={1} selected icon="home" title="Home" /></Link> */}
              <Link to="/admin/users" style={{ textDecoration: 'none' }}><SidebarRow key={2} icon="person" title="Users" /></Link>
              <Link to="/admin/channels" style={{ textDecoration: 'none' }}><SidebarRow key={3} selected icon="subscriptions" title="Channels" /></Link>
              <Link to="/admin/feedback" style={{ textDecoration: 'none' }}><SidebarRow key={3}icon="notes" title="Feedback" /></Link>
            </ul>
          :
            location.pathname == "/admin/feedback"?
              <ul>
                {/* <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}><SidebarRow key={1} selected icon="home" title="Home" /></Link> */}
                <Link to="/admin/users" style={{ textDecoration: 'none' }}><SidebarRow key={2} icon="person" title="Users" /></Link>
                <Link to="/admin/channels" style={{ textDecoration: 'none' }}><SidebarRow key={3} icon="subscriptions" title="Channels" /></Link>
                <Link to="/admin/feedback" style={{ textDecoration: 'none' }}><SidebarRow key={3} selected icon="notes" title="Feedback" /></Link>
              </ul>
            :
              <ul>
                {/* <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}><SidebarRow key={1} selected icon="home" title="Home" /></Link> */}
                <Link to="/admin/users" style={{ textDecoration: 'none' }}><SidebarRow key={2} icon="person" title="Users" /></Link>
                <Link to="/admin/channels" style={{ textDecoration: 'none' }}><SidebarRow key={3} icon="subscriptions" title="Channels" /></Link>
                <Link to="/admin/feedback" style={{ textDecoration: 'none' }}><SidebarRow key={3}icon="notes" title="Feedback" /></Link>
              </ul>
        }
      </div>
    </div>
  );
};

export default Sidebar;
