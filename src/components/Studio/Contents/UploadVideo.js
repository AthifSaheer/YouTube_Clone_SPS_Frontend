import Header from '../../User/Header/Header'
import classes from "../../../App.module.css";

import React, { useState, useEffect } from 'react';
import APIService from '../../User/API/APIService'
import Cookies from 'js-cookie';

import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'
import axios from 'axios';


export const UploadVideo = () => {
  const [title, setTitle] = useState('')
  const [video, setVideo] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [description, setDescription] = useState('')
  const [channel, setChannel] = useState('')
  const [category, setCategory] = useState('')
  const [visibility, setVisibility] = useState('')
  const [commentVisibility, setCommentVisibility] = useState('')

  const tokenUser = Cookies.get('mytoken')
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(true);

  const [APIChannels, setAPIChannels] = useState([]);
  const [errorInAPIChannels, setErrorInAPIChannels] = useState(false);

  // SESSION HANDLE 
  const [token, setToken] = useCookies(['mytoken'])
  const history = useHistory()

  // if(APIChannels.token.key == tokenUser) {

  // }
  // const ch = APIChannels.token.key == tokenUser

  const submit = () => {
    const uploadData = new FormData();
    uploadData.append('token', tokenUser);
    if(token['channelCookie']){
      uploadData.append('channel', token['channelCookie']);
    } else{
      uploadData.append('channel', channel);
    }
    uploadData.append('title', title);
    uploadData.append('video', video, video.name);
    uploadData.append('thumbnail', thumbnail, thumbnail.name);
    uploadData.append('description', description);
    // uploadData.append('tag', tag);
    uploadData.append('category', category);
    uploadData.append('visibility', visibility);
    uploadData.append('comment_visibility', commentVisibility);

    APIService.UploadVideo(uploadData)
    .then(resp => console.log(resp))
    .catch(error => setApiError(false))
  };

  // SESSION HANDLE -----
  useEffect(() => {
    if(!token['mytoken']) {
      history.push('/login')
    }
  }, [token]);

  useEffect(() => {
    axios.get('/api/v1/admin/channels/')
    .then(response => {setAPIChannels(response.data)})
    .catch(error => setErrorInAPIChannels(true))
  }, [])

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = () => {
    let errors = {};

    if (!title) {
      errors.title = "Cannot be blank";
    }
    if (!video) {
      errors.video = "Cannot be blank";
    }
    if(!token['channelCookie']){
      if (!channel) {
        errors.channel = "Cannot be blank";
      } 
    }
    if (!thumbnail) {
      errors.thumbnail = "Cannot be blank";
    }
    if (!description) {
      errors.description = "Cannot be blank";
    }
    if (!category) {
      errors.category = "Cannot be blank";
    }
    if (!visibility) {
      errors.visibility = "Cannot be blank";
    }
    if (!commentVisibility) {
      errors.commentVisibility = "Cannot be blank";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Upload Video</h1>
        {Object.keys(formErrors).length === 0 && isSubmitting && apiError && (
          <span className="success-msg">Video uploaded</span>
        )}
        {apiError?
          null
        :
          <span className="error-msg">Error Accrued</span>
        }
        <form onSubmit={handleSubmit} noValidate enctype="multipart/form-data" method="post">
          

          <div className="form-row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={formErrors.title && "input-error"}
              placeholder="Title"
            />
            {formErrors.title && (
              <span className="error">{formErrors.title}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="video">Video</label>
            <input
              type="file"
              name="video"
              id="video"
              onChange={e => setVideo(e.target.files[0])}
              className={formErrors.video && "input-error"}
            />
            {formErrors.video && (
              <span className="error">{formErrors.video}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="thumbnail">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              onChange={e => setThumbnail(e.target.files[0])}
              className={formErrors.thumbnail && "input-error"}
            />
            {formErrors.thumbnail && (
              <span className="error">{formErrors.thumbnail}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={formErrors.description && "input-error"}
              placeholder="Description"
              />
            {formErrors.description && ( <span className="error">{formErrors.description}</span> )}
          </div>

          {token['channelCookie']?
            null
          :
              <label htmlFor="channel">Choose Channel:
              <select name="channel" id="channel" onChange={e => setChannel(e.target.value)} className={formErrors.channel && "input-error"}>
                  <option value="---">---</option>
                  {APIChannels.map((data, index) => {
                    // {data.token.key == tokenUser?
                      if(data.token.key == tokenUser){
                        return(
                          <option key={index+1} value={data.id}>{data.channel_name}</option> 
                        )
                      }
                    })
                  }
              </select>
              </label>
          }

          {errorInAPIChannels?
            <small style={{color: 'red'}}>Error Accrued</small>
          :
            null
          }

          {formErrors.channel && ( <span className="error">{formErrors.channel}</span> )}
          <br />

          <label htmlFor="category">Choose Category:</label>
            <select name="category" id="Category" onChange={e => setCategory(e.target.value)} className={formErrors.category && "input-error"}>
              <option value="---">---</option>
              <option value="Tech">Tech</option>
              <option value="Electronics">Electronics</option>
              <option value="Elon musk">Elon musk</option>
              <option value="Gadgets">Gadgets</option>
            </select>
          {formErrors.category && ( <span className="error">{formErrors.category}</span> )}
            <br />

            <label htmlFor="visibility">Choose Video Visibility:</label>

            <select name="visibility" id="Visibility" onChange={e => setVisibility(e.target.value)} className={formErrors.visibility && "input-error"}>
              <option value="---">---</option>
              <option value="public">public</option>
              <option value="unlisted">unlisted</option>
              <option value="private">private</option>
            </select>
          {formErrors.visibility && ( <span className="error">{formErrors.visibility}</span> )}
            <br />

            <label htmlFor="commentVisibility">Choose Comment Visibility:</label>

            <select name="commentVisibility" id="commentVisibility" onChange={e => setCommentVisibility(e.target.value)} className={formErrors.commentVisibility && "input-error"}>
              <option value="---">---</option>
              <option value="public">public</option>
              <option value="prevent">prevent</option>
            </select>
          {formErrors.commentVisibility && ( <span className="error">{formErrors.commentVisibility}</span> )}
            <br />

          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo
