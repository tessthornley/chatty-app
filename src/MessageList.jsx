import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
  super(props);
}

render () {
  {/* maps through messages from App and renders one Message component per message */}
  const messageLists  = this.props.messages.map(msg => (
    < Message msgKey={msg.id} username={msg.username} content={msg.content} type={msg.type}/>
  ));
  
  {/* if messages exist, displays each entry in chronologial order otherwise displays default message */}
  return (
    <div className="message">
      {this.props.messages.length ? (
        <ul>{messageLists}</ul>) : "No Messages To Display"}
    </div>
    )
  }
  
}

export default MessageList;