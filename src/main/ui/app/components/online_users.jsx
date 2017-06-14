import React from 'react';
import { connect } from 'react-redux';

class OnlineUsers extends React.Component {

  renderUsers() {
    return Object.values(this.props.stats).map(userStats =>{
      return (
        <li className="list-group-item" key={userStats.user.alias}>
          <span className="badge">{userStats.messageCount}</span>
          {userStats.user.alias}
        </li>
      );
    });
  }

  render() {
    console.log(Object.values(this.props.stats));
    return (
      <ul className="list-group">
        {this.renderUsers()}
      </ul>
    );
  }
}

export default connect(({stats}) => ({stats}))(OnlineUsers);
