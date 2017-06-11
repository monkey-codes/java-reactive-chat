import React from 'react';

export default class OnlineUsers extends React.Component {
  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge">14</span>
          Cras justo odio
        </li>
        <li className="list-group-item">
          <span className="badge">2</span>
          Dapibus ac facilisis in
        </li>
        <li className="list-group-item">
          <span className="badge">1</span>
          Morbi leo risus
        </li>
      </ul>
    );
  }
}
