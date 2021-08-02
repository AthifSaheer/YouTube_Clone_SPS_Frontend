import Header from "../Header/Header";
import React, {useState, useEffect} from 'react'
import APIService from '../API/APIService'
import {useCookies} from 'react-cookie';
import { useHistory, Link } from 'react-router-dom'
import './Login.css'


function Login() {
    const [username, setUsername] = useState('')
    const [usernameRequired, setUsernameRequired] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordRequired, setPasswordRequired] = useState(false)

    const [invalidUnamePwrd, setInvalidUnamePwrd] = useState(false)
    
    const [token, setToken] = useCookies(['mytoken'])
    const history = useHistory()

    const loginBtn = () => {
        if(username == '' && password == '') {
            setUsernameRequired(true)
            setPasswordRequired(true)
        } else {
            if(username == '') {
                setUsernameRequired(true)
            } else {
                setUsernameRequired(false)
            }
    
            if(password == '') {
                setPasswordRequired(true)
            }else {
                setPasswordRequired(false)
            }
        }

        
        if (username && password) {
            console.log('uname  and pwrd is true')
            console.log('username', username)
            console.log('password', password)
            APIService.LoginUser({username, password})
            .then(resp => {
                if (resp.token == undefined) {
                    setInvalidUnamePwrd(true)
                } else {
                    setToken('mytoken', resp.token)
                }
            })
            .catch(error => alert(error))
        }
    }

    useEffect(() => {
        if(token['mytoken']) {
            history.push('/')
        }
    }, [token])

    return (
        <div>
            <Header />

            <div className="main-div">
                <div>
                    <div className="container">
                        <h1 className="login-text">Log In</h1>
                                            
                        <div className="login-div">
                            {/* Username */}

                            <input type="text" className="form-control username-input" placeholder="Enter your username"
                            value={username} onChange={e => setUsername(e.target.value)}
                            />
                            {usernameRequired?
                                <span className="text-danger">This field is required</span>
                            :
                                null
                            }

                            <br />
                            <br />

                            {/* Password */}
                            <input type="password" className="form-control password-input" id="exampleInputPassword1" placeholder="Enter your password" 
                            value={password} onChange={e => setPassword(e.target.value)}
                            
                            />
                            {passwordRequired?
                                <span className="text-danger">This field is required</span>
                            :
                                null
                            }

                            <br />
                            <br />

                            {invalidUnamePwrd?
                                <span className="text-danger">Invalid username or password</span>
                            :
                                null
                            }

                            {/* Login/Register Button */}
                            <button onClick={loginBtn} type="submit" className="login-btn">Login</button>

                            <Link to='/signup' ><p>or <span style={{ color: '#1890ff'}} > register now!</span></p></Link>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
