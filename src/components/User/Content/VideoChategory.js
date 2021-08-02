import React,{Fragment} from 'react';

import classes from './VideoChategory.module.css';

const VideoChategory = () =>{
    return <Fragment>
        <div className={classes.video_chategory}>
        <span className={classes.selected}>All</span>
        <span>Python</span>
        <span>Web development</span>
        <span>Elon Musk</span>
        <span>SpaceX</span>
        <span>Amazon</span>
        <span>Driving</span>
        <span>Mahindra thar</span>
        <span>MKBHD</span>
        <span>Apple</span>
        <span>Eloctronics</span>
        <span>Bill gates</span>
        <span>America</span>
        <span>India</span>
    </div>
    <div className={classes.constant}></div>
        </Fragment>
}

export default VideoChategory