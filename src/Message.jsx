import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
  super(props)
  }
  render() {
    return (
      <li className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </li>
    );
  }
}
export default Message;