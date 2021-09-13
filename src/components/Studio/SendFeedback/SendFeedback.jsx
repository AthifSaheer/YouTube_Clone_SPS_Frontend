import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import axios from 'axios';

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import classes from "../../../App.module.css";
import './SendFeedback.css'

function SendFeedback() {
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [channel, setChannel] = useCookies(['channelCookie'])

    // SEND FEEDBACK -------------
    const formData = new FormData()
    formData.append("channel", channel['channelCookie']? channel['channelCookie'] : 0)
    formData.append("subject", subject)
    formData.append("message", message)
    console.log("fo---", formData);

    // SESSION HANDLE 
    const [token, setToken] = useCookies(['mytoken'])
    const history = useHistory()

    // SESSION HANDLE -----
    useEffect(() => {
        if(!token['mytoken']) {
        history.push('/login')
    }
    }, [token]);

    function submitFeedbackFunc() {
        axios.post(`https://ytdj.athifsaheer.online/api/v1/studio/send/feedback/`, formData)
        .then(response => {
            if (response.data.success == "success") {
                alert("Successfully sended")
                setSubject("")
                setMessage("")
            } else if (response.data.error == "error") {
                alert("Form not saved!");
            }
        })
    }

    return (
        <div>
            <Header />
            <div className={classes.app__section}>
                <Sidebar />
                <h4>SendFeedback</h4>
            </div>
            <div className="send_feedback_main_div">
                <div className="empty_div"></div>
                <div className="send_feedback_inner_div">
                    <input type="text" id="subject" placeholder="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    <textarea type="text" id="message" placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <input type="button" value="Submit" id="submit" onClick={submitFeedbackFunc} />
                </div>
            </div>
        </div>
    )
}

export default SendFeedback
