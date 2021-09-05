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
import Subscription from './components/User/Subscription/Subscription';
import Explore from './components/User/Explore/Explore';
import LikedVideos from './components/User/LikedVideos/LikedVideos';
import WatchLater from './components/User/WatchLater/WatchLater';
import MyComments from './components/User/MyComments/MyComments';

// STUDIO ------
import Contents from './components/Studio/Contents/Contents'
import UploadVideo from './components/Studio/Contents/UploadVideo'
import CreateChannel from './components/Studio/Contents/CreateChannel'
import StudioDashboard from './components/Studio/Dashboard/Dashboard'
import StudioChannels from './components/Studio/Channels/Channels'
import EditVideo from './components/Studio/Contents/EditVideo'
import SendFeedback from './components/Studio/SendFeedback/SendFeedback'

// ADMIN ------
import UserList from './components/Admin/UserLists/UserList'
import AdminLogin from './components/Admin/Login/Login'
import Videos from './components/Admin/Videos/Videos'
import AdminDashboard from './components/Admin/Dashboard/Dashboard'
import AdminChannels from './components/Admin/Channels/Channels'
import Feedback from './components/Admin/Feedback/Feedback'
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
      <Route path='/channel/:channelID' component={ChannelView} />
      <Route path='/feed/subscriptions' component={Subscription} />
      <Route path='/feed/explore' component={Explore} />
      <Route path='/feed/liked/videos' component={LikedVideos} />
      <Route path='/feed/watch/later' component={WatchLater} />
      <Route path='/feed/comments' component={MyComments} />

      {/* STUDIO */}
      <Route path='/studio/dashboard' component={StudioDashboard} />
      <Route path='/studio/contents' component={Contents} />
      <Route path='/studio/my/channels' component={StudioChannels} />
      <Route path='/studio/create/channel' component={CreateChannel} />
      <Route path='/studio/upload/video' component={UploadVideo} />
      <Route path='/studio/edit/video/:videoID' component={EditVideo} />
      <Route path='/studio/send/feedback' component={SendFeedback} />

      {/* ADMIN */}
      <Route path='/admin/login' component={AdminLogin} />
      {/* <Route path='/admin/signup' component={AdminSignup} /> */}
      <Route path='/admin/dashboard' component={AdminDashboard} />
      <Route path='/admin/users' component={UserList} />
      <Route path='/admin/channels' component={AdminChannels} />
      <Route path='/admin/videos' component={Videos} />
      <Route path='/admin/feedback' component={Feedback} />
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

