import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import ChannelSearchResult from "./ChannelSearchResult";
import VideoSearchResult from "./VideoSearchResult";
import classes from "../../../App.module.css";
import noResultFountIMG from "../../../image/noRsltPage.png";
import './Search.css'

function Search() {
    let { searchKeyword } = useParams();
    const [videoData, setVideoData] = useState([])
    const [channelData, setChannelData] = useState([])
    const [noResultFount, setNoResultFount] = useState(false)
    const [ChannelResultNotFount, setChannelResultNotFount] = useState(false)
    
    const [filterType, setFilterType] = useState('')
    const [channelFilter, setChannelFilter] = useState(true)
    const [videoFilter, setVideoFilter] = useState(true)
    
    const [filterUploadDate, setFilterUploadDate] = useState(true)
    const [filterSortBy, setFilterSortBy] = useState('')

    function filterColseFunc() {
        document.getElementsByClassName("inner-filter")[0].style.display = "none"
    }
    useEffect(() => {
        if (filterUploadDate == 'last_hour') {
            let url = '/api/v1/user/search/filter/last_hour/'
            fetch(url, {method: 'GET'})
            .then(responce => responce.json())
            .then(res => {
                if (res.no_videos == 'no_videos') {
                    setNoResultFount(true)
                    setChannelResultNotFount(true)
                    setVideoData([])
                    setChannelData([])
                    document.getElementsByClassName("inner-filter")[0].style.display = "none"
                } else {
                    setVideoData(res)
                    setNoResultFount(false)
                    setChannelData([])
                    document.getElementsByClassName("inner-filter")[0].style.display = "none"
                }
            })
        } else if (filterUploadDate == 'this_week') {
            let url = '/api/v1/user/search/filter/this_week/'
            fetch(url, {method: 'GET'})
            .then(responce => responce.json())
            .then(res => {
                if (res.no_videos == 'no_videos') {
                    setNoResultFount(true)
                    setChannelResultNotFount(true)
                    setVideoData([])
                    setChannelData([])
                    document.getElementsByClassName("inner-filter")[0].style.display = "none"
                } else {
                    setVideoData(res)
                    setNoResultFount(false)
                    setChannelData([])
                    document.getElementsByClassName("inner-filter")[0].style.display = "none"
                }
            })
        } else if (filterSortBy == 'view_count') {
            let url = '/api/v1/user/search/filter/view_count/'
            fetch(url, {method: 'GET'})
            .then(responce => responce.json())
            .then(res => {
                if (res.no_videos == 'no_videos') {
                    setNoResultFount(true)
                    setChannelResultNotFount(true)
                    setVideoData([])
                    setChannelData([])
                    document.getElementsByClassName("inner-filter")[0].style.display = "none"
                    alert('view coutn workng | no video')
                } else {
                    setVideoData(res)
                    setNoResultFount(false)
                    setChannelData([])
                    document.getElementsByClassName("inner-filter")[0].style.display = "none"
                }
            })
        } else if (filterSortBy == 'upload_date') {
            let url = '/api/v1/user/search/filter/upload_date'
            fetch(url, {method: 'GET'})
            .then(responce => responce.json())
            .then(res => {
                if (res.no_videos == 'no_videos') {
                    setNoResultFount(true)
                    setChannelResultNotFount(true)
                    setVideoData([])
                    setChannelData([])
                    document.getElementsByClassName("inner-filter")[0].style.display = "none"
                    alert('view coutn workng | no video')
                } else {
                    setVideoData(res)
                    setNoResultFount(false)
                    setChannelData([])
                    document.getElementsByClassName("inner-filter")[0].style.display = "none"
                }
            })
        } else {
            // SEARCH VIDEO --------------------------------
            fetch(`/api/v1/user/search/video/${searchKeyword}/`, {
                method: 'GET',
            })
            .then(responce => responce.json())
            .then(res => {
                setVideoData(res)
                setNoResultFount(false)
            })
            .catch(error => {
                setNoResultFount(true);
                setVideoData([])
            })

            // SEARCH CHANNEL --------------------------------
            fetch(`/api/v1/user/search/channel/${searchKeyword}/`, {
                method: 'GET',
            })
            .then(responce => responce.json())
            .then(res => {
                console.log(res);
                setChannelData(res)
                setChannelResultNotFount(false)
            })
            .catch(error => {
                setChannelResultNotFount(true);
                setChannelData([])
            })
        }
        
    }, [searchKeyword, filterUploadDate, filterSortBy])

    function filterOpen() {
        var filter = document.getElementsByClassName("inner-filter")[0]
        if (filter.style.display == "block") {
            filter.style.display = "none"
            filter.classList.add('filter-animation')
        } else {
            filter.style.display = "block"
        }
    }
    function filterChannelFunc() {
        if (filterType == '' || filterType == 'video') {
            setChannelFilter(true)
            setVideoFilter(false)
            setFilterType('channel')
            filterColseFunc()
            // document.getElementsByClassName("inner-filter")[0].style.display = "none"
        } else if (filterType == 'channel') {
            setFilterType('')
            setVideoFilter(true)
            document.getElementsByClassName("inner-filter")[0].style.display = "none"
        }
    }
    function filterVideoFunc() {
        if (filterType == '' || filterType == 'channel') {
            setVideoFilter(true)
            setChannelFilter(false)
            setFilterType('video')
            document.getElementsByClassName("inner-filter")[0].style.display = "none"
        } else if (filterType == 'video') {
            setFilterType('')
            setChannelFilter(true)
            document.getElementsByClassName("inner-filter")[0].style.display = "none"
        }
    }

  return (
    <div className="app">
        <Header />
        <div className={classes.app__section}>
            <Sidebar />
        </div>

        {/* ----------------- FILTER SECTION ----------------- */}
        <div className={classes.app__section}>
            <div className="empty-div"></div>
            <div className="filter-container">

                <div className="filter-text"><p onClick={filterOpen}>FILTER</p></div>

                <div className="inner-filter">
                    
                    <div id="filter-row">
                        <div className="filter-content">
                            <p className="header">TYPE</p>
                            <hr id="filter-hr" />
                            {filterType == 'channel'?
                                <div className="sub-header-div">
                                    <p className="sub-head" onClick={filterChannelFunc} style={{color: '#00c9bf', fontWeight: 'bold'}}>Channel</p>
                                    <p className="sub-head" onClick={filterVideoFunc}>Video</p>
                                </div>
                            :
                                filterType == 'video'?
                                    <div>
                                        <p className="sub-head" onClick={filterChannelFunc}>Channel</p>
                                        <p className="sub-head" onClick={filterVideoFunc} style={{color: '#00c9bf', fontWeight: 'bold'}}>Video</p>
                                    </div>
                                :
                                    <div>
                                        <p className="sub-head" onClick={filterChannelFunc}>Channel</p>
                                        <p className="sub-head" onClick={filterVideoFunc}>Video</p>
                                    </div>
                            }
                        </div>

                        <div className="filter-content">
                            <p className="header">UPLOADE DATE</p>
                            <hr id="filter-hr" />
                            {filterUploadDate == 'last_hour'?
                                <div>
                                    <p className="sub-head" onClick={() => {setFilterUploadDate(''); filterColseFunc()} } style={{color: '#00c9bf', fontWeight: 'bold'}}>Last hour</p>
                                    <p className="sub-head" onClick={() => setFilterUploadDate('this_week') }>This week</p>
                                </div>
                            :
                                filterUploadDate == 'this_week'?
                                    <div>
                                        <p className="sub-head" onClick={() => setFilterUploadDate('last_hour') }>Last hour</p>
                                        <p className="sub-head" onClick={() => {setFilterUploadDate(''); filterColseFunc() }} style={{color: '#00c9bf', fontWeight: 'bold'}}>This week</p>
                                    </div>
                            :
                                <div>
                                    <p className="sub-head" onClick={() => setFilterUploadDate('last_hour') }>Last hour</p>
                                    <p className="sub-head" onClick={() => setFilterUploadDate('this_week') }>This week</p>
                                </div>
                            }
                        </div>

                        <div className="filter-content">
                            <p className="header">SORT BY</p>
                            <hr id="filter-hr" />
                            
                            {filterSortBy == 'view_count'?
                                <div>
                                    <p className="sub-head" onClick={() => {setFilterSortBy(''); filterColseFunc()} } style={{color: '#00c9bf', fontWeight: 'bold'}}>View count</p>
                                    <p className="sub-head" onClick={() => setFilterSortBy('upload_date') }>Upload date</p>
                                </div>
                            :
                                filterSortBy == 'upload_date'?
                                    <div>
                                        <p className="sub-head" onClick={() => setFilterSortBy('view_count') }>View count</p>
                                        <p className="sub-head" onClick={() => {setFilterSortBy(''); filterColseFunc()} } style={{color: '#00c9bf', fontWeight: 'bold'}}>Upload date</p>
                                    </div>
                                :
                                    <div>
                                        <p className="sub-head" onClick={() => setFilterSortBy('view_count') }>View count</p>
                                        <p className="sub-head" onClick={() => setFilterSortBy('upload_date') }>Upload date</p>
                                    </div>
                            }

                        </div>

                    </div>

                </div>

            </div>
        </div>

        {/* ----------------- CHANNEL VIEW ----------------- */}
        {channelFilter?
            channelData && channelData.map((data, index) => {
                return(
                    <div className={classes.app__section}>
                        <div className="empty-div"></div>
                        <ChannelSearchResult 
                        channelID={data.id}
                        logo={data.logo}
                        channelName={data.channel_name}
                        subscribers={data.subscribers}
                        videoCount={data.video_count}
                        />
                    </div>
                )
            })
        :
            null
        }

        {/* //----------------- HR -----------------  */}
        <div className={classes.app__section}>
            <div className="empty-div"></div>
            <hr style={{width: '1270px'}} />
        </div>

        {/* //----------------- VIDEO VIEW -----------------  */}
        {videoFilter?
                videoData && videoData.map((data, index) => {
                    return(
                        <div className={classes.app__section} key={data.id}>
                            <div className="empty-div"></div>
                            <VideoSearchResult
                            id={data.id} 
                            title={data.title}
                            thumbnail={data.thumbnail}
                            channel={data.channel.channel_name}
                            channelLogo={data.channel.logo} 
                            channelLogo={data.channel.logo} 
                            channelId={data.channel.id}
                            viewCount={data.view_count}
                            uploadDate={data.upload_date}
                            description={data.description}
                            />
                        </div>
                    )
                })
        :
            null
        }

        {noResultFount == true && ChannelResultNotFount == true ?
            <div className={classes.app__section}>
                <div style={{minWidth:'233px'}}></div>
                <img src={noResultFountIMG} alt="No result found"
                style={{display: 'block', marginLeft: '340px', marginRight: 'auto', width: '500px', marginTop: '80px'}} />
            </div>
        :
            null
        }

    </div>
  );
}

export default Search;
