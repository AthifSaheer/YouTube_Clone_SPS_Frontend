import React, { Fragment } from "react";
import classes from "./Header.module.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import YTAdminLogo from '../../../image/youtube-Admin.png'

const Header = () => {

  const [token, setToken, removeToken] = useCookies(['admintoken'])
  const history = useHistory()

  const logoutFunc = () => {
    removeToken(['admintoken'])
    history.push('/admin/login')
  }
  return (
    <Fragment>

      <div className={classes.header}>
        <div className={classes.header__head}>
          <span className="material-icons">menu</span>
          <Link to='/admin/dashboard'>
          <p>
          <img
            className={classes.header__logo}
            src={YTAdminLogo}
            alt="Youtube Logo"
          />
          </p>
        </Link>
        </div>

        <div className={classes.header__mid}>
          <input placeholder="Search" />
          <span className="material-icons">search</span>
          <span className="material-icons">mic</span>
        </div>

        <div className={classes.header__end}>
          <span className="material-icons">videocam</span>
          <span className="material-icons">grid_view</span>
          <span className="material-icons">notifications</span>
          
          <Popup trigger={<span className="material-icons">person</span>} position="left center">
            <Link to="/admin/login"> <p style={{ marginTop:"60px" }}>Signin</p> </Link>
            {/* <Link to="/admin/signup"> <p>Signup</p> </Link> */}
            <p onClick={logoutFunc} >Logout</p>
          </Popup>

        </div>
      </div>
      <div className={classes.constant}></div>
    </Fragment>
  );
};

export default Header;
