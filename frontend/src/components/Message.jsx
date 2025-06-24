import React from 'react';
import '../css/Message.css';

export default function Message({ children }) {
  return (
    <div className="message-box">
      <span className="message-icon">⚠️</span>
      <span>{children}</span>
    </div>
  );
}
