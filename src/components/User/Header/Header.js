import React, { useState, useEffect, Fragment } from "react";
import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import * as timeago from 'timeago.js';

// import Badge from '@material-ui/core/Badge';
// import MailIcon from '@material-ui/icons/Mail';

import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import '../Popup/Popup.css'
import './Header.css'

const Header = () => {
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  const history = useHistory()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [popupTrigger, setPopupTrigger] = useState(false)

  const [notificationPopup, setNotificationPopup] = useState(false)
  const [notfcnCount, setNotfcnCount] = useState(0)
  const [notificationAPI, setNotificationAPI] = useState([])

  let channelToken = token['channelCookie']? token['channelCookie'] : 0

  const logoutFunc = () => {
    removeToken(['mytoken'])
    removeToken(['channelCookie'])
    history.push('/login')
  }

  const searchInput = (event) => {
    let value = event.target.value
    setSearchKeyword(value)
  }

  const popupShow = () => {
    if (!popupTrigger){
      setPopupTrigger(true)
    }
  }
  const popupUnshow = () => {
    if (popupTrigger){
      setPopupTrigger(false)
    }
  }

  const notificationPopupShow = () => {
    if (!notificationPopup){
      setNotificationPopup(true)
      ntfcSeenFalseFunc()
    }
  }
  const notificationPopupUnshow = () => {
    if (notificationPopup){
      setNotificationPopup(false)
    }
  }

  function suggestionFunc() {}

  function notificationFunc() {
    axios.get(`https://ytdj.athifsaheer.online/api/v1/user/notifications/${channelToken}/`)
    .then(response => {
      setNotificationAPI(response.data)
      var count = 0
      response.data.map((data) => {
        if (data.is_seen == true) {
          count = count + 1;
        }
      })
      setNotfcnCount(count)
    })
    .catch(error => setNotificationAPI("no_notf"))
  }

  useEffect(() => {
    notificationFunc()
  }, [])
  
  function ntfcSeenFalseFunc() {
    axios.post(`https://ytdj.athifsaheer.online/api/v1/user/notifications/${channelToken}/`, {'channel': channelToken})
    notificationFunc()
  }

  return (
    <Fragment>

      <div className={classes.header}>
        <div className={classes.header__head}>
          <span className="material-icons"></span>
          <Link to='/'>
          <img
            className={classes.header__logo}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="Youtube Logo"
          />
        </Link>
        </div>

        <div className={classes.header__mid}>
          <input placeholder="Search" onChange={searchInput} onClick={suggestionFunc} value={searchKeyword} />
            {searchKeyword == ''?
              <span className="material-icons">
                search
              </span>
            :
              <span className="material-icons">
                <Link to={`/search/keyword/${searchKeyword}`} style={{ textDecoration: 'none' }}>
                  search
                </Link>
              </span>
            }
              
        </div>

        {token['mytoken']?
          <div className={classes.header__end}>
            <Link to="/studio/upload/video" >
              <span className="material-icons" style={{textDecoration: 'none', color: 'gray', cursor: 'pointer' }}>video_call</span>
            </Link>
            
            {notfcnCount == 0?
            <span className="material-icons" onClick={notificationPopupShow} style={{textDecoration: 'none', color: 'gray', cursor: 'pointer' }}>notifications</span>
            :
              <Fragment>
                <span class="p1 fa-stack fa-2x has-badge" data-count={notfcnCount}></span>
                <span className="material-icons" onClick={notificationPopupShow} style={{textDecoration: 'none', color: 'gray', cursor: 'pointer' }}>notifications</span>
              </Fragment>
            }

            <span className="material-icons" onClick={popupShow} style={{textDecoration: 'none', color: 'gray', cursor: 'pointer' }}>person</span>
          </div>
        :
          <div className={classes.header__end}>
            <div className='signin-div-header'>
              <Link to="/login" style={{textDecoration: 'none', color: 'rgb(0, 132, 255)'}}>
                Signin
              </Link>
            </div>
          </div>
        }
      </div>
      <div className={classes.constant}></div>

        {/* MAIN POPUP */}
        {popupTrigger?
          <div style={{position: "fixed", zIndex:1}}>
            <div className="popup-main-div" id="dropdown" onClick={popupUnshow} >

              <div className="popup-inner-div">
                <Link to="/studio/dashboard" style={{textDecoration: 'none' }}> 
                  <span className="material-icons popup-icon">settings</span>
                  <span className="popup-text">Studio</span>
                </Link> <br />

                {!channelToken == 0?
                  <Link to={`/channel/${channelToken}`} style={{textDecoration: 'none' }}> 
                    <span className="material-icons popup-icon">account_box</span>
                    <span className="popup-text">Your channel</span>
                  </Link>
                :
                  <Link to="" style={{textDecoration: 'none' }}> 
                    <span className="material-icons popup-icon">account_box</span>
                    <span className="popup-text">Your channel</span>
                  </Link>
                }

                <br />

                  <span className="material-icons popup-icon">exit_to_app</span>
                  <span onClick={logoutFunc} className="popup-text" >
                  Logout</span> <br />
              </div>

            </div>
          </div>
        :
          null
        }

        {/* NOTIFICATION POPUP */}
        {notificationPopup?
          <div style={{position: "fixed", zIndex:1}}>
            <div className="popup-main-div" id="dropdown" onClick={notificationPopupUnshow} >
              <div className="notif-popup-inner-div">
                <p className="ntfc-txt">Notifications</p>

                { notificationAPI == "no_notf"?
                  <p className="ntfc_not_found_txt">Notifications not found</p>
                :
                  notificationAPI && notificationAPI.map((data, index) => {
                    return (
                      <Link to={`/watch/video/${data.video.id}`} style={{textDecoration: 'none' }}>
                        <div className="notf_show_video_div">
                          <div className="channel_logo">
                            <img src={data.video.channel.logo} alt="logo" />
                          </div>
                          <div className="video_details">
                            <h5>{data.video.channel.channel_name} uploaded:</h5>
                            <p>{data.video.title}.</p>
                            <h6>{timeago.format(data.video.upload_date)}</h6>
                          </div>
                          <div className="video_thumb">
                            <img src={data.video.thumbnail} alt="thumbnail" />
                          </div>
                        </div>
                      </Link>
                    )
                  })
                  
                }

              </div>

            </div>
          </div>
        :
          null
        }


    </Fragment>
  )
}

export default Header;
