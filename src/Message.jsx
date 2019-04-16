import React from "react";

const Message = ({ type, colour, content, username }) => {
  if (type === "incomingMessage") {
    return (
      <li className="message">
        <span className="message-username" style={{ color: colour }}>
          {username}
        </span>
        <span className="message-content">{content}</span>
      </li>
    );
  } else if (type === "incomingNotification") {
    return (
      <div className="notification">
        <span className="notification-content">
          {content}
        </span>
      </div>
    );
  }
};

export default Message;