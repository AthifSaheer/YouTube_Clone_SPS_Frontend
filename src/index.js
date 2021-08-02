import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';

// USER ------
import App from './App';
import Login from './components/User/Login/Login'
import Signup from './components/User/Signup/Signup'
import WatchVideo from './components/User/WatchVideo/WatchVideo';
import Search from './components/User/Search/Search';
import ChannelView from './components/User/ChannelView/ChannelView';
// STUDIO ------
import Contents from './components/Studio/Contents/Contents'
import UploadVideo from './components/Studio/Contents/UploadVideo'
import CreateChannel from './components/Studio/Contents/CreateChannel'
// ADMIN ------
import UserList from './components/Admin/UserLists/UserList'
import AdminLogin from './components/Admin/Login/Login'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import Videos from './components/Admin/Videos/Videos'
// import AdminSignup from './components/Admin/Signup/Signup'

ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter>
    {/* USER */}
      <Route path='/' exact component={App} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/watch/video/:videoID' exact component={WatchVideo} />
      <Route path='/search/keyword/:searchKeyword' component={Search} />
      <Route path='/channel/:channelName' component={ChannelView} />

      {/* STUDIO */}
      <Route path='/studio/contents' component={Contents} />
      <Route path='/studio/create/channel' component={CreateChannel} />
      <Route path='/studio/upload/video' component={UploadVideo} />

      {/* ADMIN */}
      <Route path='/admin/login' component={AdminLogin} />
      {/* <Route path='/admin/signup' component={AdminSignup} /> */}
      <Route path='/admin/dashboard' component={Dashboard} />
      <Route path='/admin/users' component={UserList} />
      <Route path='/admin/videos' component={Videos} />
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

