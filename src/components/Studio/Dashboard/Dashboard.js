import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";

function Dashboard() {
    const [analyticsData, setAnalyticsData] = useState([])
    const [chartData, setChartData] = useState({});

    // SESSION HANDLE 
    const [token, setToken] = useCookies(['mytoken'])
    const history = useHistory()

    // SESSION HANDLE -----
    useEffect(() => {
        if(!token['mytoken']) {
            history.push('/login')
        }
    }, [token]);
    
    let VideoCount = 0
    let subCount = 0
    let viewCount = 0
    let LikeCount = 0

    analyticsData && analyticsData.map((data, index) => {
        let subCount = data.channel.subscribers
        
        if (data.video){
            VideoCount += 1
        }

        viewCount += data.view_count
        LikeCount += data.like
    })

    // LINE CHART PROPERTIES ---------
    const chart = () => {
        let vlArr = []
        let kyArr = []

        axios.get(`https://ytdj.athifsaheer.online/api/v1/studio/analytics/${token['channelCookie']}/`)
        // axios.get(`/api/v1/studio/analytics/13/`)
        .then(response => {
            setAnalyticsData(response.data)
            
            for (const data of response.data) {
                console.log(data.view_count);
                kyArr.push(parseInt(data.view_count))
                vlArr.push(data.title.slice(0, 9)+'...')
            }

            setChartData({
                labels: vlArr,
                datasets: [
                    {
                        label: "Video Analytics",
                        data: kyArr,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 2
                    }
                ]
            });
        })
        .catch(err => console.log(err));
    };
    
    useEffect(() => {
        chart();
    }, []);

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />
                Dashboard
            </div>
            <div style={{ display: 'flex', margin: '20px' }} >
                <div className="empty_div"></div>

                <div style={{ display: 'flex', flexWrap: 'wrap' }} >
                    <div className="studio-channel-card" >
                        <div className="channel-card-img">
                            <span className="material-icons" style={{color: '#ff4190', marginTop: '14px', fontSize: '34px'}}>playlist_add</span>
                        </div>
                        <div className="channel-card-text">
                            <p>Subscribers</p>
                            <span>{subCount} subscribers</span>
                        </div>

                    </div>

                    <div className="studio-channel-card">
                        <div className="channel-card-img">
                            <span className="material-icons" style={{color: '#00c583', marginTop: '14px', fontSize: '34px'}}>play_circle_filled</span>
                        </div>
                        <div className="channel-card-text">
                            <p>Videos</p>
                            <span>{VideoCount} videos</span>
                        </div>
                    </div>

                    <div className="studio-channel-card">
                        <div className="channel-card-img">
                            <span className="material-icons" style={{color: '#00b8c5', marginTop: '14px', fontSize: '34px'}}>visibility</span>
                        </div>
                        <div className="channel-card-text">
                            <p>Views</p>
                            <span>{viewCount} views</span>
                        </div>
                    </div>

                    <div className="studio-channel-card">
                        <div className="channel-card-img">
                            <span className="material-icons" style={{color: '#4193ff', marginTop: '14px', fontSize: '34px'}}>thumb_up_alt</span>
                        </div>
                        <div className="channel-card-text">
                            <p>Likes</p>
                            <span>{LikeCount} likes</span>
                        </div>
                    </div>

                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            title: { text: "THICCNESS SCALE", display: true },
                            scales: {
                            yAxes: [
                                {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: false
                                }
                                }
                            ],
                            xAxes: [
                                {
                                gridLines: {
                                    display: false
                                }
                                }
                            ]
                            }
                        }}
                        />
                        
                </div>
 
            </div>


        </div>
    )
}

export default Dashboard
