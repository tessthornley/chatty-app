import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
  super(props);
  console.log(this.props.messages)
}

render () {
  const messageLists  = this.props.messages.map(msg => (
    //make ID generator
    < Message msgKey={msg.id} username={msg.username} content={msg.content} />
  ));
  return (
    <div className="message">
      {this.props.messages.length ? (
        <ul>{messageLists}</ul>) : "No Messages To Display"}
    </div>)
}
}

export default MessageList;