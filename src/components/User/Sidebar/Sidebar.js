import { useState, useEffect } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';

import SidebarRow from "./SidebarRow";
import classes from "./Sidebar.module.css";
import {Link} from 'react-router-dom'

const Sidebar = () => {
  const [apiSubrsChannel, setApiSubrsChannel] = useState([])
    const [token, setToken] = useCookies()
    let loginedChannel = token['channelCookie']
    let loginedUser = token['mytoken']

    useEffect(() => {
        if(loginedUser && loginedChannel)  {
            axios.get(`/api/v1/user/feed/subscribers/channel/${loginedChannel}/`)
            .then((response) => {
                console.log(response.data[0]);

                if (response.data[0].no_channels == "no_channels") {
                    setApiSubrsChannel(response.data[0].no_channels);
                } else {
                    setApiSubrsChannel(response.data);
                }
            })
            .catch((error) => setApiSubrsChannel("no_channels"))
        }
    }, [])

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__fixed}>
        <ul>
          <Link to="/" style={{textDecoration: 'none'}}><SidebarRow key={1} selected icon="home" title="Home" /></Link>
          <Link to="/feed/explore" style={{textDecoration: 'none'}}> <SidebarRow key={2} icon="explore" title="Explore" /> </Link>
          {/* <Link to="/feed/subscriptions" style={{textDecoration: 'none'}}> <SidebarRow key={3}icon="subscriptions" title="Subscriptions" /></Link> */}
          <Link to="/feed/comments" style={{textDecoration: 'none'}}> <SidebarRow key={3} icon="comment" title="Comments" /> </Link>
          <hr />
          {/* <SidebarRow key={4} icon="video_library" title="Library" /> */}
          {/* <SidebarRow key={5} icon="restore" title="History" /> */}
          <Link to="/studio/contents" style={{textDecoration: 'none'}}> <SidebarRow key={6} icon="smart_display" title="My videos" /> </Link>
          <Link to="/feed/watch/later" style={{textDecoration: 'none'}}><SidebarRow key={7} icon="watch_later" title="Watch later" /> </Link>
          <Link to="/feed/liked/videos" style={{textDecoration: 'none'}}> <SidebarRow key={8} icon="thumb_up_alt" title="Liked videos" /> </Link>

          <p className={classes.subscription_txt}>SUBSCRIPTIONS</p>
          {!loginedUser?
            <p className={classes.subscription_singin_txt}>SIGN IN</p>
            :
              !loginedChannel?
                <p className={classes.subscription_singin_txt}>Channels not found!</p>
                :
                  apiSubrsChannel == "no_channels"?
                    <p className={classes.subscription_singin_txt}>Channels not found!</p>
                  :
                    apiSubrsChannel && apiSubrsChannel.map((data, index) => {
                      return (
                          <Link to={`/channel/${data.which_channels.id}`} style={{textDecoration: 'none'}}>
                            <div className="subscriptions" style={{display: 'flex'}} key={data.id}>
                              <img src={data.which_channels.logo} alt="logo" className={classes.subscriptions_chnl_logo} />
                              <p  className={classes.subscriptions_chnl_name}>{data.which_channels.channel_name}</p>
                            </div>
                          </Link>
                      )
                    })
          }

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
