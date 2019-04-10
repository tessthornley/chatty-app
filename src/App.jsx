import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super();
    this.state = { 
      currentUser: { name: "Bob" },
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
      
      switch(msg.type) {
        case "incomingMessage":
          const oldMessages = this.state.messages;
          let newMsg = {
            id: msg.id,
            username: msg.username,
            content: msg.content,
            type: msg.type
          };
          let totalMessages = [...oldMessages, newMsg];
          this.setState({messages: totalMessages});
          break;
        case "incomingNotification":
          let newNotification = {
            type: msg.type,
            content: msg.content
          }
          this.setState({messages: [...this.state.messages, newNotification]});
          break;
        case "connectionAdded":
          let addCounter = msg.number;
          this.setState({counter: addCounter});
          break;
        case "connectionRemoved":
          let subCounter = msg.number;
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

    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  updateUser = (newName) => {
    if (newName !== this.state.currentUser.name) {
      let userData = {
        type: "postNotification",
        content: `${this.state.currentUser.name} has changed their name to ${newName}.`
      }
      this.setState({currentUser: {name: newName}});
      this.socket.send(JSON.stringify(userData));
    }
  }

  addMessage = (username, content) => {
    // const oldMessages = this.state.messages;
    console.log(username, this.state.currentUser.name)
    let newData = {
      // make id generator
      // id: content.length,
      username: username,
      content: content,
      type: "postMessage"
    }
    this.socket.send(JSON.stringify(newData));
    // let totalMessages = [...oldMessages, newData];
    // this.setState({messages: totalMessages});
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="navbar-usercount">
            {this.state.counter} users online
          </div>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name} updateUser={this.updateUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
