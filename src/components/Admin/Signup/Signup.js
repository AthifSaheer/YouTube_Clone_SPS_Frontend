import Header from "../Header/Header";
import React, {useState, useEffect} from 'react'
import APIService from '../API/APIService'
import {useCookies} from 'react-cookie';
import { useHistory, Link } from 'react-router-dom'
import '../Login/Login.css'
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    confirmPassword: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    // email: Yup.string().email('Invalid email').required('Required'),
  });

function Login() {
    const [username, setUsername] = useState('')
    const [usernameRequired, setUsernameRequired] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordRequired, setPasswordRequired] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordRequired, setConfirmPasswordRequired] = useState(false)

    const [pwordDidNotMatch, setPwordDidNotMatch] = useState(false)

    const [token, setToken] = useCookies(['admintoken'])
    const [isValid, setIsValid] = useState(false)
    const [invalidUnamePwrd, setInvalidUnamePwrd] = useState(false)
    const history = useHistory()

    const loginBtn = () => {
        console.log('Login working')
        if(username == '') {
            setIsValid(true)
        } else if(password == '') {
            setIsValid(true)
        }else {
            APIService.LoginUser({username, password})
            .then(resp => {
                if (resp.token == undefined) {
                    setInvalidUnamePwrd(true)
                } else {
                    setToken('admintoken', resp.token)
                }
            }) // console.log(resp)
            .catch(error => alert(error))
        }
    }

    const registerBtn = () => {
        if(username == '' && password == '' && confirmPassword == '') {
            setUsernameRequired(true)
            setPasswordRequired(true)
            setConfirmPasswordRequired(true)
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

            if(confirmPassword == '') {
                setPasswordRequired(true)
            }else {
                setPasswordRequired(false)
            }

            if(!password == confirmPassword) {
                console.log("password:", password)
                console.log("confirmPassword:", confirmPassword)
                setPwordDidNotMatch(true)
            } else {
                setPwordDidNotMatch(false)
            }
        }

        
        if (username && password && confirmPassword) {
            APIService.RegisterUser({username, password})
            .then(() => loginBtn() )
            .catch(error => alert(error))
        }

        
        
        
    }

    useEffect(() => {
        if(token['admintoken']) {
            history.push('/admin/dashboard')
        }
    }, [token])

    return (
        <div>
            <Header />

            <div className="main-div">
                <div>
                    <div className="container">
                        <h1 className="login-text">Sign Up</h1>
                                            
                        <div className="login-div">
                            {/* Username */}

                            <input type="text" name="usrename" className="form-control username-input" placeholder="Enter your username"
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
                            <input type="password" name="password" className="form-control password-input" id="exampleInputPassword1" placeholder="Enter your password" 
                            value={password} onChange={e => setPassword(e.target.value)}
                            
                            />
                            {passwordRequired?
                                <span className="text-danger">This field is required</span>
                            :
                                null
                            }

                            <br />
                            <br />

                            {/* Confirm Password */}
                            
                            <input type="password" name="confirmPassword" className="form-control password-input" id="exampleInputPassword2" placeholder="Enter your confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

                            {confirmPasswordRequired?
                                <span className="text-danger">This field is required</span>
                            :
                                null
                            }

                            {invalidUnamePwrd?
                                <span className="text-danger">Invalid username or password!</span>
                                :
                                null
                            }

                            {pwordDidNotMatch?
                                <span className="text-danger">Password did not match!</span>
                            :
                                null
                            }

                            {/* Login/Register Button */}
                            <button onClick={registerBtn} type="submit" className="login-btn">Register</button>

                            <Link to='/admin/login' ><p>or <span style={{ color: '#1890ff'}}> login now!</span></p></Link>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
