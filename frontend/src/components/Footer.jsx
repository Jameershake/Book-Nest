import React from 'react';
import "../css/Footer.css";


export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} BookNest
    </footer>
  );
}