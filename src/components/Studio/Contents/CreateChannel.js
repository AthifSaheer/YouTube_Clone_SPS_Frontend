import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import Cookies from 'js-cookie';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import Cropper from 'react-easy-crop'

import getCroppedImg, {generateDownload} from './ImageCrop'

import "./CreateChannel.css";
import Header from '../../User/Header/Header'
import APIService from '../../User/API/APIService'
import img from '../../../image/youtube.jpg';

const CreateChannel = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(true);
  
  const tokenUser = Cookies.get('mytoken')  
  const [channelName, setChannelName] = useState('')
  const [logo, setLogo] = useState("")
  const [croppedLogoBase64, setCroppedLogoBase64] = useState("")
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
    // uploadData.append('logo', logo, logo.name);
    uploadData.append('logo', croppedLogoBase64);
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

  // IMAGE CROPPING  -----
  const [crop, setCrop] = useState({ aspect: 1, x: 0, y: 0 });
  const [image, setImage] = useState(null)
  const [showCropSection, setShowCropSection] = useState(false)

  if (logo) {
    const reader = new FileReader();
    reader.readAsDataURL(logo);
    reader.addEventListener("load", () => {
      setImage(reader.result);
    })
  }

  function downloadImageFunc() {
    generateDownload(image, crop)
  }

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) u8arr[n] = bstr.charCodeAt(n);
  
    return new File([u8arr], filename, { type: mime });
  };

  
  const onUpload = async () => {
    if (!image)
        return(
            "Please select an image!"
        );
      
    let forwhat = "base64"

    const canvas = await getCroppedImg(image, crop, forwhat);
    console.log("canvas", canvas);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    
    console.log("canvasDataUrl", canvasDataUrl);
    setCroppedLogoBase64(canvasDataUrl)

    const setLogo = dataURLtoFile(
        canvasDataUrl,
        "cropped-image.jpeg"
    );
    console.log(setLogo);
    setShowCropSection(false)
};

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
              onChange={e => {setLogo(e.target.files[0]); setShowCropSection(true)}}
              // onChange={e => setLogo(e.target.value)}
              className={formErrors.logo && "input-error"}
            />

            {showCropSection?
              <div className="image_crop_main_div">
                <ReactCrop src={image} crop={crop} aspect={1} onChange={newCrop => {
                  console.log(crop);
                  setCrop(newCrop)
                }} />

                {crop.x != 0?
                  <div>
                    <p className="cropped_img_upload_btn" onClick={onUpload}>Upload</p>
                    <p className="cropped_img_download_btn" onClick={downloadImageFunc}>Download</p>
                  </div>
                :
                  null
                }

              </div>
            :
              null
            }

          
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
