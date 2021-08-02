import Header from '../../User/Header/Header'
import classes from "../../../App.module.css";
import './Contents.css';

import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import APIService from '../../User/API/APIService'
import Cookies from 'js-cookie';


export const UploadVideo = () => {
  const [title, setTitle] = useState('')
  const [video, setVideo] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [description, setDescription] = useState('')
  // const [tag, setTag] = useState('')
  const [category, setCategory] = useState('')
  const [visibility, setVisibility] = useState('')
  const [commentVisibility, setCommentVisibility] = useState('')

  const token = Cookies.get('mytoken')
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const validate = Yup.object({
  //   firstName: Yup.string()
  //     .max(15, 'Must be 15 characters or less')
  //     .required('Required'),
  //   lastName: Yup.string()
  //     .max(20, 'Must be 20 characters or less')
  //     .required('Required'),
  //   email: Yup.string()
  //     .email('Email is invalid')
  //     .required('Email is required'),
  //   password: Yup.string()
  //     .min(6, 'Password must be at least 6 charaters')
  //     .required('Password is required'),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref('password'), null], 'Password must match')
  //     .required('Confirm password is required'),
  // })


  const submit = () => {
    const uploadData = new FormData();
    uploadData.append('user', 1);
    uploadData.append('channel', 10);
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
    .catch(error => alert(error))
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

    if (!title) {
      errors.title = "Cannot be blank";
    }

    if (!video) {
      errors.video = "Cannot be blank";
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
        <h1>Create Channel</h1>
        {Object.keys(formErrors).length === 0 && isSubmitting && (
          <span className="success-msg">Video uploaded</span>
        )}
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

          <label for="cars">Choose Category:</label>

            <select name="category" id="Category" onChange={e => setCategory(e.target.value)} className={formErrors.category && "input-error"}>
              <option value="---">---</option>
              <option value="Tech">Tech</option>
              <option value="Electronics">Electronics</option>
              <option value="Elon musk">Elon musk</option>
              <option value="Gadgets">Gadgets</option>
            </select>
          {formErrors.category && ( <span className="error">{formErrors.category}</span> )}
            <br />

            <label for="cars">Choose Video Visibility:</label>

            <select name="visibility" id="Visibility" onChange={e => setVisibility(e.target.value)} className={formErrors.visibility && "input-error"}>
              <option value="---">---</option>
              <option value="public">public</option>
              <option value="unlisted">unlisted</option>
              <option value="private">private</option>
            </select>
          {formErrors.visibility && ( <span className="error">{formErrors.visibility}</span> )}
            <br />

            <label for="cars">Choose Comment Visibility:</label>

            <select name="commentVisibility" id="commentVisibility" onChange={e => setCommentVisibility(e.target.value)} className={formErrors.commentVisibility && "input-error"}>
              <option value="---">---</option>
              <option value="public">public</option>
              <option value="unlisted">unlisted</option>
              <option value="private">private</option>
            </select>
          {formErrors.commentVisibility && ( <span className="error">{formErrors.commentVisibility}</span> )}
            <br />

          

          <button type="submit">Create Channel</button>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo
