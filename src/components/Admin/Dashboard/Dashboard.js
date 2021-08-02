import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";


function Dashboard() {
    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />

                <div className="main">
                    <h3>Dashboard</h3>

                    <div className="table">

                        <table style={{ width: '100%'}}>
                            <thead>
                                <tr>
                                    <th>Logo</th>
                                    <th>Username</th>
                                    <th>Join date</th> 
                                    <th>Subscribers count</th>
                                    <th>Block</th>
                                    <th>Channel count</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            
                            <tbody style={{ textAlign: 'center' }}>
                                <tr>
                                    <td>Image</td>
                                    <td>athif</td>
                                    <td>23 jul 2020</td> 
                                    <td>33 303</td>
                                    <td>90k </td>
                                    <td>90k </td>
                                    {/* <td>90k</td> */}
                                </tr>
                                <tr>
                                    <td>Image</td>
                                    <td>athif</td>
                                    <td>23 jul 2020</td> 
                                    <td>33 303</td>
                                    <td>90k </td>
                                    <td>90k </td>
                                    {/* <td>90k</td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    )
}


export default Dashboard
