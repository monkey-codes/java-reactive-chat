import React from 'react';
import Rx from 'rxjs/Rx';
import '../styles/login.scss';
import { joinChat } from '../actions/chat';
import { connect } from 'react-redux';

const DEFAULT_AVATAR = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';

class Login extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props){
    super(props);
    this.state = {alias: '', avatar: DEFAULT_AVATAR}
  }

  updateAvatar(alias){
    const avatar = alias ? encodeURI(`https://robohash.org/${alias.toLowerCase()}.png`) : DEFAULT_AVATAR;
    this.setState({ avatar });

  }

  onAliasChange(alias){
    this.setState({alias});
  }

  onSubmit(e) {
    e.preventDefault();
    const {alias, avatar} = this.state;
    this.props.joinChat({alias, avatar});
    this.context.router.history.push('/chat');
    return false;
  }

  componentDidMount(){
    this.aliasInput &&
      Rx.Observable.
      fromEvent(this.aliasInput,'keyup').
      map(e => e.target.value).
      distinctUntilChanged().
      debounceTime(500).
      subscribe(this.updateAvatar.bind(this))
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default card card-container">
          <img id="profile-img" className="profile-img-card" src={this.state.avatar} />
          <p id="profile-name" className="profile-name-card"></p>
          <form className="form" onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <input type="text"
                id="inputAlias"
                value={this.state.alias}
                className="form-control input-lg"
                placeholder="Alias"
                ref={input => this.aliasInput = input}
                onChange={event => this.onAliasChange(event.target.value)}
                required autoFocus/>
            </div>
            <div className="form-group">
              <button className="btn btn-lg btn-success btn-block" type="submit">Chat</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default connect(null,{ joinChat })(Login);
