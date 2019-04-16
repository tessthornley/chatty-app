const express = require('express');
const SocketServer = require('ws');
// library to generate IDs
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// helper function to broadcast server messages to all clients that have open connections
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

// helper function to assign random colour to new user connections
createRandomColour = () => {
  const letters = '0123456789ABCDEF';
  let colour = '#';
  for (let i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  // on each new connection new object created with number of connections
  const connections = {
    type: "connectionAdded",
    number: wss.clients.size,
    colour: createRandomColour()
  };
  // connection info sent to broadcast function
  wss.broadcast(JSON.stringify(connections));

  ws.on('message', (msg) => {
    const incomingData = JSON.parse(msg);
    // when message is received from client, determine it's type, assign an id, and send back the appropriate response to broadcast to all users
    if (incomingData.type === "postMessage") {
      incomingData.id = uuidv4();
      incomingData.type = "incomingMessage";
      incomingData.colour = connections.colour;
      wss.broadcast(JSON.stringify(incomingData));
    } else if (incomingData.type === "postNotification") {
      incomingData.id = uuidv4();
      incomingData.type = "incomingNotification";
      wss.broadcast(JSON.stringify(incomingData));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    // when connection is closed create new object with number of connections to broadcast to all users
    const connectionRemoved = {
      type: "connectionRemoved",
      number: wss.clients.size,
    };
    wss.broadcast(JSON.stringify(connectionRemoved));
  });
});