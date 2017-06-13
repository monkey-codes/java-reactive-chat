import React, {Component} from 'react';
import { connect } from 'react-redux';
import MessageTime from './message_time';

class Messages extends Component {
  renderMessages() {
    return this.props.messages.map(message => {
      return (
        <div key={message.id} className="list-group-item row">
          <div className="col-md-2 text-left text-info">{message.user.alias}</div>
          <div className="col-md-8 text-left">{message.message}</div>
          <div className="col-md-2 text-right text-info"><MessageTime date={message.timestamp}/></div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="list-group chat-messages">
        {this.renderMessages()}
        <div ref={(div) => {
          if(div) div.scrollIntoView({block: 'end', behavior: 'smooth'});
        }}></div>
    </div>
    );
  }

  componentDidUpdate(){

  }
}

function mapStateToProps(state){
  return {messages: state.messages};
}

export default connect(mapStateToProps)(Messages);
