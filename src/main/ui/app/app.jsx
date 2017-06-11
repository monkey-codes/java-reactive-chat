import React from 'react';
import './styles/index.scss';
import Nav from './components/nav';
import OnlineUsers from './components/online_users';
import Messages from './components/messages';
import Chat from './components/chat';

export default class App extends React.Component {
  render() {
    return (
      <div className="full-height">
        <div className="row">
          <Nav/>
        </div>
        <div className="row full-height">
          <div className="col-md-3 full-height">
            <OnlineUsers/>
          </div>
          <div className="col-md-9 full-height">
            <div className="container-fluid full-height">
              <Messages/>
              <Chat/>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
