import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createTimer, removeTimer} from '../actions/time';

class TimeTicker extends Component {

  componentDidMount(){
    console.log('TimeTicker did mount');
    this.props.createTimer();
  }

  componentWillUnmount(){
    console.log('TimeTicker will unmount');
    this.props.removeTimer(this.props.interval);
  }

  render(){
    return false;
  }
}

export default connect(({time:{interval}}) => ({interval}),{  createTimer, removeTimer })(TimeTicker);
