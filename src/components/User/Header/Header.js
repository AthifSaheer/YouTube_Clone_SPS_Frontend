import React, { useState, useEffect, Fragment } from "react";
import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'
// import Popup from 'reactjs-popup';

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

  return (
    <Fragment>

      <div className={classes.header}>
        <div className={classes.header__head}>
          <span className="material-icons">menu</span>
          <Link to='/'>
          <img
            className={classes.header__logo}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="Youtube Logo"
          />
        </Link>
        </div>

        <div className={classes.header__mid}>
          <input placeholder="Search" onChange={searchInput} value={searchKeyword} />
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
              
          <span className="material-icons">mic</span>
        </div>

        {token['mytoken']?
          <div className={classes.header__end}>
            <Link to="/studio/upload/video" >
              <span className="material-icons" style={{textDecoration: 'none', color: 'gray'}}>video_call</span>
            </Link>
            <span className="material-icons">grid_view</span>
            <span className="material-icons">notifications</span>
            <span className="material-icons" onClick={popupShow}>person</span>
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

        {popupTrigger?
          <div style={{position: "fixed", zIndex:1}}>
            <div className="popup-main-div" id="dropdown" onClick={popupUnshow} >

              <div className="popup-inner-div">
                <Link to="/studio/dashboard" style={{textDecoration: 'none' }}> 
                  <span className="material-icons popup-icon">settings</span>
                  <span className="popup-text">Studio</span>
                </Link> <br />

                <Link to="" style={{textDecoration: 'none' }}> 
                  <span className="material-icons popup-icon">account_box</span>
                  <span className="popup-text">Your channel</span>
                </Link> <br />

                {/* <Link to="/studio/create/channel" style={{textDecoration: 'none' }}>
                  <span className="material-icons popup-icon">add_box</span>
                  <span className="popup-text">Create Channel</span>
                </Link> <br /> */}

                  <span className="material-icons popup-icon">exit_to_app</span>
                <span onClick={logoutFunc} className="popup-text" >
                  Logout</span> <br />
              </div>

            </div>
          </div>
        :
          null
        }


    </Fragment>
  );
};

export default Header;
