import React, { useState, useEffect, Fragment } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Header = () => {
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  const history = useHistory()
  const [searchKeyword, setSearchKeyword] = useState('')

  const logoutFunc = () => {
    removeToken(['mytoken'])
    history.push('/login')
  }

  const searchInput = (event) => {
    let value = event.target.value
    setSearchKeyword(value)
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
          <Link to={`/search/keyword/${searchKeyword}`} style={{ textDecoration: 'none' }}>
          <span className="material-icons">search</span>
          </Link>
          <span className="material-icons">mic</span>
        </div>

        <div className={classes.header__end}>
          <span className="material-icons">videocam</span>
          <span className="material-icons">grid_view</span>
          <span className="material-icons">notifications</span>
          
          <Popup trigger={<span className="material-icons">person</span>} position="left center">
            <Link to="/login"> <p style={{ marginTop:"50px" }}>Signin</p> </Link>
            <p onClick={logoutFunc} >Logout</p>
            <Link to="/studio/contents"> <p>Studio</p> </Link>
            <Link to="/studio/create/channel"> <p>Create Channel</p> </Link>
            <Link to="/studio/upload/video"> <p>Upload Video</p> </Link>
          </Popup>

        </div>
      </div>
      <div className={classes.constant}></div>
    </Fragment>
  );
};

export default Header;
