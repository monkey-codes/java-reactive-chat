import React from 'react';
import { sendMessage } from '../actions/chat';
import { connect } from 'react-redux';

class MessageInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {message: ''};
  }

  onInputChange(message) {
    this.setState({message});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.props.user, this.state.message);
    this.setState({message:''});
    return false;
  }

  render() {
    return (

      <div className="container-fluid">
        <form className="form-horizontal" role="form" onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">Type Message</div>
              <input type="text"
                value={this.state.message}
                onChange={event => this.onInputChange(event.target.value)}
                className="form-control input-lg"></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(({user}) => ({user}), { sendMessage })(MessageInput);
