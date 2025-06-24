import React from 'react';
import '../css/Loader.css'; // Import the CSS file

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
