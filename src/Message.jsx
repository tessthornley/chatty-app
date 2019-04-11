import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
  super(props)
  }

  // receives props from MessageList and based on type renders as a new message or new notification 
  render() {
    if (this.props.type === "incomingMessage") {
      return (
        <li className="message">
          <span className="message-username" style={{color: this.props.colour}}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </li>
      )
    } else if (this.props.type === "incomingNotification") {
      return (
      <div className="notification">
        <span className="notification-content"><i>{this.props.content}</i></span>
      </div>
      )
    }
  }
  
}

export default Message;