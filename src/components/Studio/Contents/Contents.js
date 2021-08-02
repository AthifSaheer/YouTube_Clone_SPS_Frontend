import React from 'react'
import Header from '../../User/Header/Header'
import Sidebar from '../../User/Sidebar/Sidebar'
import classes from "../../../App.module.css";
import './Contents.css';

function Contents() {
    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />

                <div className="main">
                    <h3>Channel contents</h3>

                    <div className="table">

                        <table style={{ width: '100%'}}>
                            <thead>
                                <tr>
                                    <th>Video</th>
                                    <th></th>
                                    <th>Visibility</th> 
                                    <th>Upload date</th>
                                    <th>View count</th>
                                    <th>Comment count</th>
                                    <th>Like/Dislike</th>
                                </tr>
                            </thead>
                            
                            <tbody style={{ textAlign: 'center' }}>
                                <tr>
                                    <td>Image</td>
                                    <td>Title and description</td>
                                    <td>non</td> 
                                    <td>33 303</td>
                                    <td>90k </td>
                                    <td>90k </td>
                                    <td>90k</td>
                                </tr>
                                <tr>
                                    <td>Image</td>
                                    <td>Title and description</td>
                                    <td>non</td> 
                                    <td>33 303</td>
                                    <td>90k </td>
                                    <td>90k </td>
                                    <td>90k</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Contents
