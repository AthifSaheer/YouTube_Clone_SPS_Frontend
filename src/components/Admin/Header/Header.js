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

        <div className={classes.header__mid}></div>

        <div className={classes.header__end}>

          {token['admintoken']?
            <p onClick={logoutFunc} style={{textDecoration: 'none', color: 'gray', paddingRight: '42px'}} >Logout</p>
          :
            <Link to="/admin/login" style={{textDecoration: 'none', color: 'gray', paddingRight: '42px'}}> <p>Signin</p> </Link>
          }

        </div>

      </div>

      <div className={classes.constant}></div>
    </Fragment>
  );
};

export default Header;
