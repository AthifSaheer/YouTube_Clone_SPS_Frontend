import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import { useState, useEffect } from 'react';


function UserList() {
    const [videosData, setVideosData] = useState([])
    const [videoDiv, setVideoDiv] = useState(false)
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/display/video/', {
            method: 'GET',
        })
        .then(responce => responce.json())
        .then(res => setVideosData(res))
    })

    function onClick() {
        // alert('ll')
        setVideoDiv(true);
    }

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />

                <div className="main">
                    <h3>All Videos</h3>

                    <div className="table">

                        <table style={{ width: '100%'}}>
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>User</th>
                                    <th>Channel</th>
                                    <th onClick={onClick}>Thumbnail</th>
                                    <th>Title</th>
                                    <th>Visibility</th> 
                                    <th>Category</th> 
                                    <th>View count</th>
                                    <th>Block</th>
                                </tr>
                            </thead>
                            
                            <tbody style={{ textAlign: 'center', marginTop:'100px' } }>
                                {videosData && videosData.map((data, index) => {
                                    return (
                                        <tr>
                                            <td>{data.id}</td>
                                            <td>{ data.user.username }</td>
                                            <td>{ data.channel.channel_name }</td>
                                            <td><img src={data.thumbnail} alt="thumbnail" style={{width:'100px', height:'50px'}} /></td>
                                            <td>{data.title}</td>
                                            <td>{data.visibility}</td>
                                            <td>{data.category}</td>
                                            <td>{data.view_count}</td>
                                            <td style={{color:'red'}}><span className="material-icons">block</span></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    )
}


export default UserList
