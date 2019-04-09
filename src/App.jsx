import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super();
    this.state = { currentUser: { name: "Bob" },
                  messages: [{
                    id: "1234",
                    username: "Bob",
                    content: "Has anyone seen my marbles?",
                  },
                  {
                    id: "4321",
                    username: "Anonymous",
                    content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                  }]};
  }
  render() {
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name}/>
      </div>
    );
  }
}

export default App;
