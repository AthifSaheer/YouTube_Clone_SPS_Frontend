import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import VideoUploadForm from './VideoUploadForm'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import './Contents.css';


function EditVideo() {
    const [videosAPI, setVideosAPI] = useState([])
    const [ApiError, setApiError] = useState(false)

    const [popup, setPopup] = useState(false)
    const [editVideoGET, setEditVideoGET] = useState([])
    let { videoID } = useParams();

    // SESSION HANDLE 
    const [token, setToken] = useCookies() // ['mytoken']
    const history = useHistory()

    // SESSION HANDLE -----
    useEffect(() => {
        if(!token['mytoken']) {
        history.push('/login')
    }
    }, [token]);

    useEffect(() => {
        axios.get(`https://ytdj.athifsaheer.online/api/v1/studio/videos/${token['channelCookie']}/`)
        .then(res => {setVideosAPI(res.data)})
        .catch(res => setApiError(true))

        axios.get(`https://ytdj.athifsaheer.online/api/v1/studio/edit/video/${videoID}/`)
        .then(response => {
            // console.log(response);
            setPopup(true)
            setEditVideoGET(response.data)
        })
    }, [])

    function PopdownFunc(){
        setPopup(false)
    }

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />

                <div className="main">
                    
                    <h3>Channel contents</h3>
                    {ApiError?
                        <div>
                            <p style={{color: 'red', marginTop: '10px'}}>Error Accrued*</p>
                            <p style={{color: 'gray', fontSize: '12px'}}>*Incase please select a channel</p>
                        </div>
                    :
                        <div className="studio-table">

                            <table style={{ width: '99%'}}>
                                <thead>
                                    <tr>
                                        <th>Video</th> 
                                        <th>Title</th>
                                        <th>Visibility</th>
                                        <th>Category</th>
                                        <th>Views</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                
                                <tbody style={{ textAlign: 'center' }}>

                                {videosAPI.length == 0?
                                    <div>
                                        <p style={{color: 'red', marginTop: '10px'}}>No videos</p>
                                    </div>
                                :
                                    videosAPI.map((data, index) => {
                                        let videoDeletePostData = {"user_token": token['mytoken'], "channel_id": token['channelCookie'], "video": data.id}

                                        function deleteVideoFunc() {
                                            let deleteConfirm = window.confirm("Do you want to delete this video?")
                                            
                                            if (deleteConfirm) {
                                                axios.post(`/api/v1/studio/delete/videos/`, videoDeletePostData)
                                                .then(res => {
                                                    if (res.data.video_deleted == "video_deleted") {
                                                        alert("Video deleted successfully")
                                                        axios.get(`/api/v1/studio/videos/${token['channelCookie']}/`)
                                                        .then(res => {setVideosAPI(res.data)})
                                                        .catch(res => setApiError(true))
                                                    } else if (res.data.video_deleted_error == "video_deleted_error") {
                                                        alert("Error occured!")
                                                    }
                                                })
                                                .catch(err => alert(err))
                                            }
                                        }

                                        function editVideoGETFunc(videoID) {
                                            
                                        }

                                        return (
                                            <tr key={index}>
                                                <td><img src={data.thumbnail} width='100px' alt="" /></td>
                                                <td>{data.title}</td> 
                                                <td>{data.visibility}</td>
                                                <td>{data.category}</td>
                                                <td>{data.view_count}</td>
                                                <td> <span className="material-icons video-edit-icon" onClick={() => editVideoGETFunc(data.id)}>edit</span></td>
                                                <td> <span className="material-icons video-dlt-icon" onClick={deleteVideoFunc}>delete</span></td>
                                            </tr>
                                        )
                                    })
                                    
                                }

                                </tbody>
                            </table>
                        </div>
                    }


                    <div className="channel-popup-main-div" id="dropdown" >
                        <div className="channel-popup-inner-div">
                            <Link to="/studio/contents">
                                <button className="close-btn">x</button>
                            </Link>
                            {editVideoGET && editVideoGET.map((data, index) => {
                                return (
                                    <VideoUploadForm 
                                    videoID={data.id}
                                    title={data.title}
                                    video={data.video}
                                    thumbnail={data.thumbnail}
                                    description={data.description}
                                    category={data.category}
                                    visibility={data.visibility}
                                    comment_visibility={data.comment_visibility}
                                    /> 
                                )
                            })}
            
                        </div>
                    </div>
                   

                </div>

            </div>
        </div>
    )
}

export default EditVideo
