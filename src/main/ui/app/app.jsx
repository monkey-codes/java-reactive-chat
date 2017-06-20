import React, {Component} from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TimeTicker from './components/time_ticker';
import Chat from './components/chat';
import Login from './components/login';
import requireUser from './components/require_user';
import {connectToChatServer} from './actions/chat';

class App extends Component {

  componentDidMount(){
    this.props.connectToChatServer(`ws://${location.host}/websocket/chat`);
  }

  render(){
    return(
      <Router>
        <div className="full-height">
          <TimeTicker />
          <Route exact path="/" component={Login}/>
          <Route exact path="/chat" component={requireUser(Chat)}/>
        </div>
      </Router>
    );
  }
}

export default connect(null, {connectToChatServer})(App);
