import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class HumanizedTime extends Component {

  render() {
    if(!this.props.time.now){
      return (<div/>);
    }
    const prefix = this.props.prefix || "";
    const suffix = this.props.suffix || "ago";
    const timeAgo = moment.duration(this.props.time.now.getTime() - this.props.date);
    return (
      <span>{prefix} {timeAgo.humanize()} {suffix}</span>
    );
  }

}

export default connect(({time}) => ({time}))(HumanizedTime);
