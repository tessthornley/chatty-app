import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    // local state set with 'Chatty' set as default value for username
    this.state = {
      username: this.props.name,
      content: ""
    }
  }

  onNewUser = (event) => {
    // when a new username is entered in input field update the state with target value
    this.setState({username: event.target.value});
  }

  onUserEnter = (event) => {
    // if enter key is hit on username then send new user info back to App through callback function to update current user if necessary
    if (event.key === 'Enter') {
      this.props.updateUser(this.state.username);
    }
  }

  onNewMessage = (event) => {
    // when a new message is entered in input field update the state with target value
    this.setState({content: event.target.value});
  }

  onMessageEnter = (event) => {
    /* if enter key is hit on message then send user info via callback to App to update current user if necessary
    username and content sent to App via callback and content cleared
    */
    if (event.key === 'Enter') {
      this.props.updateUser(this.state.username);
      this.props.addMessage(this.state.username, this.state.content);
      this.setState({content: ""});
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.state.username} onChange={this.onNewUser} onKeyPress={this.onUserEnter} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" value={this.state.content} onChange={this.onNewMessage} onKeyPress={this.onMessageEnter} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

}

export default ChatBar;