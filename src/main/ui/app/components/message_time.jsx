import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class MessageTime extends Component {

  render() {
    const timeAgo = moment.duration(this.props.time.now.getTime() - this.props.date);
    return (
      <span>{timeAgo.humanize()} ago</span>
    );
  }

}

export default connect(({time}) => ({time}))(MessageTime);
