import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      content: ""
    }
  }

  onContentChange = (event) => {
    console.log(this)
    this.setState({content: event.target.value});
  }

  onEnter = (event) => {
    if (event.key === 'Enter') {
      this.props.addMessage(this.props.name, event.target.value);
      this.setState({content: ""});
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.name} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" value={this.state.content} onChange={this.onContentChange} onKeyPress={this.onEnter} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

}
export default ChatBar;