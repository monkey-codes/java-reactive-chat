import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TimeTicker from './components/time_ticker';
import Chat from './components/chat';
import Home from './components/home';
import Login from './components/login';
import requireUser from './components/require_user';

const App = () => {
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
export default App;
