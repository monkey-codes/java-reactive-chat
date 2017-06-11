import React from 'react';

export default class Chat extends React.Component {
  render() {
    return (

      <div className="container-fluid">
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">Type Message</div>
              <textarea className="form-control" rows="3"></textarea>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
