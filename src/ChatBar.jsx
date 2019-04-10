import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.name,
      content: ""
    }
  }

  onNewUser = (event) => {
    this.setState({username: event.target.value});
  }

  onContentChange = (event) => {
    this.setState({content: event.target.value});
  }

  onEnter = (event) => {
    if (event.key === 'Enter') {
      this.props.addMessage(this.state.username, event.target.value);
      this.setState({content: ""});
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.state.username} onChange={this.onNewUser} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" value={this.state.content} onChange={this.onContentChange} onKeyPress={this.onEnter} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

}
export default ChatBar;