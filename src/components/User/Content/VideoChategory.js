import React,{Fragment, useState} from 'react';

import classes from './VideoChategory.module.css';
import MainPageVideos from "./MainPageVideos";

const VideoChategory = () =>{
    const [mianPage, setMianPage] = useState(false);
    const [active, setActive] = useState("");
    const [catData, setCatData] = useState("");

    function categoryFunc(e) {
        let category = e.target.innerText
        console.log(category);
        setCatData(category)
        setMianPage(true)
        setActive(category)
    }
    return (
        <Fragment>
            <div className={classes.video_chategory}>
                <span className={active == "All"? classes.selected : ''} onClick={e => categoryFunc(e)}>All</span>
                <span className={active == "Tech"? classes.selected : ''} onClick={e => categoryFunc(e)}>Tech</span>
                <span className={active == "Python"? classes.selected : ''} onClick={e => categoryFunc(e)}>Python</span>
                <span className={active == "News"? classes.selected : ''} onClick={e => categoryFunc(e)}>News</span>
                <span className={active == "Eloctronics"? classes.selected : ''} onClick={e => categoryFunc(e)}>Eloctronics</span>
                <span className={active == "Driving"? classes.selected : ''} onClick={e => categoryFunc(e)}>Driving</span>
                <span className={active == "Kids"? classes.selected : ''} onClick={e => categoryFunc(e)}>Kids</span>
                <span className={active == "Mahindra thar"? classes.selected : ''} onClick={e => categoryFunc(e)}>Mahindra thar</span>
                <span className={active == "MKBHD"? classes.selected : ''} onClick={e => categoryFunc(e)}>MKBHD</span>
                <span className={active == "Apple"? classes.selected : ''} onClick={e => categoryFunc(e)}>Apple</span>
                <span className={active == "Titan"? classes.selected : ''} onClick={e => categoryFunc(e)}>Titan</span>
                <span className={active == "Bill gates"? classes.selected : ''} onClick={e => categoryFunc(e)}>Bill gates</span>
                <span className={active == "America"? classes.selected : ''} onClick={e => categoryFunc(e)}>America</span>
                <span className={active == "Music"? classes.selected : ''} onClick={e => categoryFunc(e)}>Music</span>
                <span className={active == "TED"? classes.selected : ''} onClick={e => categoryFunc(e)}>TED</span>
                <span className={active == "India"? classes.selected : ''} onClick={e => categoryFunc(e)}>India</span>
            </div>

            <div className={classes.constant}></div>
            {mianPage?
                <MainPageVideos category={catData} />
            :
                <MainPageVideos category="All" />
            }
        </Fragment>
    )
}

export default VideoChategory