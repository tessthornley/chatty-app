import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super();
    this.state = { 
      currentUser: { name: "Annonymous", colour: null },
      messages: [], 
      counter: 0
    };
  }

  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
      console.log("Connected to the server");
    };

    this.socket.onmessage = event => {
      let msg = JSON.parse(event.data);
      // switch statement that handles data received from the server
      switch(msg.type) {
        case "incomingMessage":
          let newMsg = {
            id: msg.id,
            username: msg.username,
            content: msg.content,
            type: msg.type,
            colour: msg.colour
          };
          // add incoming message from server to messages
          let totalMessages = [...this.state.messages, newMsg];
          this.setState({messages: totalMessages});
          break;
        case "incomingNotification":
          let newNotification = {
            type: msg.type,
            content: msg.content
          };
          // add incoming notification from server to messages
          this.setState({messages: [...this.state.messages, newNotification]});
          break;
        case "connectionAdded":
          let addCounter = msg.number;
          // online user counter updated when a connection is made
          this.setState({currentUser: {name: this.state.currentUser.name, colour: msg.colour}, counter: addCounter});
          break;
        case "connectionRemoved":
          let subCounter = msg.number;
          // online user counter updated when a connection is closed
          this.setState({counter: subCounter});
          break;
        default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
      }
    };

    this.onclose = () => {
      console.log("Client disconnected");
    };

  }

  updateUser = (newName) => {
    // checks if the new username entered in the chatbar doesn't match the current user's name
    if (newName !== this.state.currentUser.name) {
      // creates object with new info to send to server
      let userData = {
        type: "postNotification",
        content: `${this.state.currentUser.name} has changed their name to ${newName}.`
      };
      // set the state replacing the current user name with the new username 
      this.setState({currentUser: {name: newName}});
      // send object to server to broadcast to all users
      this.socket.send(JSON.stringify(userData));
    }
  }

  addMessage = (username, content) => {
    // when messages is added from chatbar username and content is added to object
    let newData = {
      username: username,
      content: content,
      type: "postMessage"
    };
    // send object to server to broadcast to all users
    this.socket.send(JSON.stringify(newData));
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="navbar-usercount">
            Users online: {this.state.counter} 
          </div>
        </nav>
        {/* MessageList passed messages from state and displays all messages and notifications */}
        <MessageList messages={this.state.messages} colour={this.state.currentUser.colour} />
        {/* ChatBar passed current user from state to act as defaultValue and two functions to update users and messages */}
        <ChatBar name={this.state.currentUser.name} updateUser={this.updateUser} addMessage={this.addMessage} />
      </div>
    );
  }

}

export default App;
