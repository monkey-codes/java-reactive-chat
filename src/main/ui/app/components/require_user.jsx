import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class RequireUser extends Component {

    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount(){
      if(!this.props.user.alias){
        this.context.router.history.push('/');
      }
    }

    componentWillUpdate(nextProps){
      if(!nextProps.user.alias){
        this.context.router.history.push('/');
      }
    }

    render(){
      return <ComposedComponent {...this.props}/>
    }
  }

  function mapStateToProps({user}) {
    return {user};
  }

  return connect(mapStateToProps)(RequireUser);
}

