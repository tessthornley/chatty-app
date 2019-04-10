import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super();
    this.state = { 
      currentUser: { name: "Bob" },
      messages: []
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
            content: msg.content
          };
          let totalMessages = [...oldMessages, newMsg];
          this.setState({messages: totalMessages});
          console.log(totalMessages)
          break;
      }
    };

    this.onclose = () => {
      console.log("Client disconnected");
    };

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage = (username, content) => {
    // const oldMessages = this.state.messages;
    let newData = {
      // make id generator
      // id: content.length,
      username: username,
      content: content
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
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
