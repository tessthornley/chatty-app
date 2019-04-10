import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
  super(props)
  console.log('message props', this.props.type)
  }
  render() {
    if (this.props.type === "incomingMessage") {
      return (
        <li className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </li>
      )
    } else if (this.props.type === "incomingNotification") {
        return (<div className="notification">
          <span className="notification-content">{this.props.content}</span>
        </div>)
      }
    }
  }

export default Message;