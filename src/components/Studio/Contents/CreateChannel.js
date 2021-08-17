import React, { useState, useEffect } from "react";
import "./CreateChannel.css";
import Cookies from 'js-cookie';
import Header from '../../User/Header/Header'
import APIService from '../../User/API/APIService'
import { useHistory } from 'react-router-dom'
import {useCookies} from 'react-cookie';

const CreateChannel = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(true);
  
  const tokenUser = Cookies.get('mytoken')  
  const [channelName, setChannelName] = useState('')
  const [logo, setLogo] = useState()
  const [banner, setBanner] = useState()
  const [about, setAbout] = useState('')

  const [channelCookie, setChannelCookie] = useCookies()

  // SESSION HANDLE 
  const [token, setToken] = useCookies(['mytoken'])
  const history = useHistory()

  const submit = () => {
    const uploadData = new FormData();
    uploadData.append('token', tokenUser);
    uploadData.append('channel_name', channelName);
    uploadData.append('logo', logo, logo.name);
    uploadData.append('banner', banner, banner.name);
    uploadData.append('about', about);
    uploadData.append('is_active', true);

    APIService.CreateChannel(uploadData)
    .then(res => {
      setChannelCookie("channelCookie", res.data.id)
      history.push('/studio/my/channels')
    })
    .catch(error => setApiError(false))
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = () => {
    let errors = {};

    if (!channelName) {
      errors.channelName = "Cannot be blank";
    }

    if (!logo) {
      errors.logo = "Cannot be blank";
    }
    if (!banner) {
      errors.banner = "Cannot be blank";
    }
    if (!about) {
      errors.about = "Cannot be blank";
    } else if (about.length < 4) {
      errors.about = "Must be more than 4 characters";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  // SESSION HANDLE -----
  useEffect(() => {
    if(!token['mytoken']) {
      history.push('/login')
  }
  }, [token]);

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Create Channel</h1>
        {Object.keys(formErrors).length === 0 && isSubmitting && apiError && (
          <span className="success-msg">Channel Created</span>
          )}
        {apiError?
          null
        :
        <span className="error-msg">Error Accrued</span>
        }
        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data" method="post">
          

          <div className="form-row">
            <label htmlFor="channelName">Channel Name</label>
            <input
              type="text"
              name="channelName"
              id="channelName"
              value={channelName}
              onChange={e => setChannelName(e.target.value)}
              className={formErrors.channelName && "input-error"}
              placeholder="Channel Name"
            />
            {formErrors.channelName && (
              <span className="error">{formErrors.channelName}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="logo">Logo</label>
            <input
              type="file"
              name="logo"
              id="logo"
              onChange={e => setLogo(e.target.files[0])}
              className={formErrors.logo && "input-error"}
            />
            {formErrors.logo && (
              <span className="error">{formErrors.logo}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="banner">Banner</label>
            <input
              type="file"
              name="banner"
              id="banner"
              onChange={e => setBanner(e.target.files[0])}
              className={formErrors.banner && "input-error"}
            />
            {formErrors.banner && (
              <span className="error">{formErrors.banner}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="about">About Channel</label>
            <input
              type="text"
              name="about"
              id="about"
              value={about}
              onChange={e => setAbout(e.target.value)}
              className={formErrors.about && "input-error"}
              placeholder="About"
              />
            {formErrors.about && (
              <span className="error">{formErrors.about}</span>
            )}
          </div>

          

          <button type="submit">Create Channel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
