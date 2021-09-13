
import React, { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';

import APIService from '../../User/API/APIService'
import LinearWithValueLabel from '../ProgressBar/ProgressBar'

function VideoUploadForm(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [channel, setChannel] = useState('')
  const [category, setCategory] = useState('')
  const [visibility, setVisibility] = useState('')
  const [commentVisibility, setCommentVisibility] = useState('')

  const tokenUser = Cookies.get('mytoken')
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('false');

  const [successMessage, setSuccessMessage] = useState(false);

  const [APIChannels, setAPIChannels] = useState([]);
  const [errorInAPIChannels, setErrorInAPIChannels] = useState(false);

  // SESSION HANDLE 
  const [token, setToken] = useCookies(['mytoken'])
  const history = useHistory()

  const submit = () => {
    const uploadData = new FormData();
    // uploadData.append('token', tokenUser);
    if(token['channelCookie']){
      uploadData.append('channel', token['channelCookie']);
    } else{
      uploadData.append('channel', channel);
    }
    uploadData.append('title', title? title : props.title);
    // uploadData.append('video', video, video.name);
    // uploadData.append('thumbnail', thumbnail, thumbnail.name);
    uploadData.append('description', description? description : props.description);
    uploadData.append('category', category? category : props.category);
    uploadData.append('visibility', visibility? visibility : props.visibility);
    uploadData.append('comment_visibility', commentVisibility? commentVisibility : props.visibility);

    axios.post(`https://ytdj.athifsaheer.online/api/v1/studio/edit/video/${props.videoID}/`,uploadData)
    .then(resp => {
      setSuccessMessage(false)
      
      setTimeout(function(){ 
        setApiError(true);
        setIsSubmitting(false);
        setSuccessMessage(true);

        setTimeout(function(){ 
          history.push('/studio/contents')
        }, 2000)

       }, 2450)

    })
    .catch(error => { setApiError(false); setSuccessMessage(false) })
  };

  useEffect(() => {
    axios.get('https://ytdj.athifsaheer.online/api/v1/admin/channels/')
    .then(response => {setAPIChannels(response.data)})
    .catch(error => setErrorInAPIChannels(true))
  }, [])

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmitting(true);
    setSuccessMessage(false);
  };

  //form validation handler
  const validate = () => {
    let errors = {};

    // if (!title || !props.title) {
    //   errors.title = "Cannot be blank";
    // }
    // if(!token['channelCookie']){
    //   if (!channel || !props.channel) {
    //     errors.channel = "Cannot be blank";
    //   } 
    // }
    // if (!description || !props.description) {
    //   errors.description = "Cannot be blank";
    // }
    // if (!category || !props.category) {
    //   errors.category = "Cannot be blank";
    // }
    // if (!visibility || !props.visibility) {
    //   errors.visibility = "Cannot be blank";
    // }
    // if (!commentVisibility || !props.comment_visibility) {
    //   errors.commentVisibility = "Cannot be blank";
    // }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div>
      <div className="container scroll-container">
        <h1>Edit Video</h1>
        
        <form onSubmit={handleSubmit} noValidate enctype="multipart/form-data" method="post">
          <div className="form-row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title? title : props.title }
              onChange={e => setTitle(e.target.value)}
              className={formErrors.title && "input-error"}
              placeholder="Title"
            />
            {formErrors.title && (
              <span className="error">{formErrors.title}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={description? description : props.description}
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
            <select name="category" id="Category" onChange={e => setCategory(e.target.value)} className={formErrors.category && "input-error"} value={category? category : props.category}>
              <option value="---">---</option>
              <option value="Tech">Tech</option>
              <option value="Python">Python</option>
              <option value="News">News</option>
              <option value="Electronics">Electronics</option>
              <option value="Driving">Driving</option>
              <option value="Kids">Kids</option>
              <option value="Mahindra thar">Mahindra thar</option>
              <option value="MKBHD">MKBHD</option>
              <option value="Apple">Apple</option>
              <option value="Titan">Titan</option>
              <option value="Bill gates">Bill gates</option>
              <option value="America">America</option>
              <option value="Music">Music</option>
              <option value="TED">TED</option>
              <option value="India">India</option>
            </select>
          {formErrors.category && ( <span className="error">{formErrors.category}</span> )}
            <br />

            <label htmlFor="visibility">Choose Video Visibility:</label>

            <select name="visibility" id="Visibility" value={visibility? visibility : props.visibility} onChange={e => setVisibility(e.target.value)} className={formErrors.visibility && "input-error"}>
              <option value="---">---</option>
              <option value="public">public</option>
              <option value="unlisted">unlisted</option>
              <option value="private">private</option>
            </select>
          {formErrors.visibility && ( <span className="error">{formErrors.visibility}</span> )}
            <br />

            <label htmlFor="commentVisibility">Choose Comment Visibility:</label>

            <select name="commentVisibility" id="commentVisibility" value={commentVisibility? commentVisibility : props.comment_visibility} onChange={e => setCommentVisibility(e.target.value)} className={formErrors.commentVisibility && "input-error"}>
              <option value="---">---</option>
              <option value="public">public</option>
              <option value="prevent">prevent</option>
            </select>
          {formErrors.commentVisibility && ( <span className="error">{formErrors.commentVisibility}</span> )}
            <br />
            
            {Object.keys(formErrors).length === 0 && isSubmitting && apiError && (
                <LinearWithValueLabel />  
            )}
            {apiError?
                null
            :
                <span className="error-msg">Error occured</span>
            }
            
            {successMessage?
                <span className="success-msg">Video Edited</span>
            :
                null
            }

            <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default VideoUploadForm
